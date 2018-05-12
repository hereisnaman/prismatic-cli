const handler = (config, args) => {};

export default [
  ['start', 'S'],
  'Start prismatic management console server',
  {
    port: {
      type: 'number',
      alias: ['p'],
      describe: 'Port to use',
      default: 5000,
    },
  },
  handler,
];
