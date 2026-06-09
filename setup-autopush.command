#!/bin/bash
# setup-autopush.command
# Double-click this file ONCE to install the auto-push launchd agent.
# After that, any uncommitted changes in this repo are automatically
# committed and pushed to GitHub every 5 minutes — fully hands-free.

set -e

REPO="/Users/petehallett/Documents/websites/quiet-space-neuro-index/quiet-space-neuro-index"
PLIST_NAME="com.quietspaceclub.blog-autopush.plist"
PLIST_SRC="$REPO/$PLIST_NAME"
AGENTS_DIR="$HOME/Library/LaunchAgents"
PLIST_DEST="$AGENTS_DIR/$PLIST_NAME"

echo ""
echo "🚀  Quiet Space Club — Auto-Push Agent Setup"
echo "============================================"
echo ""

# Make autopush.sh executable
chmod +x "$REPO/autopush.sh"
echo "✅  Made autopush.sh executable"

# Ensure LaunchAgents directory exists
mkdir -p "$AGENTS_DIR"

# Unload existing agent if present (ignore errors)
launchctl unload "$PLIST_DEST" 2>/dev/null || true

# Copy plist to LaunchAgents
cp "$PLIST_SRC" "$PLIST_DEST"
echo "✅  Copied plist to ~/Library/LaunchAgents/"

# Load the agent
launchctl load "$PLIST_DEST"
echo "✅  Agent loaded — it will run every 5 minutes"

echo ""
echo "Done! The auto-push agent is now active."
echo ""
echo "• It checks for uncommitted changes every 5 minutes"
echo "• When the daily blog task writes new files, they'll be"
echo "  automatically committed and pushed within 5 minutes"
echo "• Logs are written to: $REPO/autopush.log"
echo ""
echo "To uninstall later, run:"
echo "  launchctl unload $PLIST_DEST && rm $PLIST_DEST"
echo ""
read -p "Press Enter to close..."
