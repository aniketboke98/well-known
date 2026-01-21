import subprocess
import sys
import os

SERVER_IP = "74.225.243.159"
USER = "aniketboke98"
PASSWORD = "Abhi@210401@"
DOMAIN = "axerlyn.in"

def run_ssh_command(command):
    """Runs a single command on the remote server."""
    full_command = [
        "sshpass", "-p", PASSWORD,
        "ssh", "-o", "StrictHostKeyChecking=no", f"{USER}@{SERVER_IP}",
        command
    ]
    print(f"Executing remote command: {command}")
    result = subprocess.run(full_command, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error executing command: {result.stderr}")
        return False, result.stderr
    print(result.stdout)
    return True, result.stdout

def upload_file(local_path, remote_path):
    """Uploads a file to the remote server."""
    full_command = [
        "sshpass", "-p", PASSWORD,
        "scp", "-o", "StrictHostKeyChecking=no", local_path, f"{USER}@{SERVER_IP}:{remote_path}"
    ]
    print(f"Uploading {local_path} to {remote_path}...")
    result = subprocess.run(full_command, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error uploading file: {result.stderr}")
        return False
    return True

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 deploy_automation.py <command> [args]")
        sys.exit(1)

    action = sys.argv[1]

    if action == "check_connection":
        success, _ = run_ssh_command("echo 'Connection successful'")
        if success:
            print("Successfully connected to server.")
        else:
            print("Failed to connect to server.")
            sys.exit(1)
            
    elif action == "run_setup":
        # Upload setup script
        remote_path = f"/home/{USER}/server_setup.sh"
        if upload_file("server_setup.sh", remote_path):
            run_ssh_command(f"chmod +x {remote_path}")
            # Run setup script - using echo to pipe password to sudo if prompt is needed? 
            # Ideally user is in sudoers without password or we pass it. 
            # Trying standard execution first, if it fails on sudo, we might need -S
            # Let's try to run it. If it asks for password, this simple script might hang or fail.
            # Best bet: pipe password: echo PASSWORD | sudo -S ./script
            run_ssh_command(f"echo '{PASSWORD}' | sudo -S {remote_path}")
            
    elif action == "deploy_code":
        # We will use rsync with sshpass for efficient syncing
        # Note: rsync needs to be installed locally. Mac usually has it.
        # Construct rsync command
        exclude_flags = ["--exclude=node_modules", "--exclude=.next", "--exclude=.git", "--exclude=.env.local"] 
        # Note: We might want to upload .env.local manually or separately if it contains secrets not in repo
        
        rsync_cmd = [
            "sshpass", "-p", PASSWORD,
            "rsync", "-avz", "-e", "ssh -o StrictHostKeyChecking=no"
        ] + exclude_flags + [".", f"{USER}@{SERVER_IP}:/var/www/axerlyn"]
        
        print("Syncing files...")
        result = subprocess.run(rsync_cmd, text=True)
        if result.returncode == 0:
             print("Files synced successfully.")
        else:
             print("File sync failed.")
             
    elif action == "upload_env":
         upload_file(".env.local", "/var/www/axerlyn/.env.local")

    elif action == "start_app":
        run_ssh_command("cd /var/www/axerlyn && npm install && npm run build && pm2 start npm --name 'axerlyn' -- start -- --port 3000 || pm2 restart axerlyn")
        run_ssh_command("pm2 save")

    elif action == "fix_permissions":
        print("Fixing permissions for /var/www/axerlyn...")
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S chown -R {USER}:{USER} /var/www/axerlyn")
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S chmod -R 755 /var/www/axerlyn")

    elif action == "configure_nginx":
        # Upload nginx config
        upload_file("nginx.conf", "/tmp/nginx.conf") # Upload to tmp first to avoid permission issues
        
        # Move to sites-available and link
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S mv /tmp/nginx.conf /etc/nginx/sites-available/axerlyn")
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S ln -sf /etc/nginx/sites-available/axerlyn /etc/nginx/sites-enabled/")
        
        # Test and restart
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S nginx -t")
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S systemctl restart nginx")
        
    elif action == "setup_ssl":
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S certbot --nginx -d {DOMAIN} --non-interactive --agree-tos -m admin@{DOMAIN} --redirect")

    elif action == "run_debug":
        upload_file("debug_server.sh", "/tmp/debug_server.sh")
        run_ssh_command(f"chmod +x /tmp/debug_server.sh")
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S /tmp/debug_server.sh")

    elif action == "run_test":
        upload_file("test_start.sh", "/tmp/test_start.sh")
        run_ssh_command(f"chmod +x /tmp/test_start.sh")
        run_ssh_command(f"echo '{PASSWORD}' | sudo -u {USER} /tmp/test_start.sh")

    elif action == "deploy_artifact":
        upload_file("next_build.zip", "/tmp/next_build.zip")
        # Remove existing .next and unzip new one
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S rm -rf /var/www/axerlyn/.next")
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S unzip -q /tmp/next_build.zip -d /var/www/axerlyn/")
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S chown -R aniketboke98:aniketboke98 /var/www/axerlyn/.next")
        run_ssh_command("pm2 restart axerlyn")

    elif action == "upload_manifest":
        upload_file(".next/prerender-manifest.json", "/tmp/prerender-manifest.json")
        upload_file(".next/images-manifest.json", "/tmp/images-manifest.json")
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S mv /tmp/prerender-manifest.json /var/www/axerlyn/.next/prerender-manifest.json")
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S mv /tmp/images-manifest.json /var/www/axerlyn/.next/images-manifest.json")
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S chown aniketboke98:aniketboke98 /var/www/axerlyn/.next/prerender-manifest.json")
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S chown aniketboke98:aniketboke98 /var/www/axerlyn/.next/images-manifest.json")
        run_ssh_command("pm2 restart axerlyn")

    elif action == "run_deploy_script":
        upload_file("deploy_local_build.sh", "/tmp/deploy_local_build.sh")
        run_ssh_command(f"chmod +x /tmp/deploy_local_build.sh")
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S /tmp/deploy_local_build.sh")

    elif action == "deploy_ecosystem":
        upload_file("ecosystem.config.js", "/tmp/ecosystem.config.js")
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S mv /tmp/ecosystem.config.js /var/www/axerlyn/ecosystem.config.js")
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S chown aniketboke98:aniketboke98 /var/www/axerlyn/ecosystem.config.js")
        run_ssh_command("pm2 delete axerlyn || true")
        run_ssh_command(f"cd /var/www/axerlyn && pm2 start ecosystem.config.js")
        run_ssh_command("pm2 save")

    elif action == "deploy_git":
        REPO_URL = "https://github.com/aniketboke98/well-known.git"
        APP_DIR = "/var/www/axerlyn"
        
        print("Starting GitHub deployment...")
        
        # 1. Backup .env.local if it exists
        print("Backing up .env.local...")
        run_ssh_command(f"cp {APP_DIR}/.env.local /tmp/.env.local.bak")
        
        # 2. Remove existing directory (using sudo to be safe with permissions)
        print("Removing existing application files...")
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S rm -rf {APP_DIR}")
        
        # 3. Clone Repository
        print(f"Cloning {REPO_URL}...")
        # Create parent dir if not exists (should be there but just in case)
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S mkdir -p /var/www")
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S chown {USER}:{USER} /var/www")
        
        # Clone
        run_ssh_command(f"git clone {REPO_URL} {APP_DIR}")
        
        # 4. Restore .env.local
        print("Restoring .env.local...")
        run_ssh_command(f"cp /tmp/.env.local.bak {APP_DIR}/.env.local")
        
        # 5. Fix permissions again just in case
        run_ssh_command(f"echo '{PASSWORD}' | sudo -S chown -R {USER}:{USER} {APP_DIR}")
        
        # 6. Install and Build
        print("Installing dependencies and building...")
        run_ssh_command(f"cd {APP_DIR} && npm install && npm run build")
        
        print("Restarting application...")
        run_ssh_command(f"pm2 delete axerlyn || true") # Delete to force new args
        run_ssh_command(f"cd {APP_DIR} && pm2 start npm --name 'axerlyn' -- start -- --port 3001")
        run_ssh_command("pm2 save")

