# Deploy

Self-hosted: Node standalone under a **systemd user service**, exposed by
**Cloudflare Tunnel**. No nginx, no Docker, no Vercel.

```
browser ──HTTPS──> Cloudflare ──tunnel──> cloudflared ──HTTP──> 127.0.0.1:3000
                                                                 node server.js
```

Cloudflare terminates TLS, so the Node process speaks plain HTTP on loopback
only. It is not reachable from the internet except through the tunnel.

---

## What actually needs to exist on the server

Node 20 or newer, and nothing else. Dependencies are not installed on the
server — `output: 'standalone'` ships a pruned `node_modules` inside the
artifact, so there is no `npm install` step in the deploy path.

---

## One-time setup

**1. Secrets.** These are read at runtime, so they live on the server, not in
the repo and not in the artifact.

```bash
mkdir -p ~/.config/portfolio
cat > ~/.config/portfolio/env <<'EOF'
AI_BASE_URL=http://127.0.0.1:20128/v1
AI_API_KEY=your-key-here
AI_MODEL=gemini/gemini-3.5-flash-lite
AI_MODEL_FALLBACKS=gemini/gemini-3.6-flash
AI_TIMEOUT_MS=20000
EOF
chmod 600 ~/.config/portfolio/env
```

The loopback `AI_BASE_URL` example assumes the gateway runs on the same host
as the Node server. For a gateway on another host, set its private reachable
URL explicitly; do not expose the gateway publicly.

`AI_API_KEY` powers `/api/chat` against the configured OpenAI-compatible
endpoint; without it that route returns a friendly fallback instead of
erroring, so the site still works, just without AI answers.

`AI_MODEL` / `AI_MODEL_FALLBACKS` must be model ids **exactly as the endpoint
reports them** in `GET $AI_BASE_URL/models`. 9router prefixes the upstream
provider, so `gemini/gemini-3.5-flash-lite` is correct and `gemini-3.5-flash-lite`
is not. The route tries `AI_MODEL` first and walks `AI_MODEL_FALLBACKS` in order,
then falls back to local answers. Verify a candidate before pinning it:

```bash
curl -s "$AI_BASE_URL/models" -H "Authorization: Bearer $AI_API_KEY" \
  | python3 -c 'import sys,json;[print(m["id"]) for m in json.load(sys.stdin)["data"]]'
```

Two quirks this endpoint has that `route.js` absorbs:

- It replies with `text/event-stream` unless the request sends `stream: false`
  explicitly. The route sets that flag *and* parses SSE, so either shape works.
- Model quality varies a lot. `gemini-3.5-flash-lite` writes correct English;
  `gemini-3.6-flash` is accurate but drops verb endings; the larger models are
  much slower and one of them returns 503 intermittently. The system prompt
  carries explicit guardrails (correct grammar, no meta-commentary, no invented
  code) because the smaller models otherwise append "skipped: ..." notes and
  stray code fences to their answers.

You do **not** need `NEXT_PUBLIC_SITE_URL`. `src/lib/site.js` already falls
back to `https://portfolio.fauzanahsan.my.id`, so canonical URLs, the sitemap
and the JSON-LD are correct without it. Set it only if the domain changes —
and note it is baked in **at build time**, so it belongs on the build machine,
not in this file.

**2. The service.**

```bash
mkdir -p ~/apps/portfolio ~/.config/systemd/user
cp deploy/portfolio.service ~/.config/systemd/user/
systemctl --user daemon-reload
```

**3. Linger.** Without this the service is killed when your last SSH session
closes — which is exactly the failure that makes a "24/7" box not be 24/7.

```bash
loginctl enable-linger $USER
```

**4. The tunnel.** Point the public hostname at the loopback port:

```yaml
# ~/.cloudflared/config.yml
ingress:
  - hostname: portfolio.fauzanahsan.my.id
    service: http://127.0.0.1:3000
  - service: http_status:404
```

---

## Deploying a new version

Build locally, ship the result:

```bash
./scripts/bundle.sh
rsync -a --delete dist/ user@server:~/apps/portfolio/
ssh user@server 'systemctl --user restart portfolio'
```

`bundle.sh` exists because of one specific trap: `.next/standalone` does
**not** contain `.next/static` or `public/`. Next assumes a CDN serves those.
Copy only the standalone folder and you get a site with no CSS, no JS and 404s
on every image. The script copies all three into `dist/`.

Artifact size is about 34 MB, mostly `node_modules`. `rsync` only sends what
changed, so repeat deploys are small.

---

## Checking it

```bash
systemctl --user status portfolio
journalctl --user -u portfolio -f          # live logs
curl -sI http://127.0.0.1:3000 | head -1   # expect: HTTP/1.1 200 OK
curl -s http://127.0.0.1:3000/api/chat -X POST \
  -H 'content-type: application/json' \
  -d '{"message":"hi"}' | head -c 200      # expect JSON, not an error
```

If the response says `"fallback": true`, the key is not being read — check
`~/.config/portfolio/env` and that the unit's `EnvironmentFile` path matches.

---

## When it will not start

**`Failed to determine user credentials` / unit not found** — you used
`systemctl` instead of `systemctl --user`. Every command here needs `--user`.

**Dies on logout** — `loginctl enable-linger $USER` was skipped. Check with
`loginctl show-user $USER | grep Linger`.

**`EADDRINUSE`** — something already holds 3000. Change `Environment=PORT=`
in the unit and the tunnel's `config.yml` together.

**Starts, but every page is unstyled** — `dist/` was assembled by hand without
`.next/static`. Re-run `./scripts/bundle.sh`.

**`ProtectSystem` / sandbox errors in the journal** — the hardening block at
the bottom of the unit is stricter than some kernels and container hosts
allow. Comment it out from `NoNewPrivileges=` down; nothing above it depends
on it.

---

## Rollback

`bundle.sh` writes a fresh directory each time, so keeping the previous one is
enough:

```bash
ssh user@server 'cp -a ~/apps/portfolio ~/apps/portfolio.prev'   # before deploy
ssh user@server 'rm -rf ~/apps/portfolio && mv ~/apps/portfolio.prev ~/apps/portfolio && systemctl --user restart portfolio'
```
