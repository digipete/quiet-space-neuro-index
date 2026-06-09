#!/bin/bash
# fix-and-install-autopush.command
# Recovers all backlogged blog posts, pushes them to GitHub,
# and installs the auto-push launchd agent for future runs.

REPO="/Users/petehallett/Documents/websites/quiet-space-neuro-index/quiet-space-neuro-index"
PLIST_NAME="com.quietspaceclub.blog-autopush.plist"
PLIST_SRC="$REPO/$PLIST_NAME"
AGENTS_DIR="$HOME/Library/LaunchAgents"
PLIST_DEST="$AGENTS_DIR/$PLIST_NAME"

echo ""
echo "Quiet Space Club — Backlog Recovery + Auto-Push Setup"
echo "======================================================"
echo ""

cd "$REPO" || { echo "ERROR: Repo not found at $REPO"; exit 1; }

# --- STEP 1: Clear any stale git lock ---
if [ -f ".git/index.lock" ]; then
  rm -f ".git/index.lock"
  echo "Removed stale .git/index.lock"
fi

# --- STEP 2: Push backlogged posts ---
echo ""
echo "STEP 1: Recovering backlogged posts..."
echo "Current git status:"
git status --short

if git status --porcelain | grep -q .; then
  git add -A
  git commit -m "feat(blog): Recover backlogged posts and hero images — $(date +%Y-%m-%d) [recovery]"
  echo ""
  echo "Pushing to GitHub..."
  git push origin main
  if [ $? -eq 0 ]; then
    echo "All backlogged posts pushed successfully."
  else
    echo "Push failed — check network and try again."
    exit 1
  fi
else
  echo "Nothing to commit — repo already up to date."
fi

# --- STEP 3: Install the launchd agent ---
echo ""
echo "STEP 2: Installing auto-push agent..."

chmod +x "$REPO/autopush.sh"
echo "Made autopush.sh executable"

mkdir -p "$AGENTS_DIR"

launchctl unload "$PLIST_DEST" 2>/dev/null || true

cp "$PLIST_SRC" "$PLIST_DEST"
echo "Copied plist to ~/Library/LaunchAgents/"

launchctl load "$PLIST_DEST"
echo "Agent loaded — will run every 5 minutes"

# --- STEP 4: Verify agent is loaded ---
echo ""
echo "STEP 3: Verifying..."
if launchctl list | grep -q "com.quietspaceclub.blog-autopush"; then
  echo "Agent is active: com.quietspaceclub.blog-autopush"
else
  echo "WARNING: Agent not found in launchctl list — may need a restart"
fi

echo ""
echo "Done."
echo "  Backlog: pushed to GitHub"
echo "  Auto-push agent: active (runs every 5 minutes)"
echo "  Log file: $REPO/autopush.log"
echo ""
read -p "Press Enter to close..."
