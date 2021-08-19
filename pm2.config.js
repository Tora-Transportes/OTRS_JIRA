module.exports = {
  apps: [
    {
      name: 'SERVICE_JIRA_INTEGRATION',
      script: './src/index.js',
      autorestart: true,
      watch: false,
      exec_mode: 'fork',
      exp_backoff_restart_delay: 100,
      max_memory_restart: '1024M'
    }
  ]
};
