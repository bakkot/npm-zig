# EXPERIMENTAL
# Use zig to eval c via wasm, in JavaScript

```js
let { compile } = require('@bakkot-dumping-ground/zig-compile');

let c = `
  extern int print(int arg);

  int add(int x, int y) {
    return x + y;
  }

  void addAndPrint(int x, int y) {
    print(add(x, y));
  }
`;

let { add, addAndPrint } = await compile({
  source: c,
  language: 'c',
  env: { print: x => console.log('printing from c', x) },
});
console.log('printing from js', add(5, 6));
addAndPrint(20, 22);
```

## But why?

I saw that Knob A fit into Hole B, and then I couldn't stop myself.

## Should I use this in production?

No.

## Platforms

Right now, just macOS-x86, because that's the only one I've bothered packaging. It's not a lot of work to add more if you want that.
