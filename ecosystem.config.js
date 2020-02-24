module.exports = {
  apps : [{
    name: 'SSR',
    script: 'server.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'banhbaothitbo',
      host: '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:TieuHoanToLy96/imgur-frontend.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
