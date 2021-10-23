'use strict';

let { compile } = require('.');

let c = `
  extern int print(int arg);

  int add(int x, int y) {
    return x + y;
  }

  void addAndPrint(int x, int y) {
    print(add(x, y));
  }
`;

(async () => {
  let { add, addAndPrint } = await compile({
    source: c,
    language: 'c',
    env: { print: x => console.log('printing from c', x) },
  });
  console.log('printing from js', add(5, 6));
  addAndPrint(20, 22);
})().catch(e => {
  console.error(e);
  process.exit(1);
});
