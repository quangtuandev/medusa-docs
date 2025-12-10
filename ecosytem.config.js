module.exports = {
    apps: [
      {
        name: 'user-guide',
        script: 'yarn',
        args: 'start:monorepo -p 3000',
        autorestart: true,
         watch: false,
         max_memory_restart: '1G',
         interpreter: "/bin/bash",
      }
    ],
  };
  