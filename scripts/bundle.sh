#!/usr/bin/env bash
# bundle.sh — Build the app and assemble a self-contained deploy directory.
#
# `output: 'standalone'` emits .next/standalone with a server.js and a pruned
# node_modules, but deliberately leaves out .next/static and public/ because it
# assumes a CDN serves them. There is no CDN here — Cloudflare Tunnel forwards
# straight to the Node process — so this script copies them into place.
#
# Result: dist/ is everything the server needs. Nothing is installed on the
# server; you copy dist/ over and restart the unit.
#
# Usage:
#   ./scripts/bundle.sh              Build into ./dist
#   ./scripts/bundle.sh /tmp/out     Build into a different directory
set -euo pipefail

cd "$(dirname "$0")/.."
OUT="${1:-dist}"

echo "==> Building"
npm run build

echo "==> Assembling $OUT"
rm -rf "$OUT"
mkdir -p "$OUT"

# The server itself: server.js, package.json, pruned node_modules, .next server
# chunks. This is the bulk of the artifact.
cp -R .next/standalone/. "$OUT/"

# Client-side JS and CSS. Without this the page loads unstyled and inert.
mkdir -p "$OUT/.next/static"
cp -R .next/static/. "$OUT/.next/static/"

# Images, audio, the Google Search Console verification file. Without this
# every asset under / is a 404.
cp -R public "$OUT/public"

# A stray .env in the artifact would silently override the systemd
# EnvironmentFile, which is a confusing way to leak or lose a key.
find "$OUT" -maxdepth 1 -name '.env*' -delete

echo "==> Done: $OUT ($(du -sh "$OUT" | cut -f1))"
echo
echo "Deploy with:"
echo "  rsync -a --delete $OUT/ user@server:~/apps/portfolio/"
echo "  ssh user@server 'systemctl --user restart portfolio'"
