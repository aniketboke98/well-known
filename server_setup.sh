#!/bin/bash
set -e

# Update and upgrade
echo "Updating system..."
sudo apt-get update -y
sudo apt-get upgrade -y

# Install Node.js (Latest LTS)
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
    sudo apt-get install -y nodejs
fi

# Install Build Essentials
sudo apt-get install -y build-essential

# Install PM2
echo "Installing PM2..."
sudo npm install -g pm2

# Install Nginx
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    sudo apt-get install -y nginx
fi

# Install Certbot
if ! command -v certbot &> /dev/null; then
    echo "Installing Certbot..."
    sudo apt-get install -y certbot python3-certbot-nginx
fi

# Create app directory
echo "Creating app directory..."
if [ ! -d "/var/www/axerlyn" ]; then
    sudo mkdir -p /var/www/axerlyn
    sudo chown $USER:$USER /var/www/axerlyn
fi

