var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
  useNetworkRecordMocks: () => useNetworkRecordMocks
});
var import_fs = __toModule(require("fs"));
var import_recorder = __toModule(require("./recorder"));
var import_utils = __toModule(require("./utils"));
const mergeOverriddenResponses = (override, requests) => {
  return requests.map((r) => __spreadProps(__spreadValues({}, r), {
    response: override[r.url] || r.response
  }));
};
const useNetworkRecordMocks = (_0, ..._1) => __async(void 0, [_0, ..._1], function* (page, configs = {}) {
  const { identifier, recordRoute, logRecording, overrideResponses } = configs || {};
  const basePath = `${(0, import_utils.getCallerFile)().replace(".ts", "").replace(".js", "")}${identifier ? `.${identifier}` : ""}`;
  const path = `${basePath}.mocks.json`;
  let requests = [];
  if (import_fs.default.existsSync(path)) {
    console.log(`Using "${path}" for network request mocks.`);
    requests = yield (0, import_utils.readFile)(path);
  } else if (import_fs.default.existsSync(`${basePath}.har`)) {
    console.log(`A HAR file was found for "${basePath}", creating a mock file and using it.`);
    requests = yield (0, import_recorder.readHarFile)(`${basePath}.har`, recordRoute);
    yield (0, import_utils.writeFile)(path, requests);
  } else {
    console.log(`Mocks file not found${identifier ? ` for ${identifier}` : ""}, recording a new one!`);
    requests = yield (0, import_recorder.recordHar)(recordRoute, path, logRecording);
  }
  if (!!overrideResponses) {
    requests = mergeOverriddenResponses(overrideResponses, requests);
  }
  yield (0, import_utils.mockRequests)(requests, page);
  return requests;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useNetworkRecordMocks
});
