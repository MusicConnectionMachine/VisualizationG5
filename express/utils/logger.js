const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'MusicConnectionMachine',
  streams: [
    {
      level: 'info',
      stream: process.stdout,
    },
    {
      level: 'warn',
      path: './warnings.json',
    },
  ],
  serializers: bunyan.stdSerializers,
});

module.exports = logger;
