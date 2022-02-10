var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
  endpointOfUrl: () => endpointOfUrl,
  mockRequests: () => mockRequests,
  mockRouteResponse: () => mockRouteResponse,
  setHttpLogs: () => setHttpLogs
});
const mockRequests = (data, page) => __async(void 0, null, function* () {
  yield Promise.all(data.map((request) => __async(void 0, null, function* () {
    yield mockRouteResponse(page, `**${request.url}`, request.response);
  })));
});
const mockRouteResponse = (_0, _1, _2, ..._3) => __async(void 0, [_0, _1, _2, ..._3], function* (page, url, mock, status = 200, headers = { "access-control-allow-origin": "*" }) {
  yield page.route(url, (route) => route.fulfill({
    headers,
    status,
    body: JSON.stringify(mock)
  }));
});
const endpointOfUrl = (route) => {
  const routeFrag = route.replace("https://", "");
  return routeFrag.substring(routeFrag.indexOf("/"));
};
const setHttpLogs = (page) => {
  page.on("request", (request) => {
    if (request.resourceType() === "xhr") {
      console.log(">>", endpointOfUrl(request.url()));
      console.dir(request.postData(), { depth: null });
    }
  });
  page.on("response", (response) => __async(void 0, null, function* () {
    if (response.request().resourceType() === "xhr") {
      console.log("<<", endpointOfUrl(response.url()));
      console.dir(yield response.json(), { depth: null });
    }
  }));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  endpointOfUrl,
  mockRequests,
  mockRouteResponse,
  setHttpLogs
});
