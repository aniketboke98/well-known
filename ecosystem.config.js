module.exports = {
  apps : [{
    name   : "axerlyn",
    script : "npm",
    args   : "start",
    cwd    : "/var/www/axerlyn",
    env: {
      PORT: "3001",
      NODE_ENV: "production"
    }
  }]
}
