import * as migration_20241129_211723 from './20241129_211723';

export const migrations = [
  {
    up: migration_20241129_211723.up,
    down: migration_20241129_211723.down,
    name: '20241129_211723'
  },
];
