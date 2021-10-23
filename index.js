'use strict';

let fs = require('fs/promises');
let path = require('path');
let os = require('os');
let util = require('util');
let execFile = util.promisify(require('child_process').execFile);

async function compile({ source, language, env = {} }) {
  if (typeof source !== 'string') {
    throw new Error('expected source');
  }
  if (!['cc', 'c', 'zig'].includes(language)) {
    throw new Error(`unknown language ${language}`);
  }

  // TODO other platforms
  let zigDir = path.dirname(require.resolve('@bakkot-dumping-ground/zig-macos-x86/package.json'));

  let tmpDir;
  try {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'zig-eval-'));

    let inFile = path.join(tmpDir, `input.${language}`);
    await fs.writeFile(inFile, source, 'utf8');

    // is there a way to just turn off cache files? idk.
    let localCacheDir = path.join(tmpDir, 'local-cache');
    let globalCacheDir = path.join(tmpDir, 'global-cache');

    // $ ./zig/zig build-lib input.zig -target wasm32-freestanding -dynamic --cache-dir asdf --global-cache-dir asdf2 -O ReleaseSafe
    let { stderr, stdout } = await execFile(path.join(zigDir, 'zig', 'zig'), [
      'build-lib', inFile,
      '-target', 'wasm32-freestanding',
      '-dynamic',
      '--cache-dir', localCacheDir,
      '--global-cache-dir', globalCacheDir,
      '-O', 'ReleaseSafe'
    ], { cwd: tmpDir }); // cwd is necessary because I can't figure out how else to specify the output file, lol
    // console.log(stderr, stdout);

    let wasmSource = await fs.readFile(path.join(tmpDir, 'input.wasm'));
    let wasmBytes = new Uint8Array(wasmSource);
    let mod = await WebAssembly.instantiate(wasmBytes, { env });
    return mod.instance.exports;

  } finally {
    if (tmpDir) {
      await fs.rm(tmpDir, { recursive: true });
    }
  }
}

module.exports = { compile };
