#!/bin/bash
echo "=== Test Start Script ==="
cd /var/www/axerlyn
echo "Current Dir: $(pwd)"
echo "Listing .next:"
ls -la .next
echo "Starting Next..."
PORT=3001 npm start
