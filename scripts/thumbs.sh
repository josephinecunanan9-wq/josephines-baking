#!/bin/bash
# Regenerate the card thumbnails in public/photos/thumbs from public/photos/recipes.
# Run after adding or replacing a recipe photo. Safe to re-run; it overwrites.
set -e
cd "$(dirname "$0")/../public/photos"
mkdir -p thumbs
n=0
for f in recipes/*; do
  case "$f" in *.jpg|*.JPG|*.jpeg|*.JPEG|*.png|*.PNG) ;; *) continue ;; esac
  base="$(basename "$f")"
  sips -s format jpeg --setProperty formatOptions 68 -Z 800 "$f" --out "thumbs/${base%.*}.jpg" >/dev/null 2>&1
  n=$((n+1))
done
echo "regenerated $n thumbnails"
