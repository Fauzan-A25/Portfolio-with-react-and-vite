#!/usr/bin/env bash
# edit.sh — Quick-edit portfolio data (src/data/portfolio.json).
#
# Usage:
#   ./scripts/edit.sh               Open the whole portfolio.json in $EDITOR
#   ./scripts/edit.sh projects      Open only the projects section
#   ./scripts/edit.sh skills        Open only the skills section
#   ./scripts/edit.sh certifications
#   ./scripts/edit.sh <any-key>     personalInfo, socialLinks, experiences,
#                                   education, proofs, stats, heroTypingTexts,
#                                   aboutContent, contactContent, ...
#
# After saving, the section is merged back into portfolio.json with proper
# formatting. Then rebuild (npm run build) and redeploy.
set -euo pipefail

DATA_FILE="$(cd "$(dirname "$0")/../src/data" && pwd)/portfolio.json"
EDITOR="${EDITOR:-nano}"
TMP_FILE="$(mktemp /tmp/portfolio-edit.XXXXXX.json)"
trap 'rm -f "$TMP_FILE"' EXIT

key="${1:-}"

if [[ -z "$key" ]]; then
  echo "=== portfolio.json — semua section ==="
  python3 - "$DATA_FILE" <<'EOF'
import json, sys
d = json.load(open(sys.argv[1]))
for k, v in d.items():
    if isinstance(v, list):
        print(f"  {k:<20} [{len(v)} items]")
    elif isinstance(v, dict):
        print(f"  {k:<20} {{{len(v)} keys}}")
    else:
        print(f"  {k:<20} {type(v).__name__}")
EOF
  echo
  echo "Usage: ./scripts/edit.sh <section>   (atau tanpa argumen = edit semua)"
  exit 0
fi

# Extract the requested section, edit it, merge it back.
python3 - "$DATA_FILE" "$key" "$TMP_FILE" <<'EOF'
import json, sys
data_file, key, tmp = sys.argv[1], sys.argv[2], sys.argv[3]
d = json.load(open(data_file))
if key not in d:
    sys.stderr.write(f"Section '{key}' tidak ada di portfolio.json.\n")
    sys.stderr.write(f"Tersedia: {', '.join(d.keys())}\n")
    sys.exit(1)
json.dump(d[key], open(tmp, "w"), indent=2, ensure_ascii=False)
EOF

$EDITOR "$TMP_FILE"

python3 - "$DATA_FILE" "$key" "$TMP_FILE" <<'EOF'
import json, sys
data_file, key, tmp = sys.argv[1], sys.argv[2], sys.argv[3]
d = json.load(open(data_file))
try:
    d[key] = json.load(open(tmp))
except json.JSONDecodeError as e:
    sys.stderr.write(f"JSON tidak valid: {e}\n")
    sys.exit(1)
json.dump(d, open(data_file, "w"), indent=2, ensure_ascii=False)
print(f"✅ Section '{key}' tersimpan ke portfolio.json")
EOF
