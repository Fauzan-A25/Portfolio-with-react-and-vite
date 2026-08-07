#!/usr/bin/env bash
# edit.sh — Quick-edit portfolio JSON data files.
#
# Usage:
#   ./scripts/edit.sh              List all editable files
#   ./scripts/edit.sh projects     Open projects.json in $EDITOR (or nano)
#   ./scripts/edit.sh personal     Open personal.json
#   ./scripts/edit.sh skills       Open skills.json
#
# Shortcuts (one letter):
#   p  = personal    x  = experiences   c  = certifications
#   s  = skills      e  = education      n  = nav
#   j  = projects    a  = about          h  = hero
#   l  = social      f  = footer         k  = contact
set -euo pipefail

DATA_DIR="$(cd "$(dirname "$0")/../src/data/portfolio" && pwd)"
EDITOR="${EDITOR:-nano}"

declare -A FILES=(
  [personal]=personal.json
  [social]=social.json
  [proofs]=proofs.json
  [projects]=projects.json
  [skills]=skills.json
  [experiences]=experiences.json
  [education]=education.json
  [certifications]=certifications.json
  [stats]=stats.json
  [nav]=nav.json
  [hero]=hero.json
  [emailjs]=emailjs.json
  [about]=about.json
  [skills-content]=skills-content.json
  [contact]=contact.json
  [projects-content]=projects-content.json
  [footer]=footer.json
)

# Shortcuts
declare -A SHORTCUTS=(
  [p]=personal [s]=skills [j]=projects [x]=experiences
  [e]=education [c]=certifications [a]=about [h]=hero
  [l]=social [f]=footer [k]=contact [n]=nav
)

key="${1:-}"

# Resolve shortcut
[[ -n "$key" ]] && key="${SHORTCUTS[$key]:-$key}"

if [[ -z "$key" ]]; then
  echo "=== Portfolio Data Files ==="
  echo
  for name in $(echo "${!FILES[@]}" | tr ' ' '\n' | sort); do
    file="${FILES[$name]}"
    size=$(wc -c < "$DATA_DIR/$file" 2>/dev/null || echo "?")
    printf "  %-18s → %s (%s bytes)\n" "$name" "$file" "$size"
  done
  echo
  echo "Usage: ./scripts/edit.sh <name>"
  echo "Shortcuts: p=personal s=skills j=projects x=experiences c=certs a=about h=hero"
  exit 0
fi

file="${FILES[$key]:-}"
if [[ -z "$file" ]]; then
  echo "Unknown data file: $key"
  echo "Run without args to see available files."
  exit 1
fi

exec $EDITOR "$DATA_DIR/$file"
