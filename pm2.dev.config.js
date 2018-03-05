const IGNORE = [
  '.idea',
  'node_modules'
]

module.exports = {
  apps: [
    {
      name: 'server',
      script: 'server.js',
      watch: ['lib', 'routes'],
      ignore_watch: IGNORE,
      env: {
        'NODE_ENV': 'development',
        'PORT': 3333,
        'TWILIO_ACCOUNT_SID': 'ACe8abcd2bbd0c5d12c66ef2f7535b673f',
        'TWILIO_AUTH_TOKEN': 'caecebb0f96ef91512429e3ed567b459',
        'TWILIO_SENDER': "+447533047726"
      }
    },
    {
      name: 'client',
      cwd: 'client',
      script: 'npm',
      args: 'start',
      env: {
        'PORT': 3334
      }
    }
  ]
}
