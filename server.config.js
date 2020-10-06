module.exports = {
  apps: [
    {
      name: "rb-gps-js",
      script: "./app.js",
      instances: 8,
      exec_mode: "cluster",
      watch: true,
      log_file: "~/.pm2/logs/rb-gps-js.log",
      out_file: "NULL", // ~/.pm2/logs/rb-gps-js.log
      error_file: "NULL", // ~/.pm2/logs/rb-gps-js.log
      combine_logs: true,
      merge_logs: true,
      env_production: {
        NODE_ENV: "production",
        NODE_PATH:"./"
      },
      env_development: {
        NODE_ENV: "development",
        NODE_PATH:"./"
      }
    }
  ]
};
