import { success, dir } from '../utils/logger';

const handler = (args, config) => {
  console.log(`${success.text(`Prismatic server is running at:`)} ${dir.text(`http://localhost:${args.port}`)}`);
};

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
