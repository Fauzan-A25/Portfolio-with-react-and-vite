# Server setup overview

This is a setup reference, not a claim about the current production host.
See [DEPLOY.md](DEPLOY.md) for the authoritative setup and deployment steps.
No server changes are required merely to update the GitHub repository.

## Serving the application

The checked-in `deploy/portfolio.service` runs the Next.js standalone artifact
with `node server.js` from `%h/apps/portfolio`. It binds to `127.0.0.1:3000`.
Cloudflare Tunnel routes the public hostname to that loopback address and
terminates TLS. nginx, Docker, and pm2 are not required for this arrangement.

Install the user unit and enable linger as described in DEPLOY.md. Configure
Cloudflare Tunnel separately using the deployment host's own configuration;
never commit tunnel credentials or tokens to this repository.

## Configuration and updates

- Runtime AI settings are loaded from `%h/.config/portfolio/env` via the
  service's `EnvironmentFile`, not from a repository `.env.local` file.
- `AI_BASE_URL=http://127.0.0.1:20128/v1` assumes the AI gateway runs on the
  same host. If it runs elsewhere, explicitly configure a private reachable URL.
- `NEXT_PUBLIC_*` values are build-time settings. Changing them requires a rebuild.
- Build and package with `scripts/bundle.sh`; the standalone artifact also
  needs `.next/static` and `public`. Follow DEPLOY.md to transfer it and restart
  the service only when deployment is authorized.
- If changing the application port, update both the unit's `PORT` and the
  tunnel's service URL together.

## Read-only checks

```bash
systemctl --user status portfolio.service
journalctl --user -u portfolio.service -n 50
curl -I http://127.0.0.1:3000
```

Run these on the deployment host. Successful local tests or a GitHub push do
not prove the production services are running or that the tunnel is healthy.
