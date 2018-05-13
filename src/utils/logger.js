import chalk from 'chalk';

export const error = {
  text(msg) {
    return `${chalk.red('error:')} ${msg}`;
  },
  log(msg) {
    console.error(this.text(msg));
  },
};

export const info = {
  text(msg) {
    return `${chalk.blue('info:')} ${msg}`;
  },
  log(msg) {
    console.log(this.text(msg));
  },
};

export const success = {
  text(msg) {
    return `${chalk.green('success:')} ${msg}`;
  },
  log(msg) {
    console.log(this.text(msg));
  },
};

export const dir = {
  text(msg) {
    return `${chalk.italic.yellow(msg)}`;
  },
  log(msg) {
    console.log(this.text(msg));
  },
};

export default {
  error,
  info,
  success,
  dir,
};
