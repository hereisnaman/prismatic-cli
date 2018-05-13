import path from 'path';
import dotenv from 'dotenv';
import { makeConfigFromPath } from 'graphql-config-extension-prisma';

import { error, dir } from './utils/logger';
import cmds from './cmds/';

const wrapCmd = ([cmd, desc, builder, handler]) => {
  const getConfig = async args => {
    let prismaEnv;
    if (args.dotenv) {
      const envPath = path.resolve(process.cwd(), args.dotenv);
      prismaEnv = dotenv.config({ path: envPath }).parsed;
    }

    const configPath = path.resolve(process.cwd(), args.config);
    let config;
    try {
      config = await makeConfigFromPath(configPath, prismaEnv);
    } catch (err) {
      error.log(`There was some error while processing.`);
      process.exit(0);
    }

    if (!config) {
      console.error(`${error.text(`Prisma config not found at:`)} ${dir.text(configPath)}`);
      process.exit(0);
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
