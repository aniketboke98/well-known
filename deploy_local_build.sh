#!/bin/bash
echo "=== Starting Local Build Deployment on Server ==="
ZIP_FILE="/tmp/next_build.zip"
DEST_DIR="/var/www/axerlyn"

if [ ! -f "$ZIP_FILE" ]; then
    echo "Error: Zip file $ZIP_FILE not found!"
    exit 1
fi

echo "Cleaning destination..."
rm -rf "$DEST_DIR/.next"

echo "Unzipping..."
unzip -o "$ZIP_FILE" -d "$DEST_DIR" > /tmp/unzip.log
# Check if unzip succeeded
if [ $? -eq 0 ]; then
    echo "Unzip successful."
else
    echo "Unzip failed!"
    cat /tmp/unzip.log | tail -n 10
    exit 1
fi

echo "Checking structure..."
if [ -d "$DEST_DIR/.next/.next" ]; then
    echo "Nested .next found. Fixing..."
    mv "$DEST_DIR/.next/.next/"* "$DEST_DIR/.next/"
    rmdir "$DEST_DIR/.next/.next"
fi

echo "Fixing permissions..."
chown -R aniketboke98:aniketboke98 "$DEST_DIR/.next"

echo "Verifying artifacts..."
ls -la "$DEST_DIR/.next/BUILD_ID"
ls -la "$DEST_DIR/.next/routes-manifest.json"
ls -la "$DEST_DIR/.next/server"

echo "Restarting PM2..."
pm2 restart axerlyn

echo "Deployment finished."
