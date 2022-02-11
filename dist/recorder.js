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
  readHarFile: () => readHarFile,
  recordHar: () => recordHar
});
var import_test = __toModule(require("@playwright/test"));
var import_fs = __toModule(require("fs"));
var import_os = __toModule(require("os"));
var import_utils = __toModule(require("./utils"));
const readHarFile = (path, route) => {
  const host = route.replace("https://", "").replace("http://", "").split("/")[0];
  return new Promise((resolve, reject) => {
    import_fs.default.readFile(path, (err, data) => {
      if (err)
        reject(err);
      else {
        const result = JSON.parse(data.toString());
        const xgrRequests = result.log.entries.filter((e) => {
          const url = e.request.url;
          return !url.includes(host) && !/(.png)|(.jpeg)|(.webp)|(.jpg)|(.gif)|(.css)|(.js)|(.woff2)/.test(url) && !/(image)|(font)|(javascript)|(css)|(html)|(text\/plain)/.test(e.response.content.mimeType);
        }).map(({ request, response }) => {
          var _a, _b;
          const responseString = response.content.text ? Buffer.from(response.content.text, "base64").toString() : "{}";
          let requestData;
          try {
            requestData = JSON.parse(((_a = request == null ? void 0 : request.postData) == null ? void 0 : _a.text) || "{}");
          } catch (e) {
            requestData = (_b = request == null ? void 0 : request.postData) == null ? void 0 : _b.text;
          }
          return {
            url: (0, import_utils.endpointOfUrl)(request.url),
            request,
            requestData,
            response: JSON.parse(responseString)
          };
        });
        resolve(xgrRequests);
      }
    });
  });
};
const recordHar = (route, urlPattern, filePath, logRecording = false) => __async(void 0, null, function* () {
  const harPath = filePath.replace(".json", ".temp.har");
  const browser = yield import_test.chromium.launchPersistentContext(`${import_os.default.tmpdir()}/chrome-user-data-dir`, {
    headless: false,
    viewport: null,
    recordHar: {
      omitContent: false,
      path: harPath
    }
  });
  const page = yield browser.newPage();
  yield page.goto(route);
  logRecording && (0, import_utils.setHttpLogs)(page, urlPattern);
  console.log("Recording requests");
  yield page.pause();
  yield page.close();
  yield browser.close();
  let requests = [];
  try {
    console.log("Processing recording...");
    yield (0, import_utils.waitForFileExists)(filePath);
    requests = yield readHarFile(harPath, route);
    yield (0, import_utils.writeFile)(filePath, requests);
    yield (0, import_utils.removeFile)(harPath);
    console.log("Recording successfully saved!");
  } catch (e) {
    console.error(e);
    yield (0, import_utils.removeFile)(harPath);
  }
  return requests;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  readHarFile,
  recordHar
});
