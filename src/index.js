import path from 'path';
import dotenv from 'dotenv';
import { makeConfigFromPath } from 'graphql-config-extension-prisma';

import cmds from './cmds/';

const wrapCmd = ([cmd, desc, builder, handler]) => {
  const getConfig = async args => {
    let prismaEnv;
    if (args.dotenv) {
      const envPath = path.resolve(process.cwd(), args.dotenv);
      prismaEnv = dotenv.config({ path: envPath }).parsed;
    }

    const configPath = path.resolve(process.cwd(), args.config);
    let config = {};
    try {
      config = await makeConfigFromPath(configPath, prismaEnv);
    } catch (err) {
      console.log(err);
      if (err.name === 'ConfigNotFoundError') {
        console.error(`".graphqlconfig" file is not available in the provided config directory: ${configPath}`);
      }
    }

    return config;
  };

  return [cmd, desc, builder, async args => handler(args, await getConfig(args))];
};

const installCommands = () => {
  let yargs = require('yargs'); // eslint-disable-line
  cmds.forEach(cmd => {
    yargs = yargs.command(...wrapCmd(cmd));
  });

  return yargs;
};

export default installCommands;
