import cmds from './cmds/';

const wrapCmd = ([cmd, desc, builder, handler]) => {
  const config = {};
  const wrapHandler = args => handler(config, args);
  return [cmd, desc, builder, wrapHandler];
};

const installCommands = () => {
  let yargs = require('yargs'); // eslint-disable-line
  cmds.forEach(cmd => {
    yargs = yargs.command(...wrapCmd(cmd));
  });

  return yargs;
};

export default installCommands;
