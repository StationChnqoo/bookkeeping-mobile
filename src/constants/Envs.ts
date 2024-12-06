import {EnvKeys} from './Interfaces';

export default class Envs {
  package: 'debug' | 'release';
  variables = {
    debug: {
      [EnvKeys.HOST]: 'http://192.168.210.35:3000',
    },
    release: {
      [EnvKeys.HOST]: 'https://service.cctv3.net',
    },
  };
  constructor() {
    this.package = __DEV__ ? 'debug' : 'release';
  }
  get(key: EnvKeys) {
    return this.variables[this.package][key];
  }
}