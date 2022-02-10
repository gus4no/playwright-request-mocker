var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
__export(exports, {
  getCallerFile: () => getCallerFile,
  readFile: () => readFile,
  removeFile: () => removeFile,
  waitForFileExists: () => waitForFileExists,
  writeFile: () => writeFile
});
var import_fs = __toModule(require("fs"));
var import_url = __toModule(require("url"));
const writeFile = (filePath, requests) => {
  return new Promise((resolve, reject) => {
    import_fs.default.writeFile(filePath, JSON.stringify({ requests }, null, 2), (err) => {
      if (err)
        reject(err);
      else
        resolve();
    });
  });
};
const removeFile = (filePath) => {
  return new Promise((resolve, reject) => {
    import_fs.default.unlink(filePath, (err) => {
      if (err)
        reject(err);
      else
        resolve();
    });
  });
};
const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    import_fs.default.readFile(filePath, (err, data) => {
      if (err)
        reject(err);
      else {
        try {
          const requests = JSON.parse(data.toString()).requests;
          resolve(requests);
        } catch (e) {
          reject(e);
        }
      }
    });
  });
};
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const waitForFileExists = (filePath, currentTime = 0, timeout = 1e4) => __async(void 0, null, function* () {
  if (import_fs.default.existsSync(filePath))
    return true;
  if (currentTime === timeout)
    return false;
  yield sleep(1e3);
  return yield waitForFileExists(filePath, currentTime + 1e3, timeout);
});
const getCallerFile = () => {
  const err = new Error();
  Error.prepareStackTrace = (_, stack2) => stack2;
  const stack = err.stack;
  Error.prepareStackTrace = void 0;
  const callerFile = stack.map((s) => s.getFileName()).filter((s) => s && !s.includes("node_modules") && !s.includes("internal")).pop();
  const isFileUrl = callerFile.includes("file:");
  const callerFilePath = isFileUrl ? import_url.default.fileURLToPath(callerFile) : callerFile;
  return callerFilePath;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCallerFile,
  readFile,
  removeFile,
  waitForFileExists,
  writeFile
});
