#!/bin/bash
# autopush.sh — run by launchd every 5 minutes
# Commits and pushes any uncommitted changes to the quiet-space-neuro-index repo.
# Installed via setup-autopush.command (run once).

REPO="/Users/petehallett/Documents/websites/quiet-space-neuro-index/quiet-space-neuro-index"
LOG="$REPO/autopush.log"

cd "$REPO" || { echo "$(date): ERROR — repo not found at $REPO" >> "$LOG"; exit 1; }

# Only act if there are staged/unstaged changes or untracked files
if git status --porcelain | grep -q .; then
  echo "$(date): Changes detected — committing and pushing…" >> "$LOG"

  git add -A >> "$LOG" 2>&1

  # Use today's date in the commit message
  DATE=$(date +%Y-%m-%d)
  git commit -m "feat(blog): Automated daily post — $DATE [autopush]" >> "$LOG" 2>&1

  git push origin main >> "$LOG" 2>&1

  if [ $? -eq 0 ]; then
    echo "$(date): ✅ Push succeeded." >> "$LOG"
  else
    echo "$(date): ❌ Push failed — check credentials or network." >> "$LOG"
  fi
else
  echo "$(date): No changes to push." >> "$LOG"
fi
