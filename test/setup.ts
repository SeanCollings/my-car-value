// import { rm } from 'fs/promises';
// import { join } from 'path';

global.beforeEach(async () => {
  // dont use as we moved test.sqlite to memory
  // try {
  //   await rm(join(__dirname, '..', 'test.sqlite'));
  // } catch (err) {}
});
