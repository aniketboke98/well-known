#!/bin/bash
echo "=== Node Processes ==="
ps aux | grep node
echo
echo "=== Checking Manifests ==="
ls -la /var/www/axerlyn/.next/prerender-manifest.json
ls -la /var/www/axerlyn/.next/required-server-files.json
ls -la /var/www/axerlyn/.next/images-manifest.json
echo "=== PM2 Logs (User: aniketboke98) ==="
sudo -u aniketboke98 pm2 logs axerlyn --lines 50 --nostream
echo "=== End Debug ==="
