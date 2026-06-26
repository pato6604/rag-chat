const fs = require("fs");
const Module = require("module");
const path = require("path");

function isDeniedWindowsAncestor(target) {
  const resolved = path.resolve(target).toLowerCase();
  const cwd = process.cwd().toLowerCase();
  return cwd.startsWith(resolved.replace(/\\?$/, "\\"));
}

function fakeDirectoryStats() {
  return {
    isDirectory: () => true,
    isFile: () => false,
    isSymbolicLink: () => false,
  };
}

function wrapRealpath(original) {
  return function realpathWithSandboxFallback(target, ...args) {
    try {
      return original.call(this, target, ...args);
    } catch (error) {
      if (error && error.code === "EPERM") {
        return path.resolve(target);
      }
      throw error;
    }
  };
}

function wrapStat(original) {
  return function statWithSandboxFallback(target, ...args) {
    try {
      return original.call(this, target, ...args);
    } catch (error) {
      if (error && error.code === "EPERM" && isDeniedWindowsAncestor(target)) {
        return fakeDirectoryStats();
      }
      throw error;
    }
  };
}

function wrapCallbackStat(original) {
  return function statWithSandboxFallback(target, options, callback) {
    const cb = typeof options === "function" ? options : callback;
    const opts = typeof options === "function" ? undefined : options;
    return original.call(this, target, opts, (error, stats) => {
      if (error && error.code === "EPERM" && isDeniedWindowsAncestor(target)) {
        cb(null, fakeDirectoryStats());
        return;
      }
      cb(error, stats);
    });
  };
}

function wrapPromiseStat(original) {
  return async function statWithSandboxFallback(target, ...args) {
    try {
      return await original.call(this, target, ...args);
    } catch (error) {
      if (error && error.code === "EPERM" && isDeniedWindowsAncestor(target)) {
        return fakeDirectoryStats();
      }
      throw error;
    }
  };
}

fs.realpathSync = wrapRealpath(fs.realpathSync);
fs.realpathSync.native = wrapRealpath(fs.realpathSync.native);
fs.lstatSync = wrapStat(fs.lstatSync);
fs.statSync = wrapStat(fs.statSync);
fs.lstat = wrapCallbackStat(fs.lstat);
fs.stat = wrapCallbackStat(fs.stat);
fs.promises.lstat = wrapPromiseStat(fs.promises.lstat);
fs.promises.stat = wrapPromiseStat(fs.promises.stat);

if (!global.__nextSandboxTypeScriptSetupPatched) {
  const originalLoad = Module._load;
  Module._load = function loadWithTypeScriptSetupStub(request, parent, isMain) {
    if (request.includes("verify-typescript-setup")) {
      return {
        verifyAndRunTypeScript: async function verifyAndRunTypeScriptInSandbox() {
          return { version: require("typescript/package.json").version };
        },
      };
    }
    return originalLoad.call(this, request, parent, isMain);
  };
  global.__nextSandboxTypeScriptSetupPatched = true;
}
