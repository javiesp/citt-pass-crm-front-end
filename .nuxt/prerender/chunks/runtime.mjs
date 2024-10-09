import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { defineEventHandler, handleCacheHeaders, splitCookiesString, isEvent, createEvent, fetchWithEvent, getRequestHeader, eventHandler, setHeaders, sendRedirect, proxyRequest, setResponseStatus, setResponseHeader, send, getRequestHeaders, removeResponseHeader, createError, getResponseHeader, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler } from 'file://C:/Users/Public/javidev/citt-pass-crm-front-end/node_modules/h3/dist/index.mjs';
import { createFetch as createFetch$1, Headers as Headers$1 } from 'file://C:/Users/Public/javidev/citt-pass-crm-front-end/node_modules/ofetch/dist/node.mjs';
import destr from 'file://C:/Users/Public/javidev/citt-pass-crm-front-end/node_modules/destr/dist/index.mjs';
import { createCall, createFetch } from 'file://C:/Users/Public/javidev/citt-pass-crm-front-end/node_modules/unenv/runtime/fetch/index.mjs';
import { createHooks } from 'file://C:/Users/Public/javidev/citt-pass-crm-front-end/node_modules/hookable/dist/index.mjs';
import { klona } from 'file://C:/Users/Public/javidev/citt-pass-crm-front-end/node_modules/klona/dist/index.mjs';
import { snakeCase } from 'file://C:/Users/Public/javidev/citt-pass-crm-front-end/node_modules/scule/dist/index.mjs';
import defu, { defuFn } from 'file://C:/Users/Public/javidev/citt-pass-crm-front-end/node_modules/defu/dist/defu.mjs';
import { hash } from 'file://C:/Users/Public/javidev/citt-pass-crm-front-end/node_modules/ohash/dist/index.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, decodePath, withLeadingSlash, withoutTrailingSlash } from 'file://C:/Users/Public/javidev/citt-pass-crm-front-end/node_modules/ufo/dist/index.mjs';
import { createStorage, prefixStorage } from 'file://C:/Users/Public/javidev/citt-pass-crm-front-end/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://C:/Users/Public/javidev/citt-pass-crm-front-end/node_modules/unstorage/drivers/fs.mjs';
import unstorage_47drivers_47memory from 'file://C:/Users/Public/javidev/citt-pass-crm-front-end/node_modules/unstorage/drivers/memory.mjs';
import unstorage_47drivers_47lru_45cache from 'file://C:/Users/Public/javidev/citt-pass-crm-front-end/node_modules/unstorage/drivers/lru-cache.mjs';
import unstorage_47drivers_47fs_45lite from 'file://C:/Users/Public/javidev/citt-pass-crm-front-end/node_modules/unstorage/drivers/fs-lite.mjs';
import { toRouteMatcher, createRouter } from 'file://C:/Users/Public/javidev/citt-pass-crm-front-end/node_modules/radix3/dist/index.mjs';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'file://C:/Users/Public/javidev/citt-pass-crm-front-end/node_modules/pathe/dist/index.mjs';

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {}
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  {
    return _sharedRuntimeConfig;
  }
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const serverAssets = [{"baseName":"server","dir":"C:/Users/Public/javidev/citt-pass-crm-front-end/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('internal:nuxt:prerender', unstorage_47drivers_47memory({"driver":"memory"}));
storage.mount('internal:nuxt:prerender:island', unstorage_47drivers_47lru_45cache({"driver":"lruCache","max":1000}));
storage.mount('internal:nuxt:prerender:payload', unstorage_47drivers_47lru_45cache({"driver":"lruCache","max":1000}));
storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"C:\\Users\\Public\\javidev\\citt-pass-crm-front-end\\.data\\kv"}));
storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:\\Users\\Public\\javidev\\citt-pass-crm-front-end","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:\\Users\\Public\\javidev\\citt-pass-crm-front-end\\server","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:\\Users\\Public\\javidev\\citt-pass-crm-front-end\\.nuxt","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:\\Users\\Public\\javidev\\citt-pass-crm-front-end\\.nuxt\\cache","ignore":["**/node_modules/**","**/.git/**"]}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          const promise = useStorage().setItem(cacheKey, entry).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event && event.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      const _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        variableHeaders[header] = incomingEvent.node.req.headers[header];
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        event.node.res.setHeader(name, value);
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const isErrorPage = event.path.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('./_/error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"7ae7-StayyWT694IZg/uWj/qzgKKz3so\"",
    "mtime": "2024-10-08T22:53:45.901Z",
    "size": 31463,
    "path": "../../.output/public/favicon.ico"
  },
  "/_nuxt/Alerts.6544751c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ed6-Duu9ymtDEAGZyBkjQNt2tpMaqbM\"",
    "mtime": "2024-10-09T00:40:27.103Z",
    "size": 3798,
    "path": "../../.output/public/_nuxt/Alerts.6544751c.js"
  },
  "/_nuxt/auth.7486ee3a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a4-Ax5zfVkRom4FMILw3h1kFZAm0d8\"",
    "mtime": "2024-10-09T00:40:27.103Z",
    "size": 164,
    "path": "../../.output/public/_nuxt/auth.7486ee3a.js"
  },
  "/_nuxt/axios.4d564c32.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7452-IU+7kNJTc+IPLh9prec5UJpGCnI\"",
    "mtime": "2024-10-09T00:40:27.114Z",
    "size": 29778,
    "path": "../../.output/public/_nuxt/axios.4d564c32.js"
  },
  "/_nuxt/blank.6492cf78.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e7-oO7Upzleb8CYXdT+6R4Czt+9woo\"",
    "mtime": "2024-10-09T00:40:27.103Z",
    "size": 231,
    "path": "../../.output/public/_nuxt/blank.6492cf78.js"
  },
  "/_nuxt/Buttons.6cb86b16.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10c4-HTM4GqMEBa+xuBRFuql6VVUocek\"",
    "mtime": "2024-10-09T00:40:27.104Z",
    "size": 4292,
    "path": "../../.output/public/_nuxt/Buttons.6cb86b16.js"
  },
  "/_nuxt/Cards.e8f778c4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1cae-dWna991RJtKjicJx/TWk44vZwJc\"",
    "mtime": "2024-10-09T00:40:27.114Z",
    "size": 7342,
    "path": "../../.output/public/_nuxt/Cards.e8f778c4.js"
  },
  "/_nuxt/citt_logo.3e785fd1.png": {
    "type": "image/png",
    "etag": "\"19f21-j8UiI2u2RsZQ5vydBjBxifdI4e4\"",
    "mtime": "2024-10-09T00:40:27.103Z",
    "size": 106273,
    "path": "../../.output/public/_nuxt/citt_logo.3e785fd1.png"
  },
  "/_nuxt/colaborators.1633a82a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"28-+hLNhjrkifDOiU6DGAoqISqykqU\"",
    "mtime": "2024-10-09T00:40:27.103Z",
    "size": 40,
    "path": "../../.output/public/_nuxt/colaborators.1633a82a.css"
  },
  "/_nuxt/colaborators.f7164049.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"832-V3+1xq/Acme/QajTUkBZUIoqvcU\"",
    "mtime": "2024-10-09T00:40:27.114Z",
    "size": 2098,
    "path": "../../.output/public/_nuxt/colaborators.f7164049.js"
  },
  "/_nuxt/Curousel.ac715b25.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"400-mLzkj/mfy1YOkPHdPEZJBP/K8i8\"",
    "mtime": "2024-10-09T00:40:27.103Z",
    "size": 1024,
    "path": "../../.output/public/_nuxt/Curousel.ac715b25.js"
  },
  "/_nuxt/default.1a21bd05.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"37be-/nG2o7SHM17U+3a0xD+hwHT8hE4\"",
    "mtime": "2024-10-09T00:40:27.114Z",
    "size": 14270,
    "path": "../../.output/public/_nuxt/default.1a21bd05.js"
  },
  "/_nuxt/entry.29e5dea1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a9c33-PLW3q2M2WiRF32ed1gAfe7AE1cg\"",
    "mtime": "2024-10-09T00:40:27.104Z",
    "size": 695347,
    "path": "../../.output/public/_nuxt/entry.29e5dea1.css"
  },
  "/_nuxt/entry.8a599742.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c10fb-hkCytU7FsdP/CSBrD4ehROC9VZg\"",
    "mtime": "2024-10-09T00:40:27.116Z",
    "size": 2887931,
    "path": "../../.output/public/_nuxt/entry.8a599742.js"
  },
  "/_nuxt/gestoringreso.c53eb8bc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1053-0XJEkhKYek/H6z+Zb1pGkhJx+OQ\"",
    "mtime": "2024-10-09T00:40:27.103Z",
    "size": 4179,
    "path": "../../.output/public/_nuxt/gestoringreso.c53eb8bc.js"
  },
  "/_nuxt/gestorinventario.fd067898.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2aa2-sEiQ+kxVllT9DNrc+vAxs2lFpRI\"",
    "mtime": "2024-10-09T00:40:27.114Z",
    "size": 10914,
    "path": "../../.output/public/_nuxt/gestorinventario.fd067898.js"
  },
  "/_nuxt/gestorproyecto.61d70df0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"28a8-uI34qHwuk29FuMNgYgmJv+LClI4\"",
    "mtime": "2024-10-09T00:40:27.114Z",
    "size": 10408,
    "path": "../../.output/public/_nuxt/gestorproyecto.61d70df0.js"
  },
  "/_nuxt/gestorrack.08b9a22a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1fd5-z0lmSybh8meUP+bsM7GA/muMGx0\"",
    "mtime": "2024-10-09T00:40:27.114Z",
    "size": 8149,
    "path": "../../.output/public/_nuxt/gestorrack.08b9a22a.js"
  },
  "/_nuxt/index.5aff9f83.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"104-tQQ4IR6bUArjnw5jX1hbPMdiatw\"",
    "mtime": "2024-10-09T00:40:27.103Z",
    "size": 260,
    "path": "../../.output/public/_nuxt/index.5aff9f83.css"
  },
  "/_nuxt/index.6051b940.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2eba-WjSpDG1r4ZznK7eK5IoD6UOLR9c\"",
    "mtime": "2024-10-09T00:40:27.114Z",
    "size": 11962,
    "path": "../../.output/public/_nuxt/index.6051b940.js"
  },
  "/_nuxt/IngresoSemanal.f9430da7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3b3a-b15hAbdb+M2oDWw7IFEuSdA8qDc\"",
    "mtime": "2024-10-09T00:40:27.114Z",
    "size": 15162,
    "path": "../../.output/public/_nuxt/IngresoSemanal.f9430da7.js"
  },
  "/_nuxt/Login.50fe901f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f2e-RbqkAHaYoJza66LaV+qALtKLjPA\"",
    "mtime": "2024-10-09T00:40:27.103Z",
    "size": 3886,
    "path": "../../.output/public/_nuxt/Login.50fe901f.js"
  },
  "/_nuxt/materialdesignicons-webfont.5be9e9d7.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"12aae0-GLTvA08q7BwIed5xQcHFnoNNCXU\"",
    "mtime": "2024-10-09T00:40:27.104Z",
    "size": 1223392,
    "path": "../../.output/public/_nuxt/materialdesignicons-webfont.5be9e9d7.eot"
  },
  "/_nuxt/materialdesignicons-webfont.633d596f.woff2": {
    "type": "font/woff2",
    "etag": "\"5d2f8-wtunkFhOlGmtjUyXdeCH4ix7aaA\"",
    "mtime": "2024-10-09T00:40:27.102Z",
    "size": 381688,
    "path": "../../.output/public/_nuxt/materialdesignicons-webfont.633d596f.woff2"
  },
  "/_nuxt/materialdesignicons-webfont.7f3afe9b.woff": {
    "type": "font/woff",
    "etag": "\"872e8-V9C6Y3wg5NY7jDb4bLSGK4uK3ak\"",
    "mtime": "2024-10-09T00:40:27.104Z",
    "size": 553704,
    "path": "../../.output/public/_nuxt/materialdesignicons-webfont.7f3afe9b.woff"
  },
  "/_nuxt/materialdesignicons-webfont.948fce52.ttf": {
    "type": "font/ttf",
    "etag": "\"12aa04-aOk3PGfYI4P3UxgCz4Ny3Zs6JXo\"",
    "mtime": "2024-10-09T00:40:27.104Z",
    "size": 1223172,
    "path": "../../.output/public/_nuxt/materialdesignicons-webfont.948fce52.ttf"
  },
  "/_nuxt/productos.c723c2db.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"230a-bzShcflej0oTytYPqwCgmRiqAeg\"",
    "mtime": "2024-10-09T00:40:27.114Z",
    "size": 8970,
    "path": "../../.output/public/_nuxt/productos.c723c2db.js"
  },
  "/_nuxt/projectApi.aebb07c9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2a4-RB01J7JCaqLGyuy/EKBQShDxQ+w\"",
    "mtime": "2024-10-09T00:40:27.103Z",
    "size": 676,
    "path": "../../.output/public/_nuxt/projectApi.aebb07c9.js"
  },
  "/_nuxt/rackApi.ba887549.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"28b-e/avOSJHaQhPz1pSlf6CGc6pIAM\"",
    "mtime": "2024-10-09T00:40:27.103Z",
    "size": 651,
    "path": "../../.output/public/_nuxt/rackApi.ba887549.js"
  },
  "/_nuxt/Tabels.fa677744.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"743-ZJuc7ENMzzuY20yeX7W9qz1VvNM\"",
    "mtime": "2024-10-09T00:40:27.099Z",
    "size": 1859,
    "path": "../../.output/public/_nuxt/Tabels.fa677744.js"
  },
  "/_nuxt/UiChildCard.vue.ce6d42a3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"201-ExGNRhjYFlm/1nLNimup/Fi9XQI\"",
    "mtime": "2024-10-09T00:40:27.103Z",
    "size": 513,
    "path": "../../.output/public/_nuxt/UiChildCard.vue.ce6d42a3.js"
  },
  "/_nuxt/userApi.9f2b6974.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24c-XfB4ZJwdAeFxmPl8K8s0SFzoe0M\"",
    "mtime": "2024-10-09T00:40:27.103Z",
    "size": 588,
    "path": "../../.output/public/_nuxt/userApi.9f2b6974.js"
  },
  "/_nuxt/wishlist.149b902e.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14f6-ycX5qzxTWzQZTOy5lyMCQS1SfzI\"",
    "mtime": "2024-10-09T00:40:27.114Z",
    "size": 5366,
    "path": "../../.output/public/_nuxt/wishlist.149b902e.js"
  },
  "/_nuxt/wishlistApi.6db2551d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"300-pLc8gu4zaFG8t44WuvlnkA7RxD0\"",
    "mtime": "2024-10-09T00:40:27.103Z",
    "size": 768,
    "path": "../../.output/public/_nuxt/wishlistApi.6db2551d.js"
  },
  "/images/big/blog-bg.jpg": {
    "type": "image/jpeg",
    "etag": "\"be25-crXLkJEAB4/QIjRyyWaESpGegv4\"",
    "mtime": "2024-10-08T22:53:45.908Z",
    "size": 48677,
    "path": "../../.output/public/images/big/blog-bg.jpg"
  },
  "/images/big/img1.jpg": {
    "type": "image/jpeg",
    "etag": "\"84a3-xYCvTD7I5r4h2mWTdKUtD6bG9PQ\"",
    "mtime": "2024-10-08T22:53:45.908Z",
    "size": 33955,
    "path": "../../.output/public/images/big/img1.jpg"
  },
  "/images/big/img2.jpg": {
    "type": "image/jpeg",
    "etag": "\"ddc4-r6QMl0x1YexOObSO43bRAT/klKk\"",
    "mtime": "2024-10-08T22:53:45.909Z",
    "size": 56772,
    "path": "../../.output/public/images/big/img2.jpg"
  },
  "/images/big/img3.jpg": {
    "type": "image/jpeg",
    "etag": "\"e0a3-uhGWI2EzkpkHBG8cXwHbgzqaK9k\"",
    "mtime": "2024-10-08T22:53:45.909Z",
    "size": 57507,
    "path": "../../.output/public/images/big/img3.jpg"
  },
  "/images/big/img4.jpg": {
    "type": "image/jpeg",
    "etag": "\"ea93-++duq1WrPXdJTxAIY0GUJskCQXg\"",
    "mtime": "2024-10-08T22:53:45.910Z",
    "size": 60051,
    "path": "../../.output/public/images/big/img4.jpg"
  },
  "/images/backgrounds/bg-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"abe5-Rz+erx+f/xOpZ9gWZ5FWOveQzgw\"",
    "mtime": "2024-10-08T22:53:45.902Z",
    "size": 44005,
    "path": "../../.output/public/images/backgrounds/bg-1.jpg"
  },
  "/images/backgrounds/bg-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"272fd-LRNQ65Vf4YzhB9MiOcpaQbuKIls\"",
    "mtime": "2024-10-08T22:53:45.903Z",
    "size": 160509,
    "path": "../../.output/public/images/backgrounds/bg-2.jpg"
  },
  "/images/backgrounds/errorimg.svg": {
    "type": "image/svg+xml",
    "etag": "\"9730-oMOKsu6u7BluGG960TI8P751jnU\"",
    "mtime": "2024-10-08T22:53:45.903Z",
    "size": 38704,
    "path": "../../.output/public/images/backgrounds/errorimg.svg"
  },
  "/images/backgrounds/login-register.jpg": {
    "type": "image/jpeg",
    "etag": "\"86061-YLOaGiXtD+JByHU5h/vDSKQtLOs\"",
    "mtime": "2024-10-08T22:53:45.906Z",
    "size": 548961,
    "path": "../../.output/public/images/backgrounds/login-register.jpg"
  },
  "/images/backgrounds/u5.jpg": {
    "type": "image/jpeg",
    "etag": "\"d3c8-5iEhMvf2glSNKoKG/2QlcWPRCIY\"",
    "mtime": "2024-10-08T22:53:45.907Z",
    "size": 54216,
    "path": "../../.output/public/images/backgrounds/u5.jpg"
  },
  "/images/logos/citt_logo.png": {
    "type": "image/png",
    "etag": "\"19f21-j8UiI2u2RsZQ5vydBjBxifdI4e4\"",
    "mtime": "2024-10-08T22:53:45.911Z",
    "size": 106273,
    "path": "../../.output/public/images/logos/citt_logo.png"
  },
  "/images/logos/dark-logo-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"36c-SV1PaCxKxziiTDr3vFysEhoFlH0\"",
    "mtime": "2024-10-08T22:53:45.911Z",
    "size": 876,
    "path": "../../.output/public/images/logos/dark-logo-icon.svg"
  },
  "/images/logos/dark-logo-text.svg": {
    "type": "image/svg+xml",
    "etag": "\"108b-hub2caGRhBjKtjn/80czSMlKS+I\"",
    "mtime": "2024-10-08T22:53:45.912Z",
    "size": 4235,
    "path": "../../.output/public/images/logos/dark-logo-text.svg"
  },
  "/images/products/empty-shopping-cart.svg": {
    "type": "image/svg+xml",
    "etag": "\"431c-L2YP9QSlacz/HDgpbwgeSAe3QrM\"",
    "mtime": "2024-10-08T22:53:45.912Z",
    "size": 17180,
    "path": "../../.output/public/images/products/empty-shopping-cart.svg"
  },
  "/images/products/payment.svg": {
    "type": "image/svg+xml",
    "etag": "\"6018-z14nkBT/n4fShml09dvn0nXJMEQ\"",
    "mtime": "2024-10-08T22:53:45.913Z",
    "size": 24600,
    "path": "../../.output/public/images/products/payment.svg"
  },
  "/images/svgs/sidebar-buynow-bg.svg": {
    "type": "image/svg+xml",
    "etag": "\"6907-WEobvLeSUI1MCWppxaNjEJqRJOY\"",
    "mtime": "2024-10-08T22:53:45.925Z",
    "size": 26887,
    "path": "../../.output/public/images/svgs/sidebar-buynow-bg.svg"
  },
  "/images/profile/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1b35-dwWyYdJSMK6TyL+TquzoPikw/34\"",
    "mtime": "2024-10-08T22:53:45.913Z",
    "size": 6965,
    "path": "../../.output/public/images/profile/1.jpg"
  },
  "/images/profile/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1dd2-XC2W8SH8aLo+EOaltDJFL70sW00\"",
    "mtime": "2024-10-08T22:53:45.913Z",
    "size": 7634,
    "path": "../../.output/public/images/profile/2.jpg"
  },
  "/images/profile/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e5c-EvUpq09To+kt+Hzr0iFMoT0ZInQ\"",
    "mtime": "2024-10-08T22:53:45.914Z",
    "size": 7772,
    "path": "../../.output/public/images/profile/3.jpg"
  },
  "/images/profile/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"206e-oQ5Wpfvzo8G/AvKhN1LlaCHxa9w\"",
    "mtime": "2024-10-08T22:53:45.914Z",
    "size": 8302,
    "path": "../../.output/public/images/profile/4.jpg"
  },
  "/images/profile/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"21fb-f55iSKzx9RoLxlasacAgsJhkhoQ\"",
    "mtime": "2024-10-08T22:53:45.914Z",
    "size": 8699,
    "path": "../../.output/public/images/profile/5.jpg"
  },
  "/images/profile/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"193f-HC11UAoAzDkkcwk8qiFpBbzQxsw\"",
    "mtime": "2024-10-08T22:53:45.915Z",
    "size": 6463,
    "path": "../../.output/public/images/profile/6.jpg"
  },
  "/images/profile/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"1fff-D4m3IfAcUIwUaH2l1ioZc3PDEL4\"",
    "mtime": "2024-10-08T22:53:45.915Z",
    "size": 8191,
    "path": "../../.output/public/images/profile/7.jpg"
  },
  "/images/profile/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"1c5c-ZZRd5ly6CN+hEyJX8qkjnxb3a0k\"",
    "mtime": "2024-10-08T22:53:45.916Z",
    "size": 7260,
    "path": "../../.output/public/images/profile/8.jpg"
  },
  "/images/profile/businessmen.png": {
    "type": "image/png",
    "etag": "\"255e5-hSnWf/qkRlAzMeUAnYGfxI/cvgk\"",
    "mtime": "2024-10-08T22:53:45.917Z",
    "size": 153061,
    "path": "../../.output/public/images/profile/businessmen.png"
  },
  "/images/profile/user-10.jpg": {
    "type": "image/jpeg",
    "etag": "\"699e-MjTsVQSxXE5+mXb1kENK4ltYYGs\"",
    "mtime": "2024-10-08T22:53:45.917Z",
    "size": 27038,
    "path": "../../.output/public/images/profile/user-10.jpg"
  },
  "/images/profile/user-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"734d-37kKCswYl8UZuc9CkeJtwZHN7dI\"",
    "mtime": "2024-10-08T22:53:45.918Z",
    "size": 29517,
    "path": "../../.output/public/images/profile/user-2.jpg"
  },
  "/images/profile/user-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"6c55-6fE8ENSRjHNLoKbqwetlAa3Bkrk\"",
    "mtime": "2024-10-08T22:53:45.918Z",
    "size": 27733,
    "path": "../../.output/public/images/profile/user-3.jpg"
  },
  "/images/profile/user-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"5f13-Rmeo9v4iOkBFz4lbIjDv8EBAeWY\"",
    "mtime": "2024-10-08T22:53:45.918Z",
    "size": 24339,
    "path": "../../.output/public/images/profile/user-4.jpg"
  },
  "/images/profile/user-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"65fc-oNjhnlAzLk1aOjmRCkp9tsUO2r4\"",
    "mtime": "2024-10-08T22:53:45.919Z",
    "size": 26108,
    "path": "../../.output/public/images/profile/user-5.jpg"
  },
  "/images/profile/user-6.jpg": {
    "type": "image/jpeg",
    "etag": "\"468e-UZrrYuoqFgjyQNJ7HppijN0iA0g\"",
    "mtime": "2024-10-08T22:53:45.919Z",
    "size": 18062,
    "path": "../../.output/public/images/profile/user-6.jpg"
  },
  "/images/profile/user-7.jpg": {
    "type": "image/jpeg",
    "etag": "\"6c8a-Uw0cQD8Lp97nE/cNVStazA4F724\"",
    "mtime": "2024-10-08T22:53:45.920Z",
    "size": 27786,
    "path": "../../.output/public/images/profile/user-7.jpg"
  },
  "/images/profile/user-8.jpg": {
    "type": "image/jpeg",
    "etag": "\"6da9-Kk8g54V6LXZTNgxmbGKAYfvbZIA\"",
    "mtime": "2024-10-08T22:53:45.920Z",
    "size": 28073,
    "path": "../../.output/public/images/profile/user-8.jpg"
  },
  "/images/profile/user-9.jpg": {
    "type": "image/jpeg",
    "etag": "\"4f85-zdqiuhqinYAZQ3puV/MXc4HstLM\"",
    "mtime": "2024-10-08T22:53:45.920Z",
    "size": 20357,
    "path": "../../.output/public/images/profile/user-9.jpg"
  },
  "/images/profile/user2.jpg": {
    "type": "image/jpeg",
    "etag": "\"877ee-x7HwBvrkOW5vt4Mk5y3u8fDC8hk\"",
    "mtime": "2024-10-08T22:53:45.924Z",
    "size": 554990,
    "path": "../../.output/public/images/profile/user2.jpg"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    setResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_fn4x0h = () => import('./_/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/**', handler: _lazy_fn4x0h, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((_err) => {
      console.error("Error while capturing another error", _err);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  for (const plugin of plugins) {
    try {
      plugin(app);
    } catch (err) {
      captureError(err, { tags: ["plugin"] });
      throw err;
    }
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const localFetch = nitroApp.localFetch;
const closePrerenderer = () => nitroApp.hooks.callHook("close");
trapUnhandledNodeErrors();

export { useRuntimeConfig as a, useStorage as b, closePrerenderer as c, getRouteRules as g, localFetch as l, useNitroApp as u };
