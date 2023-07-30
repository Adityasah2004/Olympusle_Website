// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../../AppData/Roaming/nvm/v18.15.0/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../AppData/Roaming/nvm/v18.15.0/node_modules/parcel-bundler/src/builtins/bundle-loader.js":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;
function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }
  var id = bundles[bundles.length - 1];
  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }
    throw err;
  }
}
function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}
var bundleLoaders = {};
function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}
module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};
function loadBundle(bundle) {
  var id;
  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }
  if (bundles[bundle]) {
    return bundles[bundle];
  }
  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];
  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }
      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}
function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}
LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};
LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"../../../../AppData/Roaming/nvm/v18.15.0/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/@supabase/functions-js/dist/module/helper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveFetch = void 0;
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const resolveFetch = customFetch => {
  let _fetch;
  if (customFetch) {
    _fetch = customFetch;
  } else if (typeof fetch === 'undefined') {
    _fetch = (...args) => __awaiter(void 0, void 0, void 0, function* () {
      return yield (yield require("_bundle_loader")(require.resolve('cross-fetch'))).fetch(...args);
    });
  } else {
    _fetch = fetch;
  }
  return (...args) => _fetch(...args);
};
exports.resolveFetch = resolveFetch;
},{"_bundle_loader":"../../../../AppData/Roaming/nvm/v18.15.0/node_modules/parcel-bundler/src/builtins/bundle-loader.js","cross-fetch":[["browser-ponyfill.74474147.js","node_modules/cross-fetch/dist/browser-ponyfill.js"],"browser-ponyfill.74474147.js.map","node_modules/cross-fetch/dist/browser-ponyfill.js"]}],"node_modules/@supabase/functions-js/dist/module/types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionsRelayError = exports.FunctionsHttpError = exports.FunctionsFetchError = exports.FunctionsError = void 0;
class FunctionsError extends Error {
  constructor(message, name = 'FunctionsError', context) {
    super(message);
    this.name = name;
    this.context = context;
  }
}
exports.FunctionsError = FunctionsError;
class FunctionsFetchError extends FunctionsError {
  constructor(context) {
    super('Failed to send a request to the Edge Function', 'FunctionsFetchError', context);
  }
}
exports.FunctionsFetchError = FunctionsFetchError;
class FunctionsRelayError extends FunctionsError {
  constructor(context) {
    super('Relay Error invoking the Edge Function', 'FunctionsRelayError', context);
  }
}
exports.FunctionsRelayError = FunctionsRelayError;
class FunctionsHttpError extends FunctionsError {
  constructor(context) {
    super('Edge Function returned a non-2xx status code', 'FunctionsHttpError', context);
  }
}
exports.FunctionsHttpError = FunctionsHttpError;
},{}],"node_modules/@supabase/functions-js/dist/module/FunctionsClient.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionsClient = void 0;
var _helper = require("./helper");
var _types = require("./types");
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class FunctionsClient {
  constructor(url, {
    headers = {},
    customFetch
  } = {}) {
    this.url = url;
    this.headers = headers;
    this.fetch = (0, _helper.resolveFetch)(customFetch);
  }
  /**
   * Updates the authorization header
   * @param token - the new jwt token sent in the authorisation header
   */
  setAuth(token) {
    this.headers.Authorization = `Bearer ${token}`;
  }
  /**
   * Invokes a function
   * @param functionName - The name of the Function to invoke.
   * @param options - Options for invoking the Function.
   */
  invoke(functionName, options = {}) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const {
          headers,
          method,
          body: functionArgs
        } = options;
        let _headers = {};
        let body;
        if (functionArgs && (headers && !Object.prototype.hasOwnProperty.call(headers, 'Content-Type') || !headers)) {
          if (typeof Blob !== 'undefined' && functionArgs instanceof Blob || functionArgs instanceof ArrayBuffer) {
            // will work for File as File inherits Blob
            // also works for ArrayBuffer as it is the same underlying structure as a Blob
            _headers['Content-Type'] = 'application/octet-stream';
            body = functionArgs;
          } else if (typeof functionArgs === 'string') {
            // plain string
            _headers['Content-Type'] = 'text/plain';
            body = functionArgs;
          } else if (typeof FormData !== 'undefined' && functionArgs instanceof FormData) {
            // don't set content-type headers
            // Request will automatically add the right boundary value
            body = functionArgs;
          } else {
            // default, assume this is JSON
            _headers['Content-Type'] = 'application/json';
            body = JSON.stringify(functionArgs);
          }
        }
        const response = yield this.fetch(`${this.url}/${functionName}`, {
          method: method || 'POST',
          // headers priority is (high to low):
          // 1. invoke-level headers
          // 2. client-level headers
          // 3. default Content-Type header
          headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
          body
        }).catch(fetchError => {
          throw new _types.FunctionsFetchError(fetchError);
        });
        const isRelayError = response.headers.get('x-relay-error');
        if (isRelayError && isRelayError === 'true') {
          throw new _types.FunctionsRelayError(response);
        }
        if (!response.ok) {
          throw new _types.FunctionsHttpError(response);
        }
        let responseType = ((_a = response.headers.get('Content-Type')) !== null && _a !== void 0 ? _a : 'text/plain').split(';')[0].trim();
        let data;
        if (responseType === 'application/json') {
          data = yield response.json();
        } else if (responseType === 'application/octet-stream') {
          data = yield response.blob();
        } else if (responseType === 'multipart/form-data') {
          data = yield response.formData();
        } else {
          // default to text
          data = yield response.text();
        }
        return {
          data,
          error: null
        };
      } catch (error) {
        return {
          data: null,
          error
        };
      }
    });
  }
}
exports.FunctionsClient = FunctionsClient;
},{"./helper":"node_modules/@supabase/functions-js/dist/module/helper.js","./types":"node_modules/@supabase/functions-js/dist/module/types.js"}],"node_modules/@supabase/functions-js/dist/module/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FunctionsClient", {
  enumerable: true,
  get: function () {
    return _FunctionsClient.FunctionsClient;
  }
});
Object.defineProperty(exports, "FunctionsError", {
  enumerable: true,
  get: function () {
    return _types.FunctionsError;
  }
});
Object.defineProperty(exports, "FunctionsFetchError", {
  enumerable: true,
  get: function () {
    return _types.FunctionsFetchError;
  }
});
Object.defineProperty(exports, "FunctionsHttpError", {
  enumerable: true,
  get: function () {
    return _types.FunctionsHttpError;
  }
});
Object.defineProperty(exports, "FunctionsRelayError", {
  enumerable: true,
  get: function () {
    return _types.FunctionsRelayError;
  }
});
var _FunctionsClient = require("./FunctionsClient");
var _types = require("./types");
},{"./FunctionsClient":"node_modules/@supabase/functions-js/dist/module/FunctionsClient.js","./types":"node_modules/@supabase/functions-js/dist/module/types.js"}],"node_modules/@supabase/postgrest-js/dist/module/PostgrestBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _crossFetch = _interopRequireDefault(require("cross-fetch"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class PostgrestBuilder {
  constructor(builder) {
    this.shouldThrowOnError = false;
    this.method = builder.method;
    this.url = builder.url;
    this.headers = builder.headers;
    this.schema = builder.schema;
    this.body = builder.body;
    this.shouldThrowOnError = builder.shouldThrowOnError;
    this.signal = builder.signal;
    this.isMaybeSingle = builder.isMaybeSingle;
    if (builder.fetch) {
      this.fetch = builder.fetch;
    } else if (typeof fetch === 'undefined') {
      this.fetch = _crossFetch.default;
    } else {
      this.fetch = fetch;
    }
  }
  /**
   * If there's an error with the query, throwOnError will reject the promise by
   * throwing the error instead of returning it as part of a successful response.
   *
   * {@link https://github.com/supabase/supabase-js/issues/92}
   */
  throwOnError() {
    this.shouldThrowOnError = true;
    return this;
  }
  then(onfulfilled, onrejected) {
    // https://postgrest.org/en/stable/api.html#switching-schemas
    if (this.schema === undefined) {
      // skip
    } else if (['GET', 'HEAD'].includes(this.method)) {
      this.headers['Accept-Profile'] = this.schema;
    } else {
      this.headers['Content-Profile'] = this.schema;
    }
    if (this.method !== 'GET' && this.method !== 'HEAD') {
      this.headers['Content-Type'] = 'application/json';
    }
    // NOTE: Invoke w/o `this` to avoid illegal invocation error.
    // https://github.com/supabase/postgrest-js/pull/247
    const _fetch = this.fetch;
    let res = _fetch(this.url.toString(), {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
      signal: this.signal
    }).then(async res => {
      var _a, _b, _c;
      let error = null;
      let data = null;
      let count = null;
      let status = res.status;
      let statusText = res.statusText;
      if (res.ok) {
        if (this.method !== 'HEAD') {
          const body = await res.text();
          if (body === '') {
            // Prefer: return=minimal
          } else if (this.headers['Accept'] === 'text/csv') {
            data = body;
          } else if (this.headers['Accept'] && this.headers['Accept'].includes('application/vnd.pgrst.plan+text')) {
            data = body;
          } else {
            data = JSON.parse(body);
          }
        }
        const countHeader = (_a = this.headers['Prefer']) === null || _a === void 0 ? void 0 : _a.match(/count=(exact|planned|estimated)/);
        const contentRange = (_b = res.headers.get('content-range')) === null || _b === void 0 ? void 0 : _b.split('/');
        if (countHeader && contentRange && contentRange.length > 1) {
          count = parseInt(contentRange[1]);
        }
        // Temporary partial fix for https://github.com/supabase/postgrest-js/issues/361
        // Issue persists e.g. for `.insert([...]).select().maybeSingle()`
        if (this.isMaybeSingle && this.method === 'GET' && Array.isArray(data)) {
          if (data.length > 1) {
            error = {
              // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
              code: 'PGRST116',
              details: `Results contain ${data.length} rows, application/vnd.pgrst.object+json requires 1 row`,
              hint: null,
              message: 'JSON object requested, multiple (or no) rows returned'
            };
            data = null;
            count = null;
            status = 406;
            statusText = 'Not Acceptable';
          } else if (data.length === 1) {
            data = data[0];
          } else {
            data = null;
          }
        }
      } else {
        const body = await res.text();
        try {
          error = JSON.parse(body);
          // Workaround for https://github.com/supabase/postgrest-js/issues/295
          if (Array.isArray(error) && res.status === 404) {
            data = [];
            error = null;
            status = 200;
            statusText = 'OK';
          }
        } catch (_d) {
          // Workaround for https://github.com/supabase/postgrest-js/issues/295
          if (res.status === 404 && body === '') {
            status = 204;
            statusText = 'No Content';
          } else {
            error = {
              message: body
            };
          }
        }
        if (error && this.isMaybeSingle && ((_c = error === null || error === void 0 ? void 0 : error.details) === null || _c === void 0 ? void 0 : _c.includes('Results contain 0 rows'))) {
          error = null;
          status = 200;
          statusText = 'OK';
        }
        if (error && this.shouldThrowOnError) {
          throw error;
        }
      }
      const postgrestResponse = {
        error,
        data,
        count,
        status,
        statusText
      };
      return postgrestResponse;
    });
    if (!this.shouldThrowOnError) {
      res = res.catch(fetchError => {
        var _a, _b, _c;
        return {
          error: {
            message: `${(_a = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _a !== void 0 ? _a : 'FetchError'}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`,
            details: `${(_b = fetchError === null || fetchError === void 0 ? void 0 : fetchError.stack) !== null && _b !== void 0 ? _b : ''}`,
            hint: '',
            code: `${(_c = fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) !== null && _c !== void 0 ? _c : ''}`
          },
          data: null,
          count: null,
          status: 0,
          statusText: ''
        };
      });
    }
    return res.then(onfulfilled, onrejected);
  }
}
exports.default = PostgrestBuilder;
},{"cross-fetch":"node_modules/cross-fetch/dist/browser-ponyfill.js"}],"node_modules/@supabase/postgrest-js/dist/module/PostgrestTransformBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _PostgrestBuilder = _interopRequireDefault(require("./PostgrestBuilder"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class PostgrestTransformBuilder extends _PostgrestBuilder.default {
  /**
   * Perform a SELECT on the query result.
   *
   * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
   * return modified rows. By calling this method, modified rows are returned in
   * `data`.
   *
   * @param columns - The columns to retrieve, separated by commas
   */
  select(columns) {
    // Remove whitespaces except when quoted
    let quoted = false;
    const cleanedColumns = (columns !== null && columns !== void 0 ? columns : '*').split('').map(c => {
      if (/\s/.test(c) && !quoted) {
        return '';
      }
      if (c === '"') {
        quoted = !quoted;
      }
      return c;
    }).join('');
    this.url.searchParams.set('select', cleanedColumns);
    if (this.headers['Prefer']) {
      this.headers['Prefer'] += ',';
    }
    this.headers['Prefer'] += 'return=representation';
    return this;
  }
  /**
   * Order the query result by `column`.
   *
   * You can call this method multiple times to order by multiple columns.
   *
   * You can order foreign tables, but it doesn't affect the ordering of the
   * current table.
   *
   * @param column - The column to order by
   * @param options - Named parameters
   * @param options.ascending - If `true`, the result will be in ascending order
   * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
   * `null`s appear last.
   * @param options.foreignTable - Set this to order a foreign table by foreign
   * columns
   */
  order(column, {
    ascending = true,
    nullsFirst,
    foreignTable
  } = {}) {
    const key = foreignTable ? `${foreignTable}.order` : 'order';
    const existingOrder = this.url.searchParams.get(key);
    this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ''}${column}.${ascending ? 'asc' : 'desc'}${nullsFirst === undefined ? '' : nullsFirst ? '.nullsfirst' : '.nullslast'}`);
    return this;
  }
  /**
   * Limit the query result by `count`.
   *
   * @param count - The maximum number of rows to return
   * @param options - Named parameters
   * @param options.foreignTable - Set this to limit rows of foreign tables
   * instead of the current table
   */
  limit(count, {
    foreignTable
  } = {}) {
    const key = typeof foreignTable === 'undefined' ? 'limit' : `${foreignTable}.limit`;
    this.url.searchParams.set(key, `${count}`);
    return this;
  }
  /**
   * Limit the query result by starting at an offset (`from`) and ending at the offset (`from + to`).
   * Only records within this range are returned.
   * This respects the query order and if there is no order clause the range could behave unexpectedly.
   * The `from` and `to` values are 0-based and inclusive: `range(1, 3)` will include the second, third
   * and fourth rows of the query.
   *
   * @param from - The starting index from which to limit the result
   * @param to - The last index to which to limit the result
   * @param options - Named parameters
   * @param options.foreignTable - Set this to limit rows of foreign tables
   * instead of the current table
   */
  range(from, to, {
    foreignTable
  } = {}) {
    const keyOffset = typeof foreignTable === 'undefined' ? 'offset' : `${foreignTable}.offset`;
    const keyLimit = typeof foreignTable === 'undefined' ? 'limit' : `${foreignTable}.limit`;
    this.url.searchParams.set(keyOffset, `${from}`);
    // Range is inclusive, so add 1
    this.url.searchParams.set(keyLimit, `${to - from + 1}`);
    return this;
  }
  /**
   * Set the AbortSignal for the fetch request.
   *
   * @param signal - The AbortSignal to use for the fetch request
   */
  abortSignal(signal) {
    this.signal = signal;
    return this;
  }
  /**
   * Return `data` as a single object instead of an array of objects.
   *
   * Query result must be one row (e.g. using `.limit(1)`), otherwise this
   * returns an error.
   */
  single() {
    this.headers['Accept'] = 'application/vnd.pgrst.object+json';
    return this;
  }
  /**
   * Return `data` as a single object instead of an array of objects.
   *
   * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
   * this returns an error.
   */
  maybeSingle() {
    // Temporary partial fix for https://github.com/supabase/postgrest-js/issues/361
    // Issue persists e.g. for `.insert([...]).select().maybeSingle()`
    if (this.method === 'GET') {
      this.headers['Accept'] = 'application/json';
    } else {
      this.headers['Accept'] = 'application/vnd.pgrst.object+json';
    }
    this.isMaybeSingle = true;
    return this;
  }
  /**
   * Return `data` as a string in CSV format.
   */
  csv() {
    this.headers['Accept'] = 'text/csv';
    return this;
  }
  /**
   * Return `data` as an object in [GeoJSON](https://geojson.org) format.
   */
  geojson() {
    this.headers['Accept'] = 'application/geo+json';
    return this;
  }
  /**
   * Return `data` as the EXPLAIN plan for the query.
   *
   * @param options - Named parameters
   *
   * @param options.analyze - If `true`, the query will be executed and the
   * actual run time will be returned
   *
   * @param options.verbose - If `true`, the query identifier will be returned
   * and `data` will include the output columns of the query
   *
   * @param options.settings - If `true`, include information on configuration
   * parameters that affect query planning
   *
   * @param options.buffers - If `true`, include information on buffer usage
   *
   * @param options.wal - If `true`, include information on WAL record generation
   *
   * @param options.format - The format of the output, can be `"text"` (default)
   * or `"json"`
   */
  explain({
    analyze = false,
    verbose = false,
    settings = false,
    buffers = false,
    wal = false,
    format = 'text'
  } = {}) {
    const options = [analyze ? 'analyze' : null, verbose ? 'verbose' : null, settings ? 'settings' : null, buffers ? 'buffers' : null, wal ? 'wal' : null].filter(Boolean).join('|');
    // An Accept header can carry multiple media types but postgrest-js always sends one
    const forMediatype = this.headers['Accept'];
    this.headers['Accept'] = `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options};`;
    if (format === 'json') return this;else return this;
  }
  /**
   * Rollback the query.
   *
   * `data` will still be returned, but the query is not committed.
   */
  rollback() {
    var _a;
    if (((_a = this.headers['Prefer']) !== null && _a !== void 0 ? _a : '').trim().length > 0) {
      this.headers['Prefer'] += ',tx=rollback';
    } else {
      this.headers['Prefer'] = 'tx=rollback';
    }
    return this;
  }
  /**
   * Override the type of the returned `data`.
   *
   * @typeParam NewResult - The new result type to override with
   */
  returns() {
    return this;
  }
}
exports.default = PostgrestTransformBuilder;
},{"./PostgrestBuilder":"node_modules/@supabase/postgrest-js/dist/module/PostgrestBuilder.js"}],"node_modules/@supabase/postgrest-js/dist/module/PostgrestFilterBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _PostgrestTransformBuilder = _interopRequireDefault(require("./PostgrestTransformBuilder"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class PostgrestFilterBuilder extends _PostgrestTransformBuilder.default {
  /**
   * Match only rows where `column` is equal to `value`.
   *
   * To check if the value of `column` is NULL, you should use `.is()` instead.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  eq(column, value) {
    this.url.searchParams.append(column, `eq.${value}`);
    return this;
  }
  /**
   * Match only rows where `column` is not equal to `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  neq(column, value) {
    this.url.searchParams.append(column, `neq.${value}`);
    return this;
  }
  /**
   * Match only rows where `column` is greater than `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  gt(column, value) {
    this.url.searchParams.append(column, `gt.${value}`);
    return this;
  }
  /**
   * Match only rows where `column` is greater than or equal to `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  gte(column, value) {
    this.url.searchParams.append(column, `gte.${value}`);
    return this;
  }
  /**
   * Match only rows where `column` is less than `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  lt(column, value) {
    this.url.searchParams.append(column, `lt.${value}`);
    return this;
  }
  /**
   * Match only rows where `column` is less than or equal to `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  lte(column, value) {
    this.url.searchParams.append(column, `lte.${value}`);
    return this;
  }
  /**
   * Match only rows where `column` matches `pattern` case-sensitively.
   *
   * @param column - The column to filter on
   * @param pattern - The pattern to match with
   */
  like(column, pattern) {
    this.url.searchParams.append(column, `like.${pattern}`);
    return this;
  }
  /**
   * Match only rows where `column` matches all of `patterns` case-sensitively.
   *
   * @param column - The column to filter on
   * @param patterns - The patterns to match with
   */
  likeAllOf(column, patterns) {
    this.url.searchParams.append(column, `like(all).{${patterns.join(',')}}`);
    return this;
  }
  /**
   * Match only rows where `column` matches any of `patterns` case-sensitively.
   *
   * @param column - The column to filter on
   * @param patterns - The patterns to match with
   */
  likeAnyOf(column, patterns) {
    this.url.searchParams.append(column, `like(any).{${patterns.join(',')}}`);
    return this;
  }
  /**
   * Match only rows where `column` matches `pattern` case-insensitively.
   *
   * @param column - The column to filter on
   * @param pattern - The pattern to match with
   */
  ilike(column, pattern) {
    this.url.searchParams.append(column, `ilike.${pattern}`);
    return this;
  }
  /**
   * Match only rows where `column` matches all of `patterns` case-insensitively.
   *
   * @param column - The column to filter on
   * @param patterns - The patterns to match with
   */
  ilikeAllOf(column, patterns) {
    this.url.searchParams.append(column, `ilike(all).{${patterns.join(',')}}`);
    return this;
  }
  /**
   * Match only rows where `column` matches any of `patterns` case-insensitively.
   *
   * @param column - The column to filter on
   * @param patterns - The patterns to match with
   */
  ilikeAnyOf(column, patterns) {
    this.url.searchParams.append(column, `ilike(any).{${patterns.join(',')}}`);
    return this;
  }
  /**
   * Match only rows where `column` IS `value`.
   *
   * For non-boolean columns, this is only relevant for checking if the value of
   * `column` is NULL by setting `value` to `null`.
   *
   * For boolean columns, you can also set `value` to `true` or `false` and it
   * will behave the same way as `.eq()`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  is(column, value) {
    this.url.searchParams.append(column, `is.${value}`);
    return this;
  }
  /**
   * Match only rows where `column` is included in the `values` array.
   *
   * @param column - The column to filter on
   * @param values - The values array to filter with
   */
  in(column, values) {
    const cleanedValues = values.map(s => {
      // handle postgrest reserved characters
      // https://postgrest.org/en/v7.0.0/api.html#reserved-characters
      if (typeof s === 'string' && new RegExp('[,()]').test(s)) return `"${s}"`;else return `${s}`;
    }).join(',');
    this.url.searchParams.append(column, `in.(${cleanedValues})`);
    return this;
  }
  /**
   * Only relevant for jsonb, array, and range columns. Match only rows where
   * `column` contains every element appearing in `value`.
   *
   * @param column - The jsonb, array, or range column to filter on
   * @param value - The jsonb, array, or range value to filter with
   */
  contains(column, value) {
    if (typeof value === 'string') {
      // range types can be inclusive '[', ']' or exclusive '(', ')' so just
      // keep it simple and accept a string
      this.url.searchParams.append(column, `cs.${value}`);
    } else if (Array.isArray(value)) {
      // array
      this.url.searchParams.append(column, `cs.{${value.join(',')}}`);
    } else {
      // json
      this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
    }
    return this;
  }
  /**
   * Only relevant for jsonb, array, and range columns. Match only rows where
   * every element appearing in `column` is contained by `value`.
   *
   * @param column - The jsonb, array, or range column to filter on
   * @param value - The jsonb, array, or range value to filter with
   */
  containedBy(column, value) {
    if (typeof value === 'string') {
      // range
      this.url.searchParams.append(column, `cd.${value}`);
    } else if (Array.isArray(value)) {
      // array
      this.url.searchParams.append(column, `cd.{${value.join(',')}}`);
    } else {
      // json
      this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
    }
    return this;
  }
  /**
   * Only relevant for range columns. Match only rows where every element in
   * `column` is greater than any element in `range`.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeGt(column, range) {
    this.url.searchParams.append(column, `sr.${range}`);
    return this;
  }
  /**
   * Only relevant for range columns. Match only rows where every element in
   * `column` is either contained in `range` or greater than any element in
   * `range`.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeGte(column, range) {
    this.url.searchParams.append(column, `nxl.${range}`);
    return this;
  }
  /**
   * Only relevant for range columns. Match only rows where every element in
   * `column` is less than any element in `range`.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeLt(column, range) {
    this.url.searchParams.append(column, `sl.${range}`);
    return this;
  }
  /**
   * Only relevant for range columns. Match only rows where every element in
   * `column` is either contained in `range` or less than any element in
   * `range`.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeLte(column, range) {
    this.url.searchParams.append(column, `nxr.${range}`);
    return this;
  }
  /**
   * Only relevant for range columns. Match only rows where `column` is
   * mutually exclusive to `range` and there can be no element between the two
   * ranges.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeAdjacent(column, range) {
    this.url.searchParams.append(column, `adj.${range}`);
    return this;
  }
  /**
   * Only relevant for array and range columns. Match only rows where
   * `column` and `value` have an element in common.
   *
   * @param column - The array or range column to filter on
   * @param value - The array or range value to filter with
   */
  overlaps(column, value) {
    if (typeof value === 'string') {
      // range
      this.url.searchParams.append(column, `ov.${value}`);
    } else {
      // array
      this.url.searchParams.append(column, `ov.{${value.join(',')}}`);
    }
    return this;
  }
  /**
   * Only relevant for text and tsvector columns. Match only rows where
   * `column` matches the query string in `query`.
   *
   * @param column - The text or tsvector column to filter on
   * @param query - The query text to match with
   * @param options - Named parameters
   * @param options.config - The text search configuration to use
   * @param options.type - Change how the `query` text is interpreted
   */
  textSearch(column, query, {
    config,
    type
  } = {}) {
    let typePart = '';
    if (type === 'plain') {
      typePart = 'pl';
    } else if (type === 'phrase') {
      typePart = 'ph';
    } else if (type === 'websearch') {
      typePart = 'w';
    }
    const configPart = config === undefined ? '' : `(${config})`;
    this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
    return this;
  }
  /**
   * Match only rows where each column in `query` keys is equal to its
   * associated value. Shorthand for multiple `.eq()`s.
   *
   * @param query - The object to filter with, with column names as keys mapped
   * to their filter values
   */
  match(query) {
    Object.entries(query).forEach(([column, value]) => {
      this.url.searchParams.append(column, `eq.${value}`);
    });
    return this;
  }
  /**
   * Match only rows which doesn't satisfy the filter.
   *
   * Unlike most filters, `opearator` and `value` are used as-is and need to
   * follow [PostgREST
   * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
   * to make sure they are properly sanitized.
   *
   * @param column - The column to filter on
   * @param operator - The operator to be negated to filter with, following
   * PostgREST syntax
   * @param value - The value to filter with, following PostgREST syntax
   */
  not(column, operator, value) {
    this.url.searchParams.append(column, `not.${operator}.${value}`);
    return this;
  }
  /**
   * Match only rows which satisfy at least one of the filters.
   *
   * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
   * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
   * to make sure it's properly sanitized.
   *
   * It's currently not possible to do an `.or()` filter across multiple tables.
   *
   * @param filters - The filters to use, following PostgREST syntax
   * @param foreignTable - Set this to filter on foreign tables instead of the
   * current table
   */
  or(filters, {
    foreignTable
  } = {}) {
    const key = foreignTable ? `${foreignTable}.or` : 'or';
    this.url.searchParams.append(key, `(${filters})`);
    return this;
  }
  /**
   * Match only rows which satisfy the filter. This is an escape hatch - you
   * should use the specific filter methods wherever possible.
   *
   * Unlike most filters, `opearator` and `value` are used as-is and need to
   * follow [PostgREST
   * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
   * to make sure they are properly sanitized.
   *
   * @param column - The column to filter on
   * @param operator - The operator to filter with, following PostgREST syntax
   * @param value - The value to filter with, following PostgREST syntax
   */
  filter(column, operator, value) {
    this.url.searchParams.append(column, `${operator}.${value}`);
    return this;
  }
}
exports.default = PostgrestFilterBuilder;
},{"./PostgrestTransformBuilder":"node_modules/@supabase/postgrest-js/dist/module/PostgrestTransformBuilder.js"}],"node_modules/@supabase/postgrest-js/dist/module/PostgrestQueryBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _PostgrestFilterBuilder = _interopRequireDefault(require("./PostgrestFilterBuilder"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class PostgrestQueryBuilder {
  constructor(url, {
    headers = {},
    schema,
    fetch
  }) {
    this.url = url;
    this.headers = headers;
    this.schema = schema;
    this.fetch = fetch;
  }
  /**
   * Perform a SELECT query on the table or view.
   *
   * @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
   *
   * @param options - Named parameters
   *
   * @param options.head - When set to `true`, `data` will not be returned.
   * Useful if you only need the count.
   *
   * @param options.count - Count algorithm to use to count rows in the table or view.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  select(columns, {
    head = false,
    count
  } = {}) {
    const method = head ? 'HEAD' : 'GET';
    // Remove whitespaces except when quoted
    let quoted = false;
    const cleanedColumns = (columns !== null && columns !== void 0 ? columns : '*').split('').map(c => {
      if (/\s/.test(c) && !quoted) {
        return '';
      }
      if (c === '"') {
        quoted = !quoted;
      }
      return c;
    }).join('');
    this.url.searchParams.set('select', cleanedColumns);
    if (count) {
      this.headers['Prefer'] = `count=${count}`;
    }
    return new _PostgrestFilterBuilder.default({
      method,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      fetch: this.fetch,
      allowEmpty: false
    });
  }
  /**
   * Perform an INSERT into the table or view.
   *
   * By default, inserted rows are not returned. To return it, chain the call
   * with `.select()`.
   *
   * @param values - The values to insert. Pass an object to insert a single row
   * or an array to insert multiple rows.
   *
   * @param options - Named parameters
   *
   * @param options.count - Count algorithm to use to count inserted rows.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   *
   * @param options.defaultToNull - Make missing fields default to `null`.
   * Otherwise, use the default value for the column.
   */
  insert(values, {
    count,
    defaultToNull = true
  } = {}) {
    const method = 'POST';
    const prefersHeaders = [];
    if (this.headers['Prefer']) {
      prefersHeaders.push(this.headers['Prefer']);
    }
    if (count) {
      prefersHeaders.push(`count=${count}`);
    }
    if (!defaultToNull) {
      prefersHeaders.push('missing=default');
    }
    this.headers['Prefer'] = prefersHeaders.join(',');
    if (Array.isArray(values)) {
      const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
      if (columns.length > 0) {
        const uniqueColumns = [...new Set(columns)].map(column => `"${column}"`);
        this.url.searchParams.set('columns', uniqueColumns.join(','));
      }
    }
    return new _PostgrestFilterBuilder.default({
      method,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      body: values,
      fetch: this.fetch,
      allowEmpty: false
    });
  }
  /**
   * Perform an UPSERT on the table or view. Depending on the column(s) passed
   * to `onConflict`, `.upsert()` allows you to perform the equivalent of
   * `.insert()` if a row with the corresponding `onConflict` columns doesn't
   * exist, or if it does exist, perform an alternative action depending on
   * `ignoreDuplicates`.
   *
   * By default, upserted rows are not returned. To return it, chain the call
   * with `.select()`.
   *
   * @param values - The values to upsert with. Pass an object to upsert a
   * single row or an array to upsert multiple rows.
   *
   * @param options - Named parameters
   *
   * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
   * duplicate rows are determined. Two rows are duplicates if all the
   * `onConflict` columns are equal.
   *
   * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
   * `false`, duplicate rows are merged with existing rows.
   *
   * @param options.count - Count algorithm to use to count upserted rows.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   *
   * @param options.defaultToNull - Make missing fields default to `null`.
   * Otherwise, use the default value for the column. This only applies when
   * inserting new rows, not when merging with existing rows under
   * `ignoreDuplicates: false`.
   */
  upsert(values, {
    onConflict,
    ignoreDuplicates = false,
    count,
    defaultToNull = true
  } = {}) {
    const method = 'POST';
    const prefersHeaders = [`resolution=${ignoreDuplicates ? 'ignore' : 'merge'}-duplicates`];
    if (onConflict !== undefined) this.url.searchParams.set('on_conflict', onConflict);
    if (this.headers['Prefer']) {
      prefersHeaders.push(this.headers['Prefer']);
    }
    if (count) {
      prefersHeaders.push(`count=${count}`);
    }
    if (!defaultToNull) {
      prefersHeaders.push('missing=default');
    }
    this.headers['Prefer'] = prefersHeaders.join(',');
    if (Array.isArray(values)) {
      const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
      if (columns.length > 0) {
        const uniqueColumns = [...new Set(columns)].map(column => `"${column}"`);
        this.url.searchParams.set('columns', uniqueColumns.join(','));
      }
    }
    return new _PostgrestFilterBuilder.default({
      method,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      body: values,
      fetch: this.fetch,
      allowEmpty: false
    });
  }
  /**
   * Perform an UPDATE on the table or view.
   *
   * By default, updated rows are not returned. To return it, chain the call
   * with `.select()` after filters.
   *
   * @param values - The values to update with
   *
   * @param options - Named parameters
   *
   * @param options.count - Count algorithm to use to count updated rows.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  update(values, {
    count
  } = {}) {
    const method = 'PATCH';
    const prefersHeaders = [];
    if (this.headers['Prefer']) {
      prefersHeaders.push(this.headers['Prefer']);
    }
    if (count) {
      prefersHeaders.push(`count=${count}`);
    }
    this.headers['Prefer'] = prefersHeaders.join(',');
    return new _PostgrestFilterBuilder.default({
      method,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      body: values,
      fetch: this.fetch,
      allowEmpty: false
    });
  }
  /**
   * Perform a DELETE on the table or view.
   *
   * By default, deleted rows are not returned. To return it, chain the call
   * with `.select()` after filters.
   *
   * @param options - Named parameters
   *
   * @param options.count - Count algorithm to use to count deleted rows.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  delete({
    count
  } = {}) {
    const method = 'DELETE';
    const prefersHeaders = [];
    if (count) {
      prefersHeaders.push(`count=${count}`);
    }
    if (this.headers['Prefer']) {
      prefersHeaders.unshift(this.headers['Prefer']);
    }
    this.headers['Prefer'] = prefersHeaders.join(',');
    return new _PostgrestFilterBuilder.default({
      method,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      fetch: this.fetch,
      allowEmpty: false
    });
  }
}
exports.default = PostgrestQueryBuilder;
},{"./PostgrestFilterBuilder":"node_modules/@supabase/postgrest-js/dist/module/PostgrestFilterBuilder.js"}],"node_modules/@supabase/postgrest-js/dist/module/version.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = '1.7.2';
exports.version = version;
},{}],"node_modules/@supabase/postgrest-js/dist/module/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_HEADERS = void 0;
var _version = require("./version");
const DEFAULT_HEADERS = {
  'X-Client-Info': `postgrest-js/${_version.version}`
};
exports.DEFAULT_HEADERS = DEFAULT_HEADERS;
},{"./version":"node_modules/@supabase/postgrest-js/dist/module/version.js"}],"node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _PostgrestQueryBuilder = _interopRequireDefault(require("./PostgrestQueryBuilder"));
var _PostgrestFilterBuilder = _interopRequireDefault(require("./PostgrestFilterBuilder"));
var _constants = require("./constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * PostgREST client.
 *
 * @typeParam Database - Types for the schema from the [type
 * generator](https://supabase.com/docs/reference/javascript/next/typescript-support)
 *
 * @typeParam SchemaName - Postgres schema to switch to. Must be a string
 * literal, the same one passed to the constructor. If the schema is not
 * `"public"`, this must be supplied manually.
 */
class PostgrestClient {
  // TODO: Add back shouldThrowOnError once we figure out the typings
  /**
   * Creates a PostgREST client.
   *
   * @param url - URL of the PostgREST endpoint
   * @param options - Named parameters
   * @param options.headers - Custom headers
   * @param options.schema - Postgres schema to switch to
   * @param options.fetch - Custom fetch
   */
  constructor(url, {
    headers = {},
    schema,
    fetch
  } = {}) {
    this.url = url;
    this.headers = Object.assign(Object.assign({}, _constants.DEFAULT_HEADERS), headers);
    this.schema = schema;
    this.fetch = fetch;
  }
  /**
   * Perform a query on a table or a view.
   *
   * @param relation - The table or view name to query
   */
  from(relation) {
    const url = new URL(`${this.url}/${relation}`);
    return new _PostgrestQueryBuilder.default(url, {
      headers: Object.assign({}, this.headers),
      schema: this.schema,
      fetch: this.fetch
    });
  }
  /**
   * Perform a function call.
   *
   * @param fn - The function name to call
   * @param args - The arguments to pass to the function call
   * @param options - Named parameters
   * @param options.head - When set to `true`, `data` will not be returned.
   * Useful if you only need the count.
   * @param options.count - Count algorithm to use to count rows returned by the
   * function. Only applicable for [set-returning
   * functions](https://www.postgresql.org/docs/current/functions-srf.html).
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  rpc(fn, args = {}, {
    head = false,
    count
  } = {}) {
    let method;
    const url = new URL(`${this.url}/rpc/${fn}`);
    let body;
    if (head) {
      method = 'HEAD';
      Object.entries(args).forEach(([name, value]) => {
        url.searchParams.append(name, `${value}`);
      });
    } else {
      method = 'POST';
      body = args;
    }
    const headers = Object.assign({}, this.headers);
    if (count) {
      headers['Prefer'] = `count=${count}`;
    }
    return new _PostgrestFilterBuilder.default({
      method,
      url,
      headers,
      schema: this.schema,
      body,
      fetch: this.fetch,
      allowEmpty: false
    });
  }
}
exports.default = PostgrestClient;
},{"./PostgrestQueryBuilder":"node_modules/@supabase/postgrest-js/dist/module/PostgrestQueryBuilder.js","./PostgrestFilterBuilder":"node_modules/@supabase/postgrest-js/dist/module/PostgrestFilterBuilder.js","./constants":"node_modules/@supabase/postgrest-js/dist/module/constants.js"}],"node_modules/@supabase/postgrest-js/dist/module/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "PostgrestBuilder", {
  enumerable: true,
  get: function () {
    return _PostgrestBuilder.default;
  }
});
Object.defineProperty(exports, "PostgrestClient", {
  enumerable: true,
  get: function () {
    return _PostgrestClient.default;
  }
});
Object.defineProperty(exports, "PostgrestFilterBuilder", {
  enumerable: true,
  get: function () {
    return _PostgrestFilterBuilder.default;
  }
});
Object.defineProperty(exports, "PostgrestQueryBuilder", {
  enumerable: true,
  get: function () {
    return _PostgrestQueryBuilder.default;
  }
});
Object.defineProperty(exports, "PostgrestTransformBuilder", {
  enumerable: true,
  get: function () {
    return _PostgrestTransformBuilder.default;
  }
});
var _PostgrestClient = _interopRequireDefault(require("./PostgrestClient"));
var _PostgrestQueryBuilder = _interopRequireDefault(require("./PostgrestQueryBuilder"));
var _PostgrestFilterBuilder = _interopRequireDefault(require("./PostgrestFilterBuilder"));
var _PostgrestTransformBuilder = _interopRequireDefault(require("./PostgrestTransformBuilder"));
var _PostgrestBuilder = _interopRequireDefault(require("./PostgrestBuilder"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./PostgrestClient":"node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js","./PostgrestQueryBuilder":"node_modules/@supabase/postgrest-js/dist/module/PostgrestQueryBuilder.js","./PostgrestFilterBuilder":"node_modules/@supabase/postgrest-js/dist/module/PostgrestFilterBuilder.js","./PostgrestTransformBuilder":"node_modules/@supabase/postgrest-js/dist/module/PostgrestTransformBuilder.js","./PostgrestBuilder":"node_modules/@supabase/postgrest-js/dist/module/PostgrestBuilder.js"}],"node_modules/es5-ext/global.js":[function(require,module,exports) {
var naiveFallback = function () {
  if (typeof self === "object" && self) return self;
  if (typeof window === "object" && window) return window;
  throw new Error("Unable to resolve global `this`");
};
module.exports = function () {
  if (this) return this;

  // Unexpected strict mode (may happen if e.g. bundled into ESM module)

  // Fallback to standard globalThis if available
  if (typeof globalThis === "object" && globalThis) return globalThis;

  // Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
  // In all ES5+ engines global object inherits from Object.prototype
  // (if you approached one that doesn't please report)
  try {
    Object.defineProperty(Object.prototype, "__global__", {
      get: function () {
        return this;
      },
      configurable: true
    });
  } catch (error) {
    // Unfortunate case of updates to Object.prototype being restricted
    // via preventExtensions, seal or freeze
    return naiveFallback();
  }
  try {
    // Safari case (window.__global__ works, but __global__ does not)
    if (!__global__) return naiveFallback();
    return __global__;
  } finally {
    delete Object.prototype.__global__;
  }
}();
},{}],"node_modules/websocket/package.json":[function(require,module,exports) {
module.exports = {
  "name": "websocket",
  "description": "Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.",
  "keywords": ["websocket", "websockets", "socket", "networking", "comet", "push", "RFC-6455", "realtime", "server", "client"],
  "author": "Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)",
  "contributors": ["Iñaki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)"],
  "version": "1.0.34",
  "repository": {
    "type": "git",
    "url": "https://github.com/theturtle32/WebSocket-Node.git"
  },
  "homepage": "https://github.com/theturtle32/WebSocket-Node",
  "engines": {
    "node": ">=4.0.0"
  },
  "dependencies": {
    "bufferutil": "^4.0.1",
    "debug": "^2.2.0",
    "es5-ext": "^0.10.50",
    "typedarray-to-buffer": "^3.1.5",
    "utf-8-validate": "^5.0.2",
    "yaeti": "^0.0.6"
  },
  "devDependencies": {
    "buffer-equal": "^1.0.0",
    "gulp": "^4.0.2",
    "gulp-jshint": "^2.0.4",
    "jshint-stylish": "^2.2.1",
    "jshint": "^2.0.0",
    "tape": "^4.9.1"
  },
  "config": {
    "verbose": false
  },
  "scripts": {
    "test": "tape test/unit/*.js",
    "gulp": "gulp"
  },
  "main": "index",
  "directories": {
    "lib": "./lib"
  },
  "browser": "lib/browser.js",
  "license": "Apache-2.0"
};
},{}],"node_modules/websocket/lib/version.js":[function(require,module,exports) {
module.exports = require('../package.json').version;
},{"../package.json":"node_modules/websocket/package.json"}],"node_modules/websocket/lib/browser.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _globalThis;
if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
  _globalThis = globalThis;
} else {
  try {
    _globalThis = require('es5-ext/global');
  } catch (error) {} finally {
    if (!_globalThis && typeof window !== 'undefined') {
      _globalThis = window;
    }
    if (!_globalThis) {
      throw new Error('Could not determine global this');
    }
  }
}
var NativeWebSocket = _globalThis.WebSocket || _globalThis.MozWebSocket;
var websocket_version = require('./version');

/**
 * Expose a W3C WebSocket class with just one or two arguments.
 */
function W3CWebSocket(uri, protocols) {
  var native_instance;
  if (protocols) {
    native_instance = new NativeWebSocket(uri, protocols);
  } else {
    native_instance = new NativeWebSocket(uri);
  }

  /**
   * 'native_instance' is an instance of nativeWebSocket (the browser's WebSocket
   * class). Since it is an Object it will be returned as it is when creating an
   * instance of W3CWebSocket via 'new W3CWebSocket()'.
   *
   * ECMAScript 5: http://bclary.com/2004/11/07/#a-13.2.2
   */
  return native_instance;
}
if (NativeWebSocket) {
  ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach(function (prop) {
    Object.defineProperty(W3CWebSocket, prop, {
      get: function () {
        return NativeWebSocket[prop];
      }
    });
  });
}

/**
 * Module exports.
 */
module.exports = {
  'w3cwebsocket': NativeWebSocket ? W3CWebSocket : null,
  'version': websocket_version
};
},{"es5-ext/global":"node_modules/es5-ext/global.js","./version":"node_modules/websocket/lib/version.js"}],"node_modules/@supabase/realtime-js/dist/module/lib/version.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = '2.7.3';
exports.version = version;
},{}],"node_modules/@supabase/realtime-js/dist/module/lib/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WS_CLOSE_NORMAL = exports.VSN = exports.TRANSPORTS = exports.SOCKET_STATES = exports.DEFAULT_TIMEOUT = exports.DEFAULT_HEADERS = exports.CONNECTION_STATE = exports.CHANNEL_STATES = exports.CHANNEL_EVENTS = void 0;
var _version = require("./version");
const DEFAULT_HEADERS = {
  'X-Client-Info': `realtime-js/${_version.version}`
};
exports.DEFAULT_HEADERS = DEFAULT_HEADERS;
const VSN = '1.0.0';
exports.VSN = VSN;
const DEFAULT_TIMEOUT = 10000;
exports.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;
const WS_CLOSE_NORMAL = 1000;
exports.WS_CLOSE_NORMAL = WS_CLOSE_NORMAL;
var SOCKET_STATES;
exports.SOCKET_STATES = SOCKET_STATES;
(function (SOCKET_STATES) {
  SOCKET_STATES[SOCKET_STATES["connecting"] = 0] = "connecting";
  SOCKET_STATES[SOCKET_STATES["open"] = 1] = "open";
  SOCKET_STATES[SOCKET_STATES["closing"] = 2] = "closing";
  SOCKET_STATES[SOCKET_STATES["closed"] = 3] = "closed";
})(SOCKET_STATES || (exports.SOCKET_STATES = SOCKET_STATES = {}));
var CHANNEL_STATES;
exports.CHANNEL_STATES = CHANNEL_STATES;
(function (CHANNEL_STATES) {
  CHANNEL_STATES["closed"] = "closed";
  CHANNEL_STATES["errored"] = "errored";
  CHANNEL_STATES["joined"] = "joined";
  CHANNEL_STATES["joining"] = "joining";
  CHANNEL_STATES["leaving"] = "leaving";
})(CHANNEL_STATES || (exports.CHANNEL_STATES = CHANNEL_STATES = {}));
var CHANNEL_EVENTS;
exports.CHANNEL_EVENTS = CHANNEL_EVENTS;
(function (CHANNEL_EVENTS) {
  CHANNEL_EVENTS["close"] = "phx_close";
  CHANNEL_EVENTS["error"] = "phx_error";
  CHANNEL_EVENTS["join"] = "phx_join";
  CHANNEL_EVENTS["reply"] = "phx_reply";
  CHANNEL_EVENTS["leave"] = "phx_leave";
  CHANNEL_EVENTS["access_token"] = "access_token";
})(CHANNEL_EVENTS || (exports.CHANNEL_EVENTS = CHANNEL_EVENTS = {}));
var TRANSPORTS;
exports.TRANSPORTS = TRANSPORTS;
(function (TRANSPORTS) {
  TRANSPORTS["websocket"] = "websocket";
})(TRANSPORTS || (exports.TRANSPORTS = TRANSPORTS = {}));
var CONNECTION_STATE;
exports.CONNECTION_STATE = CONNECTION_STATE;
(function (CONNECTION_STATE) {
  CONNECTION_STATE["Connecting"] = "connecting";
  CONNECTION_STATE["Open"] = "open";
  CONNECTION_STATE["Closing"] = "closing";
  CONNECTION_STATE["Closed"] = "closed";
})(CONNECTION_STATE || (exports.CONNECTION_STATE = CONNECTION_STATE = {}));
},{"./version":"node_modules/@supabase/realtime-js/dist/module/lib/version.js"}],"node_modules/@supabase/realtime-js/dist/module/lib/timer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Creates a timer that accepts a `timerCalc` function to perform calculated timeout retries, such as exponential backoff.
 *
 * @example
 *    let reconnectTimer = new Timer(() => this.connect(), function(tries){
 *      return [1000, 5000, 10000][tries - 1] || 10000
 *    })
 *    reconnectTimer.scheduleTimeout() // fires after 1000
 *    reconnectTimer.scheduleTimeout() // fires after 5000
 *    reconnectTimer.reset()
 *    reconnectTimer.scheduleTimeout() // fires after 1000
 */
class Timer {
  constructor(callback, timerCalc) {
    this.callback = callback;
    this.timerCalc = timerCalc;
    this.timer = undefined;
    this.tries = 0;
    this.callback = callback;
    this.timerCalc = timerCalc;
  }
  reset() {
    this.tries = 0;
    clearTimeout(this.timer);
  }
  // Cancels any previous scheduleTimeout and schedules callback
  scheduleTimeout() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.tries = this.tries + 1;
      this.callback();
    }, this.timerCalc(this.tries + 1));
  }
}
exports.default = Timer;
},{}],"node_modules/@supabase/realtime-js/dist/module/lib/serializer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// This file draws heavily from https://github.com/phoenixframework/phoenix/commit/cf098e9cf7a44ee6479d31d911a97d3c7430c6fe
// License: https://github.com/phoenixframework/phoenix/blob/master/LICENSE.md
class Serializer {
  constructor() {
    this.HEADER_LENGTH = 1;
  }
  decode(rawPayload, callback) {
    if (rawPayload.constructor === ArrayBuffer) {
      return callback(this._binaryDecode(rawPayload));
    }
    if (typeof rawPayload === 'string') {
      return callback(JSON.parse(rawPayload));
    }
    return callback({});
  }
  _binaryDecode(buffer) {
    const view = new DataView(buffer);
    const decoder = new TextDecoder();
    return this._decodeBroadcast(buffer, view, decoder);
  }
  _decodeBroadcast(buffer, view, decoder) {
    const topicSize = view.getUint8(1);
    const eventSize = view.getUint8(2);
    let offset = this.HEADER_LENGTH + 2;
    const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
    offset = offset + topicSize;
    const event = decoder.decode(buffer.slice(offset, offset + eventSize));
    offset = offset + eventSize;
    const data = JSON.parse(decoder.decode(buffer.slice(offset, buffer.byteLength)));
    return {
      ref: null,
      topic: topic,
      event: event,
      payload: data
    };
  }
}
exports.default = Serializer;
},{}],"node_modules/@supabase/realtime-js/dist/module/lib/push.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _constants = require("../lib/constants");
class Push {
  /**
   * Initializes the Push
   *
   * @param channel The Channel
   * @param event The event, for example `"phx_join"`
   * @param payload The payload, for example `{user_id: 123}`
   * @param timeout The push timeout in milliseconds
   */
  constructor(channel, event, payload = {}, timeout = _constants.DEFAULT_TIMEOUT) {
    this.channel = channel;
    this.event = event;
    this.payload = payload;
    this.timeout = timeout;
    this.sent = false;
    this.timeoutTimer = undefined;
    this.ref = '';
    this.receivedResp = null;
    this.recHooks = [];
    this.refEvent = null;
    this.rateLimited = false;
  }
  resend(timeout) {
    this.timeout = timeout;
    this._cancelRefEvent();
    this.ref = '';
    this.refEvent = null;
    this.receivedResp = null;
    this.sent = false;
    this.send();
  }
  send() {
    if (this._hasReceived('timeout')) {
      return;
    }
    this.startTimeout();
    this.sent = true;
    const status = this.channel.socket.push({
      topic: this.channel.topic,
      event: this.event,
      payload: this.payload,
      ref: this.ref,
      join_ref: this.channel._joinRef()
    });
    if (status === 'rate limited') {
      this.rateLimited = true;
    }
  }
  updatePayload(payload) {
    this.payload = Object.assign(Object.assign({}, this.payload), payload);
  }
  receive(status, callback) {
    var _a;
    if (this._hasReceived(status)) {
      callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
    }
    this.recHooks.push({
      status,
      callback
    });
    return this;
  }
  startTimeout() {
    if (this.timeoutTimer) {
      return;
    }
    this.ref = this.channel.socket._makeRef();
    this.refEvent = this.channel._replyEventName(this.ref);
    const callback = payload => {
      this._cancelRefEvent();
      this._cancelTimeout();
      this.receivedResp = payload;
      this._matchReceive(payload);
    };
    this.channel._on(this.refEvent, {}, callback);
    this.timeoutTimer = setTimeout(() => {
      this.trigger('timeout', {});
    }, this.timeout);
  }
  trigger(status, response) {
    if (this.refEvent) this.channel._trigger(this.refEvent, {
      status,
      response
    });
  }
  destroy() {
    this._cancelRefEvent();
    this._cancelTimeout();
  }
  _cancelRefEvent() {
    if (!this.refEvent) {
      return;
    }
    this.channel._off(this.refEvent, {});
  }
  _cancelTimeout() {
    clearTimeout(this.timeoutTimer);
    this.timeoutTimer = undefined;
  }
  _matchReceive({
    status,
    response
  }) {
    this.recHooks.filter(h => h.status === status).forEach(h => h.callback(response));
  }
  _hasReceived(status) {
    return this.receivedResp && this.receivedResp.status === status;
  }
}
exports.default = Push;
},{"../lib/constants":"node_modules/@supabase/realtime-js/dist/module/lib/constants.js"}],"node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.REALTIME_PRESENCE_LISTEN_EVENTS = void 0;
/*
  This file draws heavily from https://github.com/phoenixframework/phoenix/blob/d344ec0a732ab4ee204215b31de69cf4be72e3bf/assets/js/phoenix/presence.js
  License: https://github.com/phoenixframework/phoenix/blob/d344ec0a732ab4ee204215b31de69cf4be72e3bf/LICENSE.md
*/
var REALTIME_PRESENCE_LISTEN_EVENTS;
exports.REALTIME_PRESENCE_LISTEN_EVENTS = REALTIME_PRESENCE_LISTEN_EVENTS;
(function (REALTIME_PRESENCE_LISTEN_EVENTS) {
  REALTIME_PRESENCE_LISTEN_EVENTS["SYNC"] = "sync";
  REALTIME_PRESENCE_LISTEN_EVENTS["JOIN"] = "join";
  REALTIME_PRESENCE_LISTEN_EVENTS["LEAVE"] = "leave";
})(REALTIME_PRESENCE_LISTEN_EVENTS || (exports.REALTIME_PRESENCE_LISTEN_EVENTS = REALTIME_PRESENCE_LISTEN_EVENTS = {}));
class RealtimePresence {
  /**
   * Initializes the Presence.
   *
   * @param channel - The RealtimeChannel
   * @param opts - The options,
   *        for example `{events: {state: 'state', diff: 'diff'}}`
   */
  constructor(channel, opts) {
    this.channel = channel;
    this.state = {};
    this.pendingDiffs = [];
    this.joinRef = null;
    this.caller = {
      onJoin: () => {},
      onLeave: () => {},
      onSync: () => {}
    };
    const events = (opts === null || opts === void 0 ? void 0 : opts.events) || {
      state: 'presence_state',
      diff: 'presence_diff'
    };
    this.channel._on(events.state, {}, newState => {
      const {
        onJoin,
        onLeave,
        onSync
      } = this.caller;
      this.joinRef = this.channel._joinRef();
      this.state = RealtimePresence.syncState(this.state, newState, onJoin, onLeave);
      this.pendingDiffs.forEach(diff => {
        this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
      });
      this.pendingDiffs = [];
      onSync();
    });
    this.channel._on(events.diff, {}, diff => {
      const {
        onJoin,
        onLeave,
        onSync
      } = this.caller;
      if (this.inPendingSyncState()) {
        this.pendingDiffs.push(diff);
      } else {
        this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
        onSync();
      }
    });
    this.onJoin((key, currentPresences, newPresences) => {
      this.channel._trigger('presence', {
        event: 'join',
        key,
        currentPresences,
        newPresences
      });
    });
    this.onLeave((key, currentPresences, leftPresences) => {
      this.channel._trigger('presence', {
        event: 'leave',
        key,
        currentPresences,
        leftPresences
      });
    });
    this.onSync(() => {
      this.channel._trigger('presence', {
        event: 'sync'
      });
    });
  }
  /**
   * Used to sync the list of presences on the server with the
   * client's state.
   *
   * An optional `onJoin` and `onLeave` callback can be provided to
   * react to changes in the client's local presences across
   * disconnects and reconnects with the server.
   *
   * @internal
   */
  static syncState(currentState, newState, onJoin, onLeave) {
    const state = this.cloneDeep(currentState);
    const transformedState = this.transformState(newState);
    const joins = {};
    const leaves = {};
    this.map(state, (key, presences) => {
      if (!transformedState[key]) {
        leaves[key] = presences;
      }
    });
    this.map(transformedState, (key, newPresences) => {
      const currentPresences = state[key];
      if (currentPresences) {
        const newPresenceRefs = newPresences.map(m => m.presence_ref);
        const curPresenceRefs = currentPresences.map(m => m.presence_ref);
        const joinedPresences = newPresences.filter(m => curPresenceRefs.indexOf(m.presence_ref) < 0);
        const leftPresences = currentPresences.filter(m => newPresenceRefs.indexOf(m.presence_ref) < 0);
        if (joinedPresences.length > 0) {
          joins[key] = joinedPresences;
        }
        if (leftPresences.length > 0) {
          leaves[key] = leftPresences;
        }
      } else {
        joins[key] = newPresences;
      }
    });
    return this.syncDiff(state, {
      joins,
      leaves
    }, onJoin, onLeave);
  }
  /**
   * Used to sync a diff of presence join and leave events from the
   * server, as they happen.
   *
   * Like `syncState`, `syncDiff` accepts optional `onJoin` and
   * `onLeave` callbacks to react to a user joining or leaving from a
   * device.
   *
   * @internal
   */
  static syncDiff(state, diff, onJoin, onLeave) {
    const {
      joins,
      leaves
    } = {
      joins: this.transformState(diff.joins),
      leaves: this.transformState(diff.leaves)
    };
    if (!onJoin) {
      onJoin = () => {};
    }
    if (!onLeave) {
      onLeave = () => {};
    }
    this.map(joins, (key, newPresences) => {
      var _a;
      const currentPresences = (_a = state[key]) !== null && _a !== void 0 ? _a : [];
      state[key] = this.cloneDeep(newPresences);
      if (currentPresences.length > 0) {
        const joinedPresenceRefs = state[key].map(m => m.presence_ref);
        const curPresences = currentPresences.filter(m => joinedPresenceRefs.indexOf(m.presence_ref) < 0);
        state[key].unshift(...curPresences);
      }
      onJoin(key, currentPresences, newPresences);
    });
    this.map(leaves, (key, leftPresences) => {
      let currentPresences = state[key];
      if (!currentPresences) return;
      const presenceRefsToRemove = leftPresences.map(m => m.presence_ref);
      currentPresences = currentPresences.filter(m => presenceRefsToRemove.indexOf(m.presence_ref) < 0);
      state[key] = currentPresences;
      onLeave(key, currentPresences, leftPresences);
      if (currentPresences.length === 0) delete state[key];
    });
    return state;
  }
  /** @internal */
  static map(obj, func) {
    return Object.getOwnPropertyNames(obj).map(key => func(key, obj[key]));
  }
  /**
   * Remove 'metas' key
   * Change 'phx_ref' to 'presence_ref'
   * Remove 'phx_ref' and 'phx_ref_prev'
   *
   * @example
   * // returns {
   *  abc123: [
   *    { presence_ref: '2', user_id: 1 },
   *    { presence_ref: '3', user_id: 2 }
   *  ]
   * }
   * RealtimePresence.transformState({
   *  abc123: {
   *    metas: [
   *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
   *      { phx_ref: '3', user_id: 2 }
   *    ]
   *  }
   * })
   *
   * @internal
   */
  static transformState(state) {
    state = this.cloneDeep(state);
    return Object.getOwnPropertyNames(state).reduce((newState, key) => {
      const presences = state[key];
      if ('metas' in presences) {
        newState[key] = presences.metas.map(presence => {
          presence['presence_ref'] = presence['phx_ref'];
          delete presence['phx_ref'];
          delete presence['phx_ref_prev'];
          return presence;
        });
      } else {
        newState[key] = presences;
      }
      return newState;
    }, {});
  }
  /** @internal */
  static cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  /** @internal */
  onJoin(callback) {
    this.caller.onJoin = callback;
  }
  /** @internal */
  onLeave(callback) {
    this.caller.onLeave = callback;
  }
  /** @internal */
  onSync(callback) {
    this.caller.onSync = callback;
  }
  /** @internal */
  inPendingSyncState() {
    return !this.joinRef || this.joinRef !== this.channel._joinRef();
  }
}
exports.default = RealtimePresence;
},{}],"node_modules/@supabase/realtime-js/dist/module/lib/transformers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toTimestampString = exports.toNumber = exports.toJson = exports.toBoolean = exports.toArray = exports.convertColumn = exports.convertChangeData = exports.convertCell = exports.PostgresTypes = void 0;
/**
 * Helpers to convert the change Payload into native JS types.
 */
// Adapted from epgsql (src/epgsql_binary.erl), this module licensed under
// 3-clause BSD found here: https://raw.githubusercontent.com/epgsql/epgsql/devel/LICENSE
var PostgresTypes;
exports.PostgresTypes = PostgresTypes;
(function (PostgresTypes) {
  PostgresTypes["abstime"] = "abstime";
  PostgresTypes["bool"] = "bool";
  PostgresTypes["date"] = "date";
  PostgresTypes["daterange"] = "daterange";
  PostgresTypes["float4"] = "float4";
  PostgresTypes["float8"] = "float8";
  PostgresTypes["int2"] = "int2";
  PostgresTypes["int4"] = "int4";
  PostgresTypes["int4range"] = "int4range";
  PostgresTypes["int8"] = "int8";
  PostgresTypes["int8range"] = "int8range";
  PostgresTypes["json"] = "json";
  PostgresTypes["jsonb"] = "jsonb";
  PostgresTypes["money"] = "money";
  PostgresTypes["numeric"] = "numeric";
  PostgresTypes["oid"] = "oid";
  PostgresTypes["reltime"] = "reltime";
  PostgresTypes["text"] = "text";
  PostgresTypes["time"] = "time";
  PostgresTypes["timestamp"] = "timestamp";
  PostgresTypes["timestamptz"] = "timestamptz";
  PostgresTypes["timetz"] = "timetz";
  PostgresTypes["tsrange"] = "tsrange";
  PostgresTypes["tstzrange"] = "tstzrange";
})(PostgresTypes || (exports.PostgresTypes = PostgresTypes = {}));
/**
 * Takes an array of columns and an object of string values then converts each string value
 * to its mapped type.
 *
 * @param {{name: String, type: String}[]} columns
 * @param {Object} record
 * @param {Object} options The map of various options that can be applied to the mapper
 * @param {Array} options.skipTypes The array of types that should not be converted
 *
 * @example convertChangeData([{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age:'33'}, {})
 * //=>{ first_name: 'Paul', age: 33 }
 */
const convertChangeData = (columns, record, options = {}) => {
  var _a;
  const skipTypes = (_a = options.skipTypes) !== null && _a !== void 0 ? _a : [];
  return Object.keys(record).reduce((acc, rec_key) => {
    acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
    return acc;
  }, {});
};
/**
 * Converts the value of an individual column.
 *
 * @param {String} columnName The column that you want to convert
 * @param {{name: String, type: String}[]} columns All of the columns
 * @param {Object} record The map of string values
 * @param {Array} skipTypes An array of types that should not be converted
 * @return {object} Useless information
 *
 * @example convertColumn('age', [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age: '33'}, [])
 * //=> 33
 * @example convertColumn('age', [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age: '33'}, ['int4'])
 * //=> "33"
 */
exports.convertChangeData = convertChangeData;
const convertColumn = (columnName, columns, record, skipTypes) => {
  const column = columns.find(x => x.name === columnName);
  const colType = column === null || column === void 0 ? void 0 : column.type;
  const value = record[columnName];
  if (colType && !skipTypes.includes(colType)) {
    return convertCell(colType, value);
  }
  return noop(value);
};
/**
 * If the value of the cell is `null`, returns null.
 * Otherwise converts the string value to the correct type.
 * @param {String} type A postgres column type
 * @param {String} value The cell value
 *
 * @example convertCell('bool', 't')
 * //=> true
 * @example convertCell('int8', '10')
 * //=> 10
 * @example convertCell('_int4', '{1,2,3,4}')
 * //=> [1,2,3,4]
 */
exports.convertColumn = convertColumn;
const convertCell = (type, value) => {
  // if data type is an array
  if (type.charAt(0) === '_') {
    const dataType = type.slice(1, type.length);
    return toArray(value, dataType);
  }
  // If not null, convert to correct type.
  switch (type) {
    case PostgresTypes.bool:
      return toBoolean(value);
    case PostgresTypes.float4:
    case PostgresTypes.float8:
    case PostgresTypes.int2:
    case PostgresTypes.int4:
    case PostgresTypes.int8:
    case PostgresTypes.numeric:
    case PostgresTypes.oid:
      return toNumber(value);
    case PostgresTypes.json:
    case PostgresTypes.jsonb:
      return toJson(value);
    case PostgresTypes.timestamp:
      return toTimestampString(value);
    // Format to be consistent with PostgREST
    case PostgresTypes.abstime: // To allow users to cast it based on Timezone
    case PostgresTypes.date: // To allow users to cast it based on Timezone
    case PostgresTypes.daterange:
    case PostgresTypes.int4range:
    case PostgresTypes.int8range:
    case PostgresTypes.money:
    case PostgresTypes.reltime: // To allow users to cast it based on Timezone
    case PostgresTypes.text:
    case PostgresTypes.time: // To allow users to cast it based on Timezone
    case PostgresTypes.timestamptz: // To allow users to cast it based on Timezone
    case PostgresTypes.timetz: // To allow users to cast it based on Timezone
    case PostgresTypes.tsrange:
    case PostgresTypes.tstzrange:
      return noop(value);
    default:
      // Return the value for remaining types
      return noop(value);
  }
};
exports.convertCell = convertCell;
const noop = value => {
  return value;
};
const toBoolean = value => {
  switch (value) {
    case 't':
      return true;
    case 'f':
      return false;
    default:
      return value;
  }
};
exports.toBoolean = toBoolean;
const toNumber = value => {
  if (typeof value === 'string') {
    const parsedValue = parseFloat(value);
    if (!Number.isNaN(parsedValue)) {
      return parsedValue;
    }
  }
  return value;
};
exports.toNumber = toNumber;
const toJson = value => {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.log(`JSON parse error: ${error}`);
      return value;
    }
  }
  return value;
};
/**
 * Converts a Postgres Array into a native JS array
 *
 * @example toArray('{}', 'int4')
 * //=> []
 * @example toArray('{"[2021-01-01,2021-12-31)","(2021-01-01,2021-12-32]"}', 'daterange')
 * //=> ['[2021-01-01,2021-12-31)', '(2021-01-01,2021-12-32]']
 * @example toArray([1,2,3,4], 'int4')
 * //=> [1,2,3,4]
 */
exports.toJson = toJson;
const toArray = (value, type) => {
  if (typeof value !== 'string') {
    return value;
  }
  const lastIdx = value.length - 1;
  const closeBrace = value[lastIdx];
  const openBrace = value[0];
  // Confirm value is a Postgres array by checking curly brackets
  if (openBrace === '{' && closeBrace === '}') {
    let arr;
    const valTrim = value.slice(1, lastIdx);
    // TODO: find a better solution to separate Postgres array data
    try {
      arr = JSON.parse('[' + valTrim + ']');
    } catch (_) {
      // WARNING: splitting on comma does not cover all edge cases
      arr = valTrim ? valTrim.split(',') : [];
    }
    return arr.map(val => convertCell(type, val));
  }
  return value;
};
/**
 * Fixes timestamp to be ISO-8601. Swaps the space between the date and time for a 'T'
 * See https://github.com/supabase/supabase/issues/18
 *
 * @example toTimestampString('2019-09-10 00:00:00')
 * //=> '2019-09-10T00:00:00'
 */
exports.toArray = toArray;
const toTimestampString = value => {
  if (typeof value === 'string') {
    return value.replace(' ', 'T');
  }
  return value;
};
exports.toTimestampString = toTimestampString;
},{}],"node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.REALTIME_SUBSCRIBE_STATES = exports.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = exports.REALTIME_LISTEN_TYPES = void 0;
var _constants = require("./lib/constants");
var _push = _interopRequireDefault(require("./lib/push"));
var _timer = _interopRequireDefault(require("./lib/timer"));
var _RealtimePresence = _interopRequireDefault(require("./RealtimePresence"));
var Transformers = _interopRequireWildcard(require("./lib/transformers"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
exports.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
(function (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT) {
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["ALL"] = "*";
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["INSERT"] = "INSERT";
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["UPDATE"] = "UPDATE";
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["DELETE"] = "DELETE";
})(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (exports.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
var REALTIME_LISTEN_TYPES;
exports.REALTIME_LISTEN_TYPES = REALTIME_LISTEN_TYPES;
(function (REALTIME_LISTEN_TYPES) {
  REALTIME_LISTEN_TYPES["BROADCAST"] = "broadcast";
  REALTIME_LISTEN_TYPES["PRESENCE"] = "presence";
  /**
   * listen to Postgres changes.
   */
  REALTIME_LISTEN_TYPES["POSTGRES_CHANGES"] = "postgres_changes";
})(REALTIME_LISTEN_TYPES || (exports.REALTIME_LISTEN_TYPES = REALTIME_LISTEN_TYPES = {}));
var REALTIME_SUBSCRIBE_STATES;
exports.REALTIME_SUBSCRIBE_STATES = REALTIME_SUBSCRIBE_STATES;
(function (REALTIME_SUBSCRIBE_STATES) {
  REALTIME_SUBSCRIBE_STATES["SUBSCRIBED"] = "SUBSCRIBED";
  REALTIME_SUBSCRIBE_STATES["TIMED_OUT"] = "TIMED_OUT";
  REALTIME_SUBSCRIBE_STATES["CLOSED"] = "CLOSED";
  REALTIME_SUBSCRIBE_STATES["CHANNEL_ERROR"] = "CHANNEL_ERROR";
})(REALTIME_SUBSCRIBE_STATES || (exports.REALTIME_SUBSCRIBE_STATES = REALTIME_SUBSCRIBE_STATES = {}));
/** A channel is the basic building block of Realtime
 * and narrows the scope of data flow to subscribed clients.
 * You can think of a channel as a chatroom where participants are able to see who's online
 * and send and receive messages.
 **/
class RealtimeChannel {
  constructor( /** Topic name can be any string. */
  topic, params = {
    config: {}
  }, socket) {
    this.topic = topic;
    this.params = params;
    this.socket = socket;
    this.bindings = {};
    this.state = _constants.CHANNEL_STATES.closed;
    this.joinedOnce = false;
    this.pushBuffer = [];
    this.params.config = Object.assign({
      broadcast: {
        ack: false,
        self: false
      },
      presence: {
        key: ''
      }
    }, params.config);
    this.timeout = this.socket.timeout;
    this.joinPush = new _push.default(this, _constants.CHANNEL_EVENTS.join, this.params, this.timeout);
    this.rejoinTimer = new _timer.default(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs);
    this.joinPush.receive('ok', () => {
      this.state = _constants.CHANNEL_STATES.joined;
      this.rejoinTimer.reset();
      this.pushBuffer.forEach(pushEvent => pushEvent.send());
      this.pushBuffer = [];
    });
    this._onClose(() => {
      this.rejoinTimer.reset();
      this.socket.log('channel', `close ${this.topic} ${this._joinRef()}`);
      this.state = _constants.CHANNEL_STATES.closed;
      this.socket._remove(this);
    });
    this._onError(reason => {
      if (this._isLeaving() || this._isClosed()) {
        return;
      }
      this.socket.log('channel', `error ${this.topic}`, reason);
      this.state = _constants.CHANNEL_STATES.errored;
      this.rejoinTimer.scheduleTimeout();
    });
    this.joinPush.receive('timeout', () => {
      if (!this._isJoining()) {
        return;
      }
      this.socket.log('channel', `timeout ${this.topic}`, this.joinPush.timeout);
      this.state = _constants.CHANNEL_STATES.errored;
      this.rejoinTimer.scheduleTimeout();
    });
    this._on(_constants.CHANNEL_EVENTS.reply, {}, (payload, ref) => {
      this._trigger(this._replyEventName(ref), payload);
    });
    this.presence = new _RealtimePresence.default(this);
  }
  /** Subscribe registers your client with the server */
  subscribe(callback, timeout = this.timeout) {
    var _a, _b;
    if (this.joinedOnce) {
      throw `tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance`;
    } else {
      const {
        config: {
          broadcast,
          presence
        }
      } = this.params;
      this._onError(e => callback && callback('CHANNEL_ERROR', e));
      this._onClose(() => callback && callback('CLOSED'));
      const accessTokenPayload = {};
      const config = {
        broadcast,
        presence,
        postgres_changes: (_b = (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.map(r => r.filter)) !== null && _b !== void 0 ? _b : []
      };
      if (this.socket.accessToken) {
        accessTokenPayload.access_token = this.socket.accessToken;
      }
      this.updateJoinPayload(Object.assign({
        config
      }, accessTokenPayload));
      this.joinedOnce = true;
      this._rejoin(timeout);
      this.joinPush.receive('ok', ({
        postgres_changes: serverPostgresFilters
      }) => {
        var _a;
        this.socket.accessToken && this.socket.setAuth(this.socket.accessToken);
        if (serverPostgresFilters === undefined) {
          callback && callback('SUBSCRIBED');
          return;
        } else {
          const clientPostgresBindings = this.bindings.postgres_changes;
          const bindingsLen = (_a = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a !== void 0 ? _a : 0;
          const newPostgresBindings = [];
          for (let i = 0; i < bindingsLen; i++) {
            const clientPostgresBinding = clientPostgresBindings[i];
            const {
              filter: {
                event,
                schema,
                table,
                filter
              }
            } = clientPostgresBinding;
            const serverPostgresFilter = serverPostgresFilters && serverPostgresFilters[i];
            if (serverPostgresFilter && serverPostgresFilter.event === event && serverPostgresFilter.schema === schema && serverPostgresFilter.table === table && serverPostgresFilter.filter === filter) {
              newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), {
                id: serverPostgresFilter.id
              }));
            } else {
              this.unsubscribe();
              callback && callback('CHANNEL_ERROR', new Error('mismatch between server and client bindings for postgres changes'));
              return;
            }
          }
          this.bindings.postgres_changes = newPostgresBindings;
          callback && callback('SUBSCRIBED');
          return;
        }
      }).receive('error', error => {
        callback && callback('CHANNEL_ERROR', new Error(JSON.stringify(Object.values(error).join(', ') || 'error')));
        return;
      }).receive('timeout', () => {
        callback && callback('TIMED_OUT');
        return;
      });
    }
    return this;
  }
  presenceState() {
    return this.presence.state;
  }
  track(payload, opts = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.send({
        type: 'presence',
        event: 'track',
        payload
      }, opts.timeout || this.timeout);
    });
  }
  untrack(opts = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.send({
        type: 'presence',
        event: 'untrack'
      }, opts);
    });
  }
  on(type, filter, callback) {
    return this._on(type, filter, callback);
  }
  send(payload, opts = {}) {
    return new Promise(resolve => {
      var _a, _b, _c;
      const push = this._push(payload.type, payload, opts.timeout || this.timeout);
      if (push.rateLimited) {
        resolve('rate limited');
      }
      if (payload.type === 'broadcast' && !((_c = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) {
        resolve('ok');
      }
      push.receive('ok', () => resolve('ok'));
      push.receive('timeout', () => resolve('timed out'));
    });
  }
  updateJoinPayload(payload) {
    this.joinPush.updatePayload(payload);
  }
  /**
   * Leaves the channel.
   *
   * Unsubscribes from server events, and instructs channel to terminate on server.
   * Triggers onClose() hooks.
   *
   * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
   * channel.unsubscribe().receive("ok", () => alert("left!") )
   */
  unsubscribe(timeout = this.timeout) {
    this.state = _constants.CHANNEL_STATES.leaving;
    const onClose = () => {
      this.socket.log('channel', `leave ${this.topic}`);
      this._trigger(_constants.CHANNEL_EVENTS.close, 'leave', this._joinRef());
    };
    this.rejoinTimer.reset();
    // Destroy joinPush to avoid connection timeouts during unscription phase
    this.joinPush.destroy();
    return new Promise(resolve => {
      const leavePush = new _push.default(this, _constants.CHANNEL_EVENTS.leave, {}, timeout);
      leavePush.receive('ok', () => {
        onClose();
        resolve('ok');
      }).receive('timeout', () => {
        onClose();
        resolve('timed out');
      }).receive('error', () => {
        resolve('error');
      });
      leavePush.send();
      if (!this._canPush()) {
        leavePush.trigger('ok', {});
      }
    });
  }
  /** @internal */
  _push(event, payload, timeout = this.timeout) {
    if (!this.joinedOnce) {
      throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
    }
    let pushEvent = new _push.default(this, event, payload, timeout);
    if (this._canPush()) {
      pushEvent.send();
    } else {
      pushEvent.startTimeout();
      this.pushBuffer.push(pushEvent);
    }
    return pushEvent;
  }
  /**
   * Overridable message hook
   *
   * Receives all events for specialized message handling before dispatching to the channel callbacks.
   * Must return the payload, modified or unmodified.
   *
   * @internal
   */
  _onMessage(_event, payload, _ref) {
    return payload;
  }
  /** @internal */
  _isMember(topic) {
    return this.topic === topic;
  }
  /** @internal */
  _joinRef() {
    return this.joinPush.ref;
  }
  /** @internal */
  _trigger(type, payload, ref) {
    var _a, _b;
    const typeLower = type.toLocaleLowerCase();
    const {
      close,
      error,
      leave,
      join
    } = _constants.CHANNEL_EVENTS;
    const events = [close, error, leave, join];
    if (ref && events.indexOf(typeLower) >= 0 && ref !== this._joinRef()) {
      return;
    }
    let handledPayload = this._onMessage(typeLower, payload, ref);
    if (payload && !handledPayload) {
      throw 'channel onMessage callbacks must return the payload, modified or unmodified';
    }
    if (['insert', 'update', 'delete'].includes(typeLower)) {
      (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.filter(bind => {
        var _a, _b, _c;
        return ((_a = bind.filter) === null || _a === void 0 ? void 0 : _a.event) === '*' || ((_c = (_b = bind.filter) === null || _b === void 0 ? void 0 : _b.event) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase()) === typeLower;
      }).map(bind => bind.callback(handledPayload, ref));
    } else {
      (_b = this.bindings[typeLower]) === null || _b === void 0 ? void 0 : _b.filter(bind => {
        var _a, _b, _c, _d, _e, _f;
        if (['broadcast', 'presence', 'postgres_changes'].includes(typeLower)) {
          if ('id' in bind) {
            const bindId = bind.id;
            const bindEvent = (_a = bind.filter) === null || _a === void 0 ? void 0 : _a.event;
            return bindId && ((_b = payload.ids) === null || _b === void 0 ? void 0 : _b.includes(bindId)) && (bindEvent === '*' || (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) === ((_c = payload.data) === null || _c === void 0 ? void 0 : _c.type.toLocaleLowerCase()));
          } else {
            const bindEvent = (_e = (_d = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _d === void 0 ? void 0 : _d.event) === null || _e === void 0 ? void 0 : _e.toLocaleLowerCase();
            return bindEvent === '*' || bindEvent === ((_f = payload === null || payload === void 0 ? void 0 : payload.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase());
          }
        } else {
          return bind.type.toLocaleLowerCase() === typeLower;
        }
      }).map(bind => {
        if (typeof handledPayload === 'object' && 'ids' in handledPayload) {
          const postgresChanges = handledPayload.data;
          const {
            schema,
            table,
            commit_timestamp,
            type,
            errors
          } = postgresChanges;
          const enrichedPayload = {
            schema: schema,
            table: table,
            commit_timestamp: commit_timestamp,
            eventType: type,
            new: {},
            old: {},
            errors: errors
          };
          handledPayload = Object.assign(Object.assign({}, enrichedPayload), this._getPayloadRecords(postgresChanges));
        }
        bind.callback(handledPayload, ref);
      });
    }
  }
  /** @internal */
  _isClosed() {
    return this.state === _constants.CHANNEL_STATES.closed;
  }
  /** @internal */
  _isJoined() {
    return this.state === _constants.CHANNEL_STATES.joined;
  }
  /** @internal */
  _isJoining() {
    return this.state === _constants.CHANNEL_STATES.joining;
  }
  /** @internal */
  _isLeaving() {
    return this.state === _constants.CHANNEL_STATES.leaving;
  }
  /** @internal */
  _replyEventName(ref) {
    return `chan_reply_${ref}`;
  }
  /** @internal */
  _on(type, filter, callback) {
    const typeLower = type.toLocaleLowerCase();
    const binding = {
      type: typeLower,
      filter: filter,
      callback: callback
    };
    if (this.bindings[typeLower]) {
      this.bindings[typeLower].push(binding);
    } else {
      this.bindings[typeLower] = [binding];
    }
    return this;
  }
  /** @internal */
  _off(type, filter) {
    const typeLower = type.toLocaleLowerCase();
    this.bindings[typeLower] = this.bindings[typeLower].filter(bind => {
      var _a;
      return !(((_a = bind.type) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === typeLower && RealtimeChannel.isEqual(bind.filter, filter));
    });
    return this;
  }
  /** @internal */
  static isEqual(obj1, obj2) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    }
    for (const k in obj1) {
      if (obj1[k] !== obj2[k]) {
        return false;
      }
    }
    return true;
  }
  /** @internal */
  _rejoinUntilConnected() {
    this.rejoinTimer.scheduleTimeout();
    if (this.socket.isConnected()) {
      this._rejoin();
    }
  }
  /**
   * Registers a callback that will be executed when the channel closes.
   *
   * @internal
   */
  _onClose(callback) {
    this._on(_constants.CHANNEL_EVENTS.close, {}, callback);
  }
  /**
   * Registers a callback that will be executed when the channel encounteres an error.
   *
   * @internal
   */
  _onError(callback) {
    this._on(_constants.CHANNEL_EVENTS.error, {}, reason => callback(reason));
  }
  /**
   * Returns `true` if the socket is connected and the channel has been joined.
   *
   * @internal
   */
  _canPush() {
    return this.socket.isConnected() && this._isJoined();
  }
  /** @internal */
  _rejoin(timeout = this.timeout) {
    if (this._isLeaving()) {
      return;
    }
    this.socket._leaveOpenTopic(this.topic);
    this.state = _constants.CHANNEL_STATES.joining;
    this.joinPush.resend(timeout);
  }
  /** @internal */
  _getPayloadRecords(payload) {
    const records = {
      new: {},
      old: {}
    };
    if (payload.type === 'INSERT' || payload.type === 'UPDATE') {
      records.new = Transformers.convertChangeData(payload.columns, payload.record);
    }
    if (payload.type === 'UPDATE' || payload.type === 'DELETE') {
      records.old = Transformers.convertChangeData(payload.columns, payload.old_record);
    }
    return records;
  }
}
exports.default = RealtimeChannel;
},{"./lib/constants":"node_modules/@supabase/realtime-js/dist/module/lib/constants.js","./lib/push":"node_modules/@supabase/realtime-js/dist/module/lib/push.js","./lib/timer":"node_modules/@supabase/realtime-js/dist/module/lib/timer.js","./RealtimePresence":"node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js","./lib/transformers":"node_modules/@supabase/realtime-js/dist/module/lib/transformers.js"}],"node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _websocket = require("websocket");
var _constants = require("./lib/constants");
var _timer = _interopRequireDefault(require("./lib/timer"));
var _serializer = _interopRequireDefault(require("./lib/serializer"));
var _RealtimeChannel = _interopRequireDefault(require("./RealtimeChannel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const noop = () => {};
class RealtimeClient {
  /**
   * Initializes the Socket.
   *
   * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
   * @param options.transport The Websocket Transport, for example WebSocket.
   * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
   * @param options.params The optional params to pass when connecting.
   * @param options.headers The optional headers to pass when connecting.
   * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
   * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
   * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
   * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
   * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
   */
  constructor(endPoint, options) {
    var _a;
    this.accessToken = null;
    this.channels = [];
    this.endPoint = '';
    this.headers = _constants.DEFAULT_HEADERS;
    this.params = {};
    this.timeout = _constants.DEFAULT_TIMEOUT;
    this.transport = _websocket.w3cwebsocket;
    this.heartbeatIntervalMs = 30000;
    this.heartbeatTimer = undefined;
    this.pendingHeartbeatRef = null;
    this.ref = 0;
    this.logger = noop;
    this.conn = null;
    this.sendBuffer = [];
    this.serializer = new _serializer.default();
    this.stateChangeCallbacks = {
      open: [],
      close: [],
      error: [],
      message: []
    };
    this.eventsPerSecondLimitMs = 100;
    this.inThrottle = false;
    this.endPoint = `${endPoint}/${_constants.TRANSPORTS.websocket}`;
    if (options === null || options === void 0 ? void 0 : options.params) this.params = options.params;
    if (options === null || options === void 0 ? void 0 : options.headers) this.headers = Object.assign(Object.assign({}, this.headers), options.headers);
    if (options === null || options === void 0 ? void 0 : options.timeout) this.timeout = options.timeout;
    if (options === null || options === void 0 ? void 0 : options.logger) this.logger = options.logger;
    if (options === null || options === void 0 ? void 0 : options.transport) this.transport = options.transport;
    if (options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs) this.heartbeatIntervalMs = options.heartbeatIntervalMs;
    const eventsPerSecond = (_a = options === null || options === void 0 ? void 0 : options.params) === null || _a === void 0 ? void 0 : _a.eventsPerSecond;
    if (eventsPerSecond) this.eventsPerSecondLimitMs = Math.floor(1000 / eventsPerSecond);
    this.reconnectAfterMs = (options === null || options === void 0 ? void 0 : options.reconnectAfterMs) ? options.reconnectAfterMs : tries => {
      return [1000, 2000, 5000, 10000][tries - 1] || 10000;
    };
    this.encode = (options === null || options === void 0 ? void 0 : options.encode) ? options.encode : (payload, callback) => {
      return callback(JSON.stringify(payload));
    };
    this.decode = (options === null || options === void 0 ? void 0 : options.decode) ? options.decode : this.serializer.decode.bind(this.serializer);
    this.reconnectTimer = new _timer.default(() => __awaiter(this, void 0, void 0, function* () {
      this.disconnect();
      this.connect();
    }), this.reconnectAfterMs);
  }
  /**
   * Connects the socket, unless already connected.
   */
  connect() {
    if (this.conn) {
      return;
    }
    this.conn = new this.transport(this._endPointURL(), [], null, this.headers);
    if (this.conn) {
      this.conn.binaryType = 'arraybuffer';
      this.conn.onopen = () => this._onConnOpen();
      this.conn.onerror = error => this._onConnError(error);
      this.conn.onmessage = event => this._onConnMessage(event);
      this.conn.onclose = event => this._onConnClose(event);
    }
  }
  /**
   * Disconnects the socket.
   *
   * @param code A numeric status code to send on disconnect.
   * @param reason A custom reason for the disconnect.
   */
  disconnect(code, reason) {
    if (this.conn) {
      this.conn.onclose = function () {}; // noop
      if (code) {
        this.conn.close(code, reason !== null && reason !== void 0 ? reason : '');
      } else {
        this.conn.close();
      }
      this.conn = null;
      // remove open handles
      this.heartbeatTimer && clearInterval(this.heartbeatTimer);
      this.reconnectTimer.reset();
    }
  }
  /**
   * Returns all created channels
   */
  getChannels() {
    return this.channels;
  }
  /**
   * Unsubscribes and removes a single channel
   * @param channel A RealtimeChannel instance
   */
  removeChannel(channel) {
    return __awaiter(this, void 0, void 0, function* () {
      const status = yield channel.unsubscribe();
      if (this.channels.length === 0) {
        this.disconnect();
      }
      return status;
    });
  }
  /**
   * Unsubscribes and removes all channels
   */
  removeAllChannels() {
    return __awaiter(this, void 0, void 0, function* () {
      const values_1 = yield Promise.all(this.channels.map(channel => channel.unsubscribe()));
      this.disconnect();
      return values_1;
    });
  }
  /**
   * Logs the message.
   *
   * For customized logging, `this.logger` can be overridden.
   */
  log(kind, msg, data) {
    this.logger(kind, msg, data);
  }
  /**
   * Returns the current state of the socket.
   */
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case _constants.SOCKET_STATES.connecting:
        return _constants.CONNECTION_STATE.Connecting;
      case _constants.SOCKET_STATES.open:
        return _constants.CONNECTION_STATE.Open;
      case _constants.SOCKET_STATES.closing:
        return _constants.CONNECTION_STATE.Closing;
      default:
        return _constants.CONNECTION_STATE.Closed;
    }
  }
  /**
   * Returns `true` is the connection is open.
   */
  isConnected() {
    return this.connectionState() === _constants.CONNECTION_STATE.Open;
  }
  channel(topic, params = {
    config: {}
  }) {
    if (!this.isConnected()) {
      this.connect();
    }
    const chan = new _RealtimeChannel.default(`realtime:${topic}`, params, this);
    this.channels.push(chan);
    return chan;
  }
  /**
   * Push out a message if the socket is connected.
   *
   * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
   */
  push(data) {
    const {
      topic,
      event,
      payload,
      ref
    } = data;
    let callback = () => {
      this.encode(data, result => {
        var _a;
        (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(result);
      });
    };
    this.log('push', `${topic} ${event} (${ref})`, payload);
    if (this.isConnected()) {
      if (['broadcast', 'presence', 'postgres_changes'].includes(event)) {
        const isThrottled = this._throttle(callback)();
        if (isThrottled) {
          return 'rate limited';
        }
      } else {
        callback();
      }
    } else {
      this.sendBuffer.push(callback);
    }
  }
  /**
   * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
   *
   * @param token A JWT string.
   */
  setAuth(token) {
    this.accessToken = token;
    this.channels.forEach(channel => {
      token && channel.updateJoinPayload({
        access_token: token
      });
      if (channel.joinedOnce && channel._isJoined()) {
        channel._push(_constants.CHANNEL_EVENTS.access_token, {
          access_token: token
        });
      }
    });
  }
  /**
   * Return the next message ref, accounting for overflows
   *
   * @internal
   */
  _makeRef() {
    let newRef = this.ref + 1;
    if (newRef === this.ref) {
      this.ref = 0;
    } else {
      this.ref = newRef;
    }
    return this.ref.toString();
  }
  /**
   * Unsubscribe from channels with the specified topic.
   *
   * @internal
   */
  _leaveOpenTopic(topic) {
    let dupChannel = this.channels.find(c => c.topic === topic && (c._isJoined() || c._isJoining()));
    if (dupChannel) {
      this.log('transport', `leaving duplicate topic "${topic}"`);
      dupChannel.unsubscribe();
    }
  }
  /**
   * Removes a subscription from the socket.
   *
   * @param channel An open subscription.
   *
   * @internal
   */
  _remove(channel) {
    this.channels = this.channels.filter(c => c._joinRef() !== channel._joinRef());
  }
  /**
   * Returns the URL of the websocket.
   *
   * @internal
   */
  _endPointURL() {
    return this._appendParams(this.endPoint, Object.assign({}, this.params, {
      vsn: _constants.VSN
    }));
  }
  /** @internal */
  _onConnMessage(rawMessage) {
    this.decode(rawMessage.data, msg => {
      let {
        topic,
        event,
        payload,
        ref
      } = msg;
      if (ref && ref === this.pendingHeartbeatRef || event === (payload === null || payload === void 0 ? void 0 : payload.type)) {
        this.pendingHeartbeatRef = null;
      }
      this.log('receive', `${payload.status || ''} ${topic} ${event} ${ref && '(' + ref + ')' || ''}`, payload);
      this.channels.filter(channel => channel._isMember(topic)).forEach(channel => channel._trigger(event, payload, ref));
      this.stateChangeCallbacks.message.forEach(callback => callback(msg));
    });
  }
  /** @internal */
  _onConnOpen() {
    this.log('transport', `connected to ${this._endPointURL()}`);
    this._flushSendBuffer();
    this.reconnectTimer.reset();
    this.heartbeatTimer && clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = setInterval(() => this._sendHeartbeat(), this.heartbeatIntervalMs);
    this.stateChangeCallbacks.open.forEach(callback => callback());
  }
  /** @internal */
  _onConnClose(event) {
    this.log('transport', 'close', event);
    this._triggerChanError();
    this.heartbeatTimer && clearInterval(this.heartbeatTimer);
    this.reconnectTimer.scheduleTimeout();
    this.stateChangeCallbacks.close.forEach(callback => callback(event));
  }
  /** @internal */
  _onConnError(error) {
    this.log('transport', error.message);
    this._triggerChanError();
    this.stateChangeCallbacks.error.forEach(callback => callback(error));
  }
  /** @internal */
  _triggerChanError() {
    this.channels.forEach(channel => channel._trigger(_constants.CHANNEL_EVENTS.error));
  }
  /** @internal */
  _appendParams(url, params) {
    if (Object.keys(params).length === 0) {
      return url;
    }
    const prefix = url.match(/\?/) ? '&' : '?';
    const query = new URLSearchParams(params);
    return `${url}${prefix}${query}`;
  }
  /** @internal */
  _flushSendBuffer() {
    if (this.isConnected() && this.sendBuffer.length > 0) {
      this.sendBuffer.forEach(callback => callback());
      this.sendBuffer = [];
    }
  }
  /** @internal */
  _sendHeartbeat() {
    var _a;
    if (!this.isConnected()) {
      return;
    }
    if (this.pendingHeartbeatRef) {
      this.pendingHeartbeatRef = null;
      this.log('transport', 'heartbeat timeout. Attempting to re-establish connection');
      (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close(_constants.WS_CLOSE_NORMAL, 'hearbeat timeout');
      return;
    }
    this.pendingHeartbeatRef = this._makeRef();
    this.push({
      topic: 'phoenix',
      event: 'heartbeat',
      payload: {},
      ref: this.pendingHeartbeatRef
    });
    this.setAuth(this.accessToken);
  }
  /** @internal */
  _throttle(callback, eventsPerSecondLimitMs = this.eventsPerSecondLimitMs) {
    return () => {
      if (this.inThrottle) return true;
      callback();
      if (eventsPerSecondLimitMs > 0) {
        this.inThrottle = true;
        setTimeout(() => {
          this.inThrottle = false;
        }, eventsPerSecondLimitMs);
      }
      return false;
    };
  }
}
exports.default = RealtimeClient;
},{"websocket":"node_modules/websocket/lib/browser.js","./lib/constants":"node_modules/@supabase/realtime-js/dist/module/lib/constants.js","./lib/timer":"node_modules/@supabase/realtime-js/dist/module/lib/timer.js","./lib/serializer":"node_modules/@supabase/realtime-js/dist/module/lib/serializer.js","./RealtimeChannel":"node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js"}],"node_modules/@supabase/realtime-js/dist/module/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "REALTIME_LISTEN_TYPES", {
  enumerable: true,
  get: function () {
    return _RealtimeChannel.REALTIME_LISTEN_TYPES;
  }
});
Object.defineProperty(exports, "REALTIME_POSTGRES_CHANGES_LISTEN_EVENT", {
  enumerable: true,
  get: function () {
    return _RealtimeChannel.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
  }
});
Object.defineProperty(exports, "REALTIME_PRESENCE_LISTEN_EVENTS", {
  enumerable: true,
  get: function () {
    return _RealtimePresence.REALTIME_PRESENCE_LISTEN_EVENTS;
  }
});
Object.defineProperty(exports, "REALTIME_SUBSCRIBE_STATES", {
  enumerable: true,
  get: function () {
    return _RealtimeChannel.REALTIME_SUBSCRIBE_STATES;
  }
});
Object.defineProperty(exports, "RealtimeChannel", {
  enumerable: true,
  get: function () {
    return _RealtimeChannel.default;
  }
});
Object.defineProperty(exports, "RealtimeClient", {
  enumerable: true,
  get: function () {
    return _RealtimeClient.default;
  }
});
Object.defineProperty(exports, "RealtimePresence", {
  enumerable: true,
  get: function () {
    return _RealtimePresence.default;
  }
});
var _RealtimeClient = _interopRequireDefault(require("./RealtimeClient"));
var _RealtimeChannel = _interopRequireWildcard(require("./RealtimeChannel"));
var _RealtimePresence = _interopRequireWildcard(require("./RealtimePresence"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./RealtimeClient":"node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js","./RealtimeChannel":"node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js","./RealtimePresence":"node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js"}],"node_modules/@supabase/storage-js/dist/module/lib/errors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StorageUnknownError = exports.StorageError = exports.StorageApiError = void 0;
exports.isStorageError = isStorageError;
class StorageError extends Error {
  constructor(message) {
    super(message);
    this.__isStorageError = true;
    this.name = 'StorageError';
  }
}
exports.StorageError = StorageError;
function isStorageError(error) {
  return typeof error === 'object' && error !== null && '__isStorageError' in error;
}
class StorageApiError extends StorageError {
  constructor(message, status) {
    super(message);
    this.name = 'StorageApiError';
    this.status = status;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status
    };
  }
}
exports.StorageApiError = StorageApiError;
class StorageUnknownError extends StorageError {
  constructor(message, originalError) {
    super(message);
    this.name = 'StorageUnknownError';
    this.originalError = originalError;
  }
}
exports.StorageUnknownError = StorageUnknownError;
},{}],"node_modules/@supabase/storage-js/dist/module/lib/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveResponse = exports.resolveFetch = void 0;
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const resolveFetch = customFetch => {
  let _fetch;
  if (customFetch) {
    _fetch = customFetch;
  } else if (typeof fetch === 'undefined') {
    _fetch = (...args) => __awaiter(void 0, void 0, void 0, function* () {
      return yield (yield require("_bundle_loader")(require.resolve('cross-fetch'))).fetch(...args);
    });
  } else {
    _fetch = fetch;
  }
  return (...args) => _fetch(...args);
};
exports.resolveFetch = resolveFetch;
const resolveResponse = () => __awaiter(void 0, void 0, void 0, function* () {
  if (typeof Response === 'undefined') {
    return (yield require("_bundle_loader")(require.resolve('cross-fetch'))).Response;
  }
  return Response;
});
exports.resolveResponse = resolveResponse;
},{"_bundle_loader":"../../../../AppData/Roaming/nvm/v18.15.0/node_modules/parcel-bundler/src/builtins/bundle-loader.js","cross-fetch":[["browser-ponyfill.74474147.js","node_modules/cross-fetch/dist/browser-ponyfill.js"],"browser-ponyfill.74474147.js.map","node_modules/cross-fetch/dist/browser-ponyfill.js"]}],"node_modules/@supabase/storage-js/dist/module/lib/fetch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.post = post;
exports.put = put;
exports.remove = remove;
var _errors = require("./errors");
var _helpers = require("./helpers");
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const _getErrorMessage = err => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
const handleError = (error, reject) => __awaiter(void 0, void 0, void 0, function* () {
  const Res = yield (0, _helpers.resolveResponse)();
  if (error instanceof Res) {
    error.json().then(err => {
      reject(new _errors.StorageApiError(_getErrorMessage(err), error.status || 500));
    }).catch(err => {
      reject(new _errors.StorageUnknownError(_getErrorMessage(err), err));
    });
  } else {
    reject(new _errors.StorageUnknownError(_getErrorMessage(error), error));
  }
});
const _getRequestParams = (method, options, parameters, body) => {
  const params = {
    method,
    headers: (options === null || options === void 0 ? void 0 : options.headers) || {}
  };
  if (method === 'GET') {
    return params;
  }
  params.headers = Object.assign({
    'Content-Type': 'application/json'
  }, options === null || options === void 0 ? void 0 : options.headers);
  params.body = JSON.stringify(body);
  return Object.assign(Object.assign({}, params), parameters);
};
function _handleRequest(fetcher, method, url, options, parameters, body) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      fetcher(url, _getRequestParams(method, options, parameters, body)).then(result => {
        if (!result.ok) throw result;
        if (options === null || options === void 0 ? void 0 : options.noResolveJson) return result;
        return result.json();
      }).then(data => resolve(data)).catch(error => handleError(error, reject));
    });
  });
}
function get(fetcher, url, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, 'GET', url, options, parameters);
  });
}
function post(fetcher, url, body, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, 'POST', url, options, parameters, body);
  });
}
function put(fetcher, url, body, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, 'PUT', url, options, parameters, body);
  });
}
function remove(fetcher, url, body, options, parameters) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, 'DELETE', url, options, parameters, body);
  });
}
},{"./errors":"node_modules/@supabase/storage-js/dist/module/lib/errors.js","./helpers":"node_modules/@supabase/storage-js/dist/module/lib/helpers.js"}],"node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _errors = require("../lib/errors");
var _fetch = require("../lib/fetch");
var _helpers = require("../lib/helpers");
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const DEFAULT_SEARCH_OPTIONS = {
  limit: 100,
  offset: 0,
  sortBy: {
    column: 'name',
    order: 'asc'
  }
};
const DEFAULT_FILE_OPTIONS = {
  cacheControl: '3600',
  contentType: 'text/plain;charset=UTF-8',
  upsert: false
};
class StorageFileApi {
  constructor(url, headers = {}, bucketId, fetch) {
    this.url = url;
    this.headers = headers;
    this.bucketId = bucketId;
    this.fetch = (0, _helpers.resolveFetch)(fetch);
  }
  /**
   * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
   *
   * @param method HTTP method.
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  uploadOrUpdate(method, path, fileBody, fileOptions) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let body;
        const options = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
        const headers = Object.assign(Object.assign({}, this.headers), method === 'POST' && {
          'x-upsert': String(options.upsert)
        });
        if (typeof Blob !== 'undefined' && fileBody instanceof Blob) {
          body = new FormData();
          body.append('cacheControl', options.cacheControl);
          body.append('', fileBody);
        } else if (typeof FormData !== 'undefined' && fileBody instanceof FormData) {
          body = fileBody;
          body.append('cacheControl', options.cacheControl);
        } else {
          body = fileBody;
          headers['cache-control'] = `max-age=${options.cacheControl}`;
          headers['content-type'] = options.contentType;
        }
        const cleanPath = this._removeEmptyFolders(path);
        const _path = this._getFinalPath(cleanPath);
        const res = yield this.fetch(`${this.url}/object/${_path}`, Object.assign({
          method,
          body: body,
          headers
        }, (options === null || options === void 0 ? void 0 : options.duplex) ? {
          duplex: options.duplex
        } : {}));
        if (res.ok) {
          return {
            data: {
              path: cleanPath
            },
            error: null
          };
        } else {
          const error = yield res.json();
          return {
            data: null,
            error
          };
        }
      } catch (error) {
        if ((0, _errors.isStorageError)(error)) {
          return {
            data: null,
            error
          };
        }
        throw error;
      }
    });
  }
  /**
   * Uploads a file to an existing bucket.
   *
   * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  upload(path, fileBody, fileOptions) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.uploadOrUpdate('POST', path, fileBody, fileOptions);
    });
  }
  /**
   * Upload a file with a token generated from `createSignedUploadUrl`.
   * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param token The token generated from `createSignedUploadUrl`
   * @param fileBody The body of the file to be stored in the bucket.
   */
  uploadToSignedUrl(path, token, fileBody, fileOptions) {
    return __awaiter(this, void 0, void 0, function* () {
      const cleanPath = this._removeEmptyFolders(path);
      const _path = this._getFinalPath(cleanPath);
      const url = new URL(this.url + `/object/upload/sign/${_path}`);
      url.searchParams.set('token', token);
      try {
        let body;
        const options = Object.assign({
          upsert: DEFAULT_FILE_OPTIONS.upsert
        }, fileOptions);
        const headers = Object.assign(Object.assign({}, this.headers), {
          'x-upsert': String(options.upsert)
        });
        if (typeof Blob !== 'undefined' && fileBody instanceof Blob) {
          body = new FormData();
          body.append('cacheControl', options.cacheControl);
          body.append('', fileBody);
        } else if (typeof FormData !== 'undefined' && fileBody instanceof FormData) {
          body = fileBody;
          body.append('cacheControl', options.cacheControl);
        } else {
          body = fileBody;
          headers['cache-control'] = `max-age=${options.cacheControl}`;
          headers['content-type'] = options.contentType;
        }
        const res = yield this.fetch(url.toString(), {
          method: 'PUT',
          body: body,
          headers
        });
        if (res.ok) {
          return {
            data: {
              path: cleanPath
            },
            error: null
          };
        } else {
          const error = yield res.json();
          return {
            data: null,
            error
          };
        }
      } catch (error) {
        if ((0, _errors.isStorageError)(error)) {
          return {
            data: null,
            error
          };
        }
        throw error;
      }
    });
  }
  /**
   * Creates a signed upload URL.
   * Signed upload URLs can be used to upload files to the bucket without further authentication.
   * They are valid for one minute.
   * @param path The file path, including the current file name. For example `folder/image.png`.
   */
  createSignedUploadUrl(path) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let _path = this._getFinalPath(path);
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/object/upload/sign/${_path}`, {}, {
          headers: this.headers
        });
        const url = new URL(this.url + data.url);
        const token = url.searchParams.get('token');
        if (!token) {
          throw new _errors.StorageError('No token returned by API');
        }
        return {
          data: {
            signedUrl: url.toString(),
            path,
            token
          },
          error: null
        };
      } catch (error) {
        if ((0, _errors.isStorageError)(error)) {
          return {
            data: null,
            error
          };
        }
        throw error;
      }
    });
  }
  /**
   * Replaces an existing file at the specified path with a new one.
   *
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  update(path, fileBody, fileOptions) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.uploadOrUpdate('PUT', path, fileBody, fileOptions);
    });
  }
  /**
   * Moves an existing file to a new path in the same bucket.
   *
   * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
   * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
   */
  move(fromPath, toPath) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/object/move`, {
          bucketId: this.bucketId,
          sourceKey: fromPath,
          destinationKey: toPath
        }, {
          headers: this.headers
        });
        return {
          data,
          error: null
        };
      } catch (error) {
        if ((0, _errors.isStorageError)(error)) {
          return {
            data: null,
            error
          };
        }
        throw error;
      }
    });
  }
  /**
   * Copies an existing file to a new path in the same bucket.
   *
   * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
   * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
   */
  copy(fromPath, toPath) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/object/copy`, {
          bucketId: this.bucketId,
          sourceKey: fromPath,
          destinationKey: toPath
        }, {
          headers: this.headers
        });
        return {
          data: {
            path: data.Key
          },
          error: null
        };
      } catch (error) {
        if ((0, _errors.isStorageError)(error)) {
          return {
            data: null,
            error
          };
        }
        throw error;
      }
    });
  }
  /**
   * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
   *
   * @param path The file path, including the current file name. For example `folder/image.png`.
   * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
   * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   * @param options.transform Transform the asset before serving it to the client.
   */
  createSignedUrl(path, expiresIn, options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let _path = this._getFinalPath(path);
        let data = yield (0, _fetch.post)(this.fetch, `${this.url}/object/sign/${_path}`, Object.assign({
          expiresIn
        }, (options === null || options === void 0 ? void 0 : options.transform) ? {
          transform: options.transform
        } : {}), {
          headers: this.headers
        });
        const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? '' : options.download}` : '';
        const signedUrl = encodeURI(`${this.url}${data.signedURL}${downloadQueryParam}`);
        data = {
          signedUrl
        };
        return {
          data,
          error: null
        };
      } catch (error) {
        if ((0, _errors.isStorageError)(error)) {
          return {
            data: null,
            error
          };
        }
        throw error;
      }
    });
  }
  /**
   * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
   *
   * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
   * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
   * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   */
  createSignedUrls(paths, expiresIn, options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/object/sign/${this.bucketId}`, {
          expiresIn,
          paths
        }, {
          headers: this.headers
        });
        const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? '' : options.download}` : '';
        return {
          data: data.map(datum => Object.assign(Object.assign({}, datum), {
            signedUrl: datum.signedURL ? encodeURI(`${this.url}${datum.signedURL}${downloadQueryParam}`) : null
          })),
          error: null
        };
      } catch (error) {
        if ((0, _errors.isStorageError)(error)) {
          return {
            data: null,
            error
          };
        }
        throw error;
      }
    });
  }
  /**
   * Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
   *
   * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
   * @param options.transform Transform the asset before serving it to the client.
   */
  download(path, options) {
    return __awaiter(this, void 0, void 0, function* () {
      const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== 'undefined';
      const renderPath = wantsTransformation ? 'render/image/authenticated' : 'object';
      const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
      const queryString = transformationQuery ? `?${transformationQuery}` : '';
      try {
        const _path = this._getFinalPath(path);
        const res = yield (0, _fetch.get)(this.fetch, `${this.url}/${renderPath}/${_path}${queryString}`, {
          headers: this.headers,
          noResolveJson: true
        });
        const data = yield res.blob();
        return {
          data,
          error: null
        };
      } catch (error) {
        if ((0, _errors.isStorageError)(error)) {
          return {
            data: null,
            error
          };
        }
        throw error;
      }
    });
  }
  /**
   * A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
   * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
   *
   * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
   * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   * @param options.transform Transform the asset before serving it to the client.
   */
  getPublicUrl(path, options) {
    const _path = this._getFinalPath(path);
    const _queryString = [];
    const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `download=${options.download === true ? '' : options.download}` : '';
    if (downloadQueryParam !== '') {
      _queryString.push(downloadQueryParam);
    }
    const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== 'undefined';
    const renderPath = wantsTransformation ? 'render/image' : 'object';
    const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
    if (transformationQuery !== '') {
      _queryString.push(transformationQuery);
    }
    let queryString = _queryString.join('&');
    if (queryString !== '') {
      queryString = `?${queryString}`;
    }
    return {
      data: {
        publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}${queryString}`)
      }
    };
  }
  /**
   * Deletes files within the same bucket
   *
   * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
   */
  remove(paths) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.remove)(this.fetch, `${this.url}/object/${this.bucketId}`, {
          prefixes: paths
        }, {
          headers: this.headers
        });
        return {
          data,
          error: null
        };
      } catch (error) {
        if ((0, _errors.isStorageError)(error)) {
          return {
            data: null,
            error
          };
        }
        throw error;
      }
    });
  }
  /**
   * Get file metadata
   * @param id the file id to retrieve metadata
   */
  // async getMetadata(
  //   id: string
  // ): Promise<
  //   | {
  //       data: Metadata
  //       error: null
  //     }
  //   | {
  //       data: null
  //       error: StorageError
  //     }
  // > {
  //   try {
  //     const data = await get(this.fetch, `${this.url}/metadata/${id}`, { headers: this.headers })
  //     return { data, error: null }
  //   } catch (error) {
  //     if (isStorageError(error)) {
  //       return { data: null, error }
  //     }
  //     throw error
  //   }
  // }
  /**
   * Update file metadata
   * @param id the file id to update metadata
   * @param meta the new file metadata
   */
  // async updateMetadata(
  //   id: string,
  //   meta: Metadata
  // ): Promise<
  //   | {
  //       data: Metadata
  //       error: null
  //     }
  //   | {
  //       data: null
  //       error: StorageError
  //     }
  // > {
  //   try {
  //     const data = await post(
  //       this.fetch,
  //       `${this.url}/metadata/${id}`,
  //       { ...meta },
  //       { headers: this.headers }
  //     )
  //     return { data, error: null }
  //   } catch (error) {
  //     if (isStorageError(error)) {
  //       return { data: null, error }
  //     }
  //     throw error
  //   }
  // }
  /**
   * Lists all the files within a bucket.
   * @param path The folder path.
   */
  list(path, options, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const body = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options), {
          prefix: path || ''
        });
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/object/list/${this.bucketId}`, body, {
          headers: this.headers
        }, parameters);
        return {
          data,
          error: null
        };
      } catch (error) {
        if ((0, _errors.isStorageError)(error)) {
          return {
            data: null,
            error
          };
        }
        throw error;
      }
    });
  }
  _getFinalPath(path) {
    return `${this.bucketId}/${path}`;
  }
  _removeEmptyFolders(path) {
    return path.replace(/^\/|\/$/g, '').replace(/\/+/g, '/');
  }
  transformOptsToQueryString(transform) {
    const params = [];
    if (transform.width) {
      params.push(`width=${transform.width}`);
    }
    if (transform.height) {
      params.push(`height=${transform.height}`);
    }
    if (transform.resize) {
      params.push(`resize=${transform.resize}`);
    }
    if (transform.format) {
      params.push(`format=${transform.format}`);
    }
    if (transform.quality) {
      params.push(`quality=${transform.quality}`);
    }
    return params.join('&');
  }
}
exports.default = StorageFileApi;
},{"../lib/errors":"node_modules/@supabase/storage-js/dist/module/lib/errors.js","../lib/fetch":"node_modules/@supabase/storage-js/dist/module/lib/fetch.js","../lib/helpers":"node_modules/@supabase/storage-js/dist/module/lib/helpers.js"}],"node_modules/@supabase/storage-js/dist/module/lib/version.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
// generated by genversion
const version = '2.5.1';
exports.version = version;
},{}],"node_modules/@supabase/storage-js/dist/module/lib/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_HEADERS = void 0;
var _version = require("./version");
const DEFAULT_HEADERS = {
  'X-Client-Info': `storage-js/${_version.version}`
};
exports.DEFAULT_HEADERS = DEFAULT_HEADERS;
},{"./version":"node_modules/@supabase/storage-js/dist/module/lib/version.js"}],"node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _constants = require("../lib/constants");
var _errors = require("../lib/errors");
var _fetch = require("../lib/fetch");
var _helpers = require("../lib/helpers");
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class StorageBucketApi {
  constructor(url, headers = {}, fetch) {
    this.url = url;
    this.headers = Object.assign(Object.assign({}, _constants.DEFAULT_HEADERS), headers);
    this.fetch = (0, _helpers.resolveFetch)(fetch);
  }
  /**
   * Retrieves the details of all Storage buckets within an existing project.
   */
  listBuckets() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.get)(this.fetch, `${this.url}/bucket`, {
          headers: this.headers
        });
        return {
          data,
          error: null
        };
      } catch (error) {
        if ((0, _errors.isStorageError)(error)) {
          return {
            data: null,
            error
          };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves the details of an existing Storage bucket.
   *
   * @param id The unique identifier of the bucket you would like to retrieve.
   */
  getBucket(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.get)(this.fetch, `${this.url}/bucket/${id}`, {
          headers: this.headers
        });
        return {
          data,
          error: null
        };
      } catch (error) {
        if ((0, _errors.isStorageError)(error)) {
          return {
            data: null,
            error
          };
        }
        throw error;
      }
    });
  }
  /**
   * Creates a new Storage bucket
   *
   * @param id A unique identifier for the bucket you are creating.
   * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
   * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
   * The global file size limit takes precedence over this value.
   * The default value is null, which doesn't set a per bucket file size limit.
   * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
   * The default value is null, which allows files with all mime types to be uploaded.
   * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
   * @returns newly created bucket id
   */
  createBucket(id, options = {
    public: false
  }) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/bucket`, {
          id,
          name: id,
          public: options.public,
          file_size_limit: options.fileSizeLimit,
          allowed_mime_types: options.allowedMimeTypes
        }, {
          headers: this.headers
        });
        return {
          data,
          error: null
        };
      } catch (error) {
        if ((0, _errors.isStorageError)(error)) {
          return {
            data: null,
            error
          };
        }
        throw error;
      }
    });
  }
  /**
   * Updates a Storage bucket
   *
   * @param id A unique identifier for the bucket you are updating.
   * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
   * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
   * The global file size limit takes precedence over this value.
   * The default value is null, which doesn't set a per bucket file size limit.
   * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
   * The default value is null, which allows files with all mime types to be uploaded.
   * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
   */
  updateBucket(id, options) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.put)(this.fetch, `${this.url}/bucket/${id}`, {
          id,
          name: id,
          public: options.public,
          file_size_limit: options.fileSizeLimit,
          allowed_mime_types: options.allowedMimeTypes
        }, {
          headers: this.headers
        });
        return {
          data,
          error: null
        };
      } catch (error) {
        if ((0, _errors.isStorageError)(error)) {
          return {
            data: null,
            error
          };
        }
        throw error;
      }
    });
  }
  /**
   * Removes all objects inside a single bucket.
   *
   * @param id The unique identifier of the bucket you would like to empty.
   */
  emptyBucket(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.post)(this.fetch, `${this.url}/bucket/${id}/empty`, {}, {
          headers: this.headers
        });
        return {
          data,
          error: null
        };
      } catch (error) {
        if ((0, _errors.isStorageError)(error)) {
          return {
            data: null,
            error
          };
        }
        throw error;
      }
    });
  }
  /**
   * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
   * You must first `empty()` the bucket.
   *
   * @param id The unique identifier of the bucket you would like to delete.
   */
  deleteBucket(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const data = yield (0, _fetch.remove)(this.fetch, `${this.url}/bucket/${id}`, {}, {
          headers: this.headers
        });
        return {
          data,
          error: null
        };
      } catch (error) {
        if ((0, _errors.isStorageError)(error)) {
          return {
            data: null,
            error
          };
        }
        throw error;
      }
    });
  }
}
exports.default = StorageBucketApi;
},{"../lib/constants":"node_modules/@supabase/storage-js/dist/module/lib/constants.js","../lib/errors":"node_modules/@supabase/storage-js/dist/module/lib/errors.js","../lib/fetch":"node_modules/@supabase/storage-js/dist/module/lib/fetch.js","../lib/helpers":"node_modules/@supabase/storage-js/dist/module/lib/helpers.js"}],"node_modules/@supabase/storage-js/dist/module/StorageClient.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StorageClient = void 0;
var _StorageFileApi = _interopRequireDefault(require("./packages/StorageFileApi"));
var _StorageBucketApi = _interopRequireDefault(require("./packages/StorageBucketApi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class StorageClient extends _StorageBucketApi.default {
  constructor(url, headers = {}, fetch) {
    super(url, headers, fetch);
  }
  /**
   * Perform file operation in a bucket.
   *
   * @param id The bucket id to operate on.
   */
  from(id) {
    return new _StorageFileApi.default(this.url, this.headers, id, this.fetch);
  }
}
exports.StorageClient = StorageClient;
},{"./packages/StorageFileApi":"node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js","./packages/StorageBucketApi":"node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js"}],"node_modules/@supabase/storage-js/dist/module/lib/types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"node_modules/@supabase/storage-js/dist/module/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  StorageClient: true
};
Object.defineProperty(exports, "StorageClient", {
  enumerable: true,
  get: function () {
    return _StorageClient.StorageClient;
  }
});
var _StorageClient = require("./StorageClient");
var _types = require("./lib/types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
var _errors = require("./lib/errors");
Object.keys(_errors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _errors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _errors[key];
    }
  });
});
},{"./StorageClient":"node_modules/@supabase/storage-js/dist/module/StorageClient.js","./lib/types":"node_modules/@supabase/storage-js/dist/module/lib/types.js","./lib/errors":"node_modules/@supabase/storage-js/dist/module/lib/errors.js"}],"node_modules/@supabase/supabase-js/dist/module/lib/version.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
const version = '2.31.0';
exports.version = version;
},{}],"node_modules/@supabase/supabase-js/dist/module/lib/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_HEADERS = void 0;
var _version = require("./version");
// constants.ts

const DEFAULT_HEADERS = {
  'X-Client-Info': `supabase-js/${_version.version}`
};
exports.DEFAULT_HEADERS = DEFAULT_HEADERS;
},{"./version":"node_modules/@supabase/supabase-js/dist/module/lib/version.js"}],"node_modules/@supabase/supabase-js/dist/module/lib/fetch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveHeadersConstructor = exports.resolveFetch = exports.fetchWithAuth = void 0;
var _crossFetch = _interopRequireWildcard(require("cross-fetch"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const resolveFetch = customFetch => {
  let _fetch;
  if (customFetch) {
    _fetch = customFetch;
  } else if (typeof fetch === 'undefined') {
    _fetch = _crossFetch.default;
  } else {
    _fetch = fetch;
  }
  return (...args) => _fetch(...args);
};
exports.resolveFetch = resolveFetch;
const resolveHeadersConstructor = () => {
  if (typeof Headers === 'undefined') {
    return _crossFetch.Headers;
  }
  return Headers;
};
exports.resolveHeadersConstructor = resolveHeadersConstructor;
const fetchWithAuth = (supabaseKey, getAccessToken, customFetch) => {
  const fetch = resolveFetch(customFetch);
  const HeadersConstructor = resolveHeadersConstructor();
  return (input, init) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const accessToken = (_a = yield getAccessToken()) !== null && _a !== void 0 ? _a : supabaseKey;
    let headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
    if (!headers.has('apikey')) {
      headers.set('apikey', supabaseKey);
    }
    if (!headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return fetch(input, Object.assign(Object.assign({}, init), {
      headers
    }));
  });
};
exports.fetchWithAuth = fetchWithAuth;
},{"cross-fetch":"node_modules/cross-fetch/dist/browser-ponyfill.js"}],"node_modules/@supabase/supabase-js/dist/module/lib/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applySettingDefaults = applySettingDefaults;
exports.isBrowser = void 0;
exports.stripTrailingSlash = stripTrailingSlash;
exports.uuid = uuid;
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
function stripTrailingSlash(url) {
  return url.replace(/\/$/, '');
}
const isBrowser = () => typeof window !== 'undefined';
exports.isBrowser = isBrowser;
function applySettingDefaults(options, defaults) {
  const {
    db: dbOptions,
    auth: authOptions,
    realtime: realtimeOptions,
    global: globalOptions
  } = options;
  const {
    db: DEFAULT_DB_OPTIONS,
    auth: DEFAULT_AUTH_OPTIONS,
    realtime: DEFAULT_REALTIME_OPTIONS,
    global: DEFAULT_GLOBAL_OPTIONS
  } = defaults;
  return {
    db: Object.assign(Object.assign({}, DEFAULT_DB_OPTIONS), dbOptions),
    auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), authOptions),
    realtime: Object.assign(Object.assign({}, DEFAULT_REALTIME_OPTIONS), realtimeOptions),
    global: Object.assign(Object.assign({}, DEFAULT_GLOBAL_OPTIONS), globalOptions)
  };
}
},{}],"node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Deferred = void 0;
exports.decodeBase64URL = decodeBase64URL;
exports.decodeJWTPayload = decodeJWTPayload;
exports.expiresAt = expiresAt;
exports.generatePKCEChallenge = generatePKCEChallenge;
exports.generatePKCEVerifier = generatePKCEVerifier;
exports.isBrowser = exports.getItemAsync = void 0;
exports.isInStackGuard = isInStackGuard;
exports.looksLikeFetchResponse = void 0;
exports.parseParametersFromURL = parseParametersFromURL;
exports.resolveFetch = exports.removeItemAsync = void 0;
exports.retryable = retryable;
exports.setItemAsync = void 0;
exports.sleep = sleep;
exports.stackGuard = stackGuard;
exports.stackGuardsSupported = stackGuardsSupported;
exports.supportsLocalStorage = void 0;
exports.uuid = uuid;
function expiresAt(expiresIn) {
  const timeNow = Math.round(Date.now() / 1000);
  return timeNow + expiresIn;
}
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0,
      v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
const isBrowser = () => typeof document !== 'undefined';
exports.isBrowser = isBrowser;
const localStorageWriteTests = {
  tested: false,
  writable: false
};
/**
 * Checks whether localStorage is supported on this browser.
 */
const supportsLocalStorage = () => {
  if (!isBrowser()) {
    return false;
  }
  try {
    if (typeof globalThis.localStorage !== 'object') {
      return false;
    }
  } catch (e) {
    // DOM exception when accessing `localStorage`
    return false;
  }
  if (localStorageWriteTests.tested) {
    return localStorageWriteTests.writable;
  }
  const randomKey = `lswt-${Math.random()}${Math.random()}`;
  try {
    globalThis.localStorage.setItem(randomKey, randomKey);
    globalThis.localStorage.removeItem(randomKey);
    localStorageWriteTests.tested = true;
    localStorageWriteTests.writable = true;
  } catch (e) {
    // localStorage can't be written to
    // https://www.chromium.org/for-testers/bug-reporting-guidelines/uncaught-securityerror-failed-to-read-the-localstorage-property-from-window-access-is-denied-for-this-document
    localStorageWriteTests.tested = true;
    localStorageWriteTests.writable = false;
  }
  return localStorageWriteTests.writable;
};
/**
 * Extracts parameters encoded in the URL both in the query and fragment.
 */
exports.supportsLocalStorage = supportsLocalStorage;
function parseParametersFromURL(href) {
  const result = {};
  const url = new URL(href);
  if (url.hash && url.hash[0] === '#') {
    try {
      const hashSearchParams = new URLSearchParams(url.hash.substring(1));
      hashSearchParams.forEach((value, key) => {
        result[key] = value;
      });
    } catch (e) {
      // hash is not a query string
    }
  }
  // search parameters take precedence over hash parameters
  url.searchParams.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}
const resolveFetch = customFetch => {
  let _fetch;
  if (customFetch) {
    _fetch = customFetch;
  } else if (typeof fetch === 'undefined') {
    _fetch = async (...args) => await (await require("_bundle_loader")(require.resolve('cross-fetch'))).fetch(...args);
  } else {
    _fetch = fetch;
  }
  return (...args) => _fetch(...args);
};
exports.resolveFetch = resolveFetch;
const looksLikeFetchResponse = maybeResponse => {
  return typeof maybeResponse === 'object' && maybeResponse !== null && 'status' in maybeResponse && 'ok' in maybeResponse && 'json' in maybeResponse && typeof maybeResponse.json === 'function';
};
// Storage helpers
exports.looksLikeFetchResponse = looksLikeFetchResponse;
const setItemAsync = async (storage, key, data) => {
  await storage.setItem(key, JSON.stringify(data));
};
exports.setItemAsync = setItemAsync;
const getItemAsync = async (storage, key) => {
  const value = await storage.getItem(key);
  if (!value) {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch (_a) {
    return value;
  }
};
exports.getItemAsync = getItemAsync;
const removeItemAsync = async (storage, key) => {
  await storage.removeItem(key);
};
exports.removeItemAsync = removeItemAsync;
function decodeBase64URL(value) {
  const key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let base64 = '';
  let chr1, chr2, chr3;
  let enc1, enc2, enc3, enc4;
  let i = 0;
  value = value.replace('-', '+').replace('_', '/');
  while (i < value.length) {
    enc1 = key.indexOf(value.charAt(i++));
    enc2 = key.indexOf(value.charAt(i++));
    enc3 = key.indexOf(value.charAt(i++));
    enc4 = key.indexOf(value.charAt(i++));
    chr1 = enc1 << 2 | enc2 >> 4;
    chr2 = (enc2 & 15) << 4 | enc3 >> 2;
    chr3 = (enc3 & 3) << 6 | enc4;
    base64 = base64 + String.fromCharCode(chr1);
    if (enc3 != 64 && chr2 != 0) {
      base64 = base64 + String.fromCharCode(chr2);
    }
    if (enc4 != 64 && chr3 != 0) {
      base64 = base64 + String.fromCharCode(chr3);
    }
  }
  return base64;
}
/**
 * A deferred represents some asynchronous work that is not yet finished, which
 * may or may not culminate in a value.
 * Taken from: https://github.com/mike-north/types/blob/master/src/async.ts
 */
class Deferred {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;
    this.promise = new Deferred.promiseConstructor((res, rej) => {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;
      this.resolve = res;
      this.reject = rej;
    });
  }
}
exports.Deferred = Deferred;
Deferred.promiseConstructor = Promise;
// Taken from: https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
function decodeJWTPayload(token) {
  // Regex checks for base64url format
  const base64UrlRegex = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i;
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('JWT is not valid: not a JWT structure');
  }
  if (!base64UrlRegex.test(parts[1])) {
    throw new Error('JWT is not valid: payload is not in base64url format');
  }
  const base64Url = parts[1];
  return JSON.parse(decodeBase64URL(base64Url));
}
/**
 * Creates a promise that resolves to null after some time.
 */
async function sleep(time) {
  return await new Promise(accept => {
    setTimeout(() => accept(null), time);
  });
}
/**
 * Converts the provided async function into a retryable function. Each result
 * or thrown error is sent to the isRetryable function which should return true
 * if the function should run again.
 */
function retryable(fn, isRetryable) {
  const promise = new Promise((accept, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;
    (async () => {
      for (let attempt = 0; attempt < Infinity; attempt++) {
        try {
          const result = await fn(attempt);
          if (!isRetryable(attempt, null, result)) {
            accept(result);
            return;
          }
        } catch (e) {
          if (!isRetryable(attempt, e)) {
            reject(e);
            return;
          }
        }
      }
    })();
  });
  return promise;
}
function dec2hex(dec) {
  return ('0' + dec.toString(16)).substr(-2);
}
// Functions below taken from: https://stackoverflow.com/questions/63309409/creating-a-code-verifier-and-challenge-for-pkce-auth-on-spotify-api-in-reactjs
function generatePKCEVerifier() {
  const verifierLength = 56;
  const array = new Uint32Array(verifierLength);
  if (typeof crypto === 'undefined') {
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const charSetLen = charSet.length;
    let verifier = '';
    for (let i = 0; i < verifierLength; i++) {
      verifier += charSet.charAt(Math.floor(Math.random() * charSetLen));
    }
    return verifier;
  }
  crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join('');
}
async function sha256(randomString) {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(randomString);
  const hash = await crypto.subtle.digest('SHA-256', encodedData);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes).map(c => String.fromCharCode(c)).join('');
}
function base64urlencode(str) {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function generatePKCEChallenge(verifier) {
  if (typeof crypto === 'undefined') {
    console.warn('WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.');
    return verifier;
  }
  const hashed = await sha256(verifier);
  return base64urlencode(hashed);
}
const STACK_GUARD_PREFIX = `__stack_guard__`;
const STACK_GUARD_SUFFIX = `__`;
// Firefox and WebKit based browsers encode the stack entry differently, but
// they all include the function name. So instead of trying to parse the entry,
// we're only looking for the special string `__stack_guard__${guardName}__`.
// Guard names can only be letters with dashes or underscores.
//
// Example Firefox stack trace:
// ```
// __stack_guard__EXAMPLE__@debugger eval code:1:55
// @debugger eval code:1:3
// ```
//
// Example WebKit/Chrome stack trace:
// ```
// Error
//  at Object.__stack_guard__EXAMPLE__ (<anonymous>:1:55)
//  at <anonymous>:1:13
// ```
//
const STACK_ENTRY_REGEX = /__stack_guard__([a-zA-Z0-9_-]+)__/;
let STACK_GUARD_CHECKED = false;
let STACK_GUARD_CHECK_FN; // eslint-disable-line prefer-const
let STACK_GUARDS_SUPPORTED = false;
/**
 * Checks if the current caller of the function is in a {@link
 * #stackGuard} of the provided `name`. Works by looking through
 * the stack trace of an `Error` object for a special function
 * name (generated by {@link #stackGuard}).
 *
 * @param name The name of the stack guard to check for. Must be `[a-zA-Z0-9_-]` only.
 */
function isInStackGuard(name) {
  var _a, _b;
  STACK_GUARD_CHECK_FN();
  let error;
  try {
    throw new Error();
  } catch (e) {
    error = e;
  }
  const stack = (_b = (_a = error.stack) === null || _a === void 0 ? void 0 : _a.split('\n')) !== null && _b !== void 0 ? _b : [];
  for (let i = 0; i < stack.length; i += 1) {
    const entry = stack[i];
    const match = entry.match(STACK_ENTRY_REGEX);
    if (match && match[1] === name) {
      return true;
    }
  }
  return false;
}
/**
 * Creates a minification resistant stack guard, i.e. if you
 * call {@link #isInStackGuard} from within the `fn` parameter
 * function, you will always get `true` otherwise it will be
 * `false`.
 *
 * Works by dynamically defining a function name before calling
 * into `fn`, which is then parsed from the stack trace on an
 * `Error` object within {@link #isInStackGuard}.
 *
 * @param name The name of the stack guard. Must be `[a-zA-Z0-9_-]` only.
 * @param fn The async/await function to be run within the stack guard.
 */
async function stackGuard(name, fn) {
  await STACK_GUARD_CHECK_FN();
  const guardName = `${STACK_GUARD_PREFIX}${name}${STACK_GUARD_SUFFIX}`;
  const guardFunc = {
    // per ECMAScript rules, this defines a new function with the dynamic name
    // contained in the `guardName` variable
    // this function name shows up in stack traces and is resistant to mangling
    // from minification processes as it is determined at runtime
    [guardName]: async () => await fn()
  };
  // Safari does not log the name of a dynamically named function unless you
  // explicitly set the displayName
  Object.assign(guardFunc[guardName], {
    displayName: guardName
  });
  return await guardFunc[guardName]();
}
/**
 * Returns if the JavaScript engine supports stack guards. If it doesn't
 * certain features that depend on detecting recursive calls should be disabled
 * to prevent deadlocks.
 */
async function stackGuardsSupported() {
  if (STACK_GUARD_CHECKED) {
    return STACK_GUARDS_SUPPORTED;
  }
  await STACK_GUARD_CHECK_FN();
  return STACK_GUARDS_SUPPORTED;
}
let STACK_GUARD_WARNING_LOGGED = false;
// In certain cases, if this file is transpiled using an ES2015 target, or is
// running in a JS engine that does not support async/await stack traces, this
// function will log a single warning message.
STACK_GUARD_CHECK_FN = async () => {
  if (!STACK_GUARD_CHECKED) {
    STACK_GUARD_CHECKED = true;
    await stackGuard('ENV_CHECK', async () => {
      // sleeping for the next tick as Safari loses track of the async/await
      // trace beyond this point
      await sleep(0);
      const result = isInStackGuard('ENV_CHECK');
      STACK_GUARDS_SUPPORTED = result;
      if (!result && !STACK_GUARD_WARNING_LOGGED) {
        STACK_GUARD_WARNING_LOGGED = true;
        console.warn('@supabase/gotrue-js: Stack guards not supported in this environment. Generally not an issue but may point to a very conservative transpilation environment (use ES2017 or above) that implements async/await with generators, or this is a JavaScript engine that does not support async/await stack traces. Safari is known to not support stack guards.');
      }
      return result;
    });
  }
};
},{"_bundle_loader":"../../../../AppData/Roaming/nvm/v18.15.0/node_modules/parcel-bundler/src/builtins/bundle-loader.js","cross-fetch":[["browser-ponyfill.74474147.js","node_modules/cross-fetch/dist/browser-ponyfill.js"],"browser-ponyfill.74474147.js.map","node_modules/cross-fetch/dist/browser-ponyfill.js"]}],"node_modules/@supabase/gotrue-js/dist/module/lib/errors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomAuthError = exports.AuthUnknownError = exports.AuthSessionMissingError = exports.AuthRetryableFetchError = exports.AuthPKCEGrantCodeExchangeError = exports.AuthInvalidTokenResponseError = exports.AuthInvalidCredentialsError = exports.AuthImplicitGrantRedirectError = exports.AuthError = exports.AuthApiError = void 0;
exports.isAuthApiError = isAuthApiError;
exports.isAuthError = isAuthError;
exports.isAuthRetryableFetchError = isAuthRetryableFetchError;
class AuthError extends Error {
  constructor(message, status) {
    super(message);
    this.__isAuthError = true;
    this.name = 'AuthError';
    this.status = status;
  }
}
exports.AuthError = AuthError;
function isAuthError(error) {
  return typeof error === 'object' && error !== null && '__isAuthError' in error;
}
class AuthApiError extends AuthError {
  constructor(message, status) {
    super(message, status);
    this.name = 'AuthApiError';
    this.status = status;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status
    };
  }
}
exports.AuthApiError = AuthApiError;
function isAuthApiError(error) {
  return isAuthError(error) && error.name === 'AuthApiError';
}
class AuthUnknownError extends AuthError {
  constructor(message, originalError) {
    super(message);
    this.name = 'AuthUnknownError';
    this.originalError = originalError;
  }
}
exports.AuthUnknownError = AuthUnknownError;
class CustomAuthError extends AuthError {
  constructor(message, name, status) {
    super(message);
    this.name = name;
    this.status = status;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status
    };
  }
}
exports.CustomAuthError = CustomAuthError;
class AuthSessionMissingError extends CustomAuthError {
  constructor() {
    super('Auth session missing!', 'AuthSessionMissingError', 400);
  }
}
exports.AuthSessionMissingError = AuthSessionMissingError;
class AuthInvalidTokenResponseError extends CustomAuthError {
  constructor() {
    super('Auth session or user missing', 'AuthInvalidTokenResponseError', 500);
  }
}
exports.AuthInvalidTokenResponseError = AuthInvalidTokenResponseError;
class AuthInvalidCredentialsError extends CustomAuthError {
  constructor(message) {
    super(message, 'AuthInvalidCredentialsError', 400);
  }
}
exports.AuthInvalidCredentialsError = AuthInvalidCredentialsError;
class AuthImplicitGrantRedirectError extends CustomAuthError {
  constructor(message, details = null) {
    super(message, 'AuthImplicitGrantRedirectError', 500);
    this.details = null;
    this.details = details;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details
    };
  }
}
exports.AuthImplicitGrantRedirectError = AuthImplicitGrantRedirectError;
class AuthPKCEGrantCodeExchangeError extends CustomAuthError {
  constructor(message, details = null) {
    super(message, 'AuthPKCEGrantCodeExchangeError', 500);
    this.details = null;
    this.details = details;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details
    };
  }
}
exports.AuthPKCEGrantCodeExchangeError = AuthPKCEGrantCodeExchangeError;
class AuthRetryableFetchError extends CustomAuthError {
  constructor(message, status) {
    super(message, 'AuthRetryableFetchError', status);
  }
}
exports.AuthRetryableFetchError = AuthRetryableFetchError;
function isAuthRetryableFetchError(error) {
  return isAuthError(error) && error.name === 'AuthRetryableFetchError';
}
},{}],"node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._generateLinkResponse = _generateLinkResponse;
exports._noResolveJsonResponse = _noResolveJsonResponse;
exports._request = _request;
exports._sessionResponse = _sessionResponse;
exports._ssoResponse = _ssoResponse;
exports._userResponse = _userResponse;
var _helpers = require("./helpers");
var _errors = require("./errors");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const _getErrorMessage = err => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
const NETWORK_ERROR_CODES = [502, 503, 504];
async function handleError(error) {
  if (!(0, _helpers.looksLikeFetchResponse)(error)) {
    throw new _errors.AuthRetryableFetchError(_getErrorMessage(error), 0);
  }
  if (NETWORK_ERROR_CODES.includes(error.status)) {
    // status in 500...599 range - server had an error, request might be retryed.
    throw new _errors.AuthRetryableFetchError(_getErrorMessage(error), error.status);
  }
  let data;
  try {
    data = await error.json();
  } catch (e) {
    throw new _errors.AuthUnknownError(_getErrorMessage(e), e);
  }
  throw new _errors.AuthApiError(_getErrorMessage(data), error.status || 500);
}
const _getRequestParams = (method, options, parameters, body) => {
  const params = {
    method,
    headers: (options === null || options === void 0 ? void 0 : options.headers) || {}
  };
  if (method === 'GET') {
    return params;
  }
  params.headers = Object.assign({
    'Content-Type': 'application/json;charset=UTF-8'
  }, options === null || options === void 0 ? void 0 : options.headers);
  params.body = JSON.stringify(body);
  return Object.assign(Object.assign({}, params), parameters);
};
async function _request(fetcher, method, url, options) {
  var _a;
  const headers = Object.assign({}, options === null || options === void 0 ? void 0 : options.headers);
  if (options === null || options === void 0 ? void 0 : options.jwt) {
    headers['Authorization'] = `Bearer ${options.jwt}`;
  }
  const qs = (_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {};
  if (options === null || options === void 0 ? void 0 : options.redirectTo) {
    qs['redirect_to'] = options.redirectTo;
  }
  const queryString = Object.keys(qs).length ? '?' + new URLSearchParams(qs).toString() : '';
  const data = await _handleRequest(fetcher, method, url + queryString, {
    headers,
    noResolveJson: options === null || options === void 0 ? void 0 : options.noResolveJson
  }, {}, options === null || options === void 0 ? void 0 : options.body);
  return (options === null || options === void 0 ? void 0 : options.xform) ? options === null || options === void 0 ? void 0 : options.xform(data) : {
    data: Object.assign({}, data),
    error: null
  };
}
async function _handleRequest(fetcher, method, url, options, parameters, body) {
  const requestParams = _getRequestParams(method, options, parameters, body);
  let result;
  try {
    result = await fetcher(url, requestParams);
  } catch (e) {
    console.error(e);
    // fetch failed, likely due to a network or CORS error
    throw new _errors.AuthRetryableFetchError(_getErrorMessage(e), 0);
  }
  if (!result.ok) {
    await handleError(result);
  }
  if (options === null || options === void 0 ? void 0 : options.noResolveJson) {
    return result;
  }
  try {
    return await result.json();
  } catch (e) {
    await handleError(e);
  }
}
function _sessionResponse(data) {
  var _a;
  let session = null;
  if (hasSession(data)) {
    session = Object.assign({}, data);
    session.expires_at = (0, _helpers.expiresAt)(data.expires_in);
  }
  const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
  return {
    data: {
      session,
      user
    },
    error: null
  };
}
function _userResponse(data) {
  var _a;
  const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
  return {
    data: {
      user
    },
    error: null
  };
}
function _ssoResponse(data) {
  return {
    data,
    error: null
  };
}
function _generateLinkResponse(data) {
  const {
      action_link,
      email_otp,
      hashed_token,
      redirect_to,
      verification_type
    } = data,
    rest = __rest(data, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]);
  const properties = {
    action_link,
    email_otp,
    hashed_token,
    redirect_to,
    verification_type
  };
  const user = Object.assign({}, rest);
  return {
    data: {
      properties,
      user
    },
    error: null
  };
}
function _noResolveJsonResponse(data) {
  return data;
}
/**
 * hasSession checks if the response object contains a valid session
 * @param data A response object
 * @returns true if a session is in the response
 */
function hasSession(data) {
  return data.access_token && data.refresh_token && data.expires_in;
}
},{"./helpers":"node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js","./errors":"node_modules/@supabase/gotrue-js/dist/module/lib/errors.js"}],"node_modules/@supabase/gotrue-js/dist/module/GoTrueAdminApi.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fetch = require("./lib/fetch");
var _helpers = require("./lib/helpers");
var _errors = require("./lib/errors");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
class GoTrueAdminApi {
  constructor({
    url = '',
    headers = {},
    fetch
  }) {
    this.url = url;
    this.headers = headers;
    this.fetch = (0, _helpers.resolveFetch)(fetch);
    this.mfa = {
      listFactors: this._listFactors.bind(this),
      deleteFactor: this._deleteFactor.bind(this)
    };
  }
  /**
   * Removes a logged-in session.
   * @param jwt A valid, logged-in JWT.
   * @param scope The logout sope.
   */
  async signOut(jwt, scope = 'global') {
    try {
      await (0, _fetch._request)(this.fetch, 'POST', `${this.url}/logout?scope=${scope}`, {
        headers: this.headers,
        jwt,
        noResolveJson: true
      });
      return {
        data: null,
        error: null
      };
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: null,
          error
        };
      }
      throw error;
    }
  }
  /**
   * Sends an invite link to an email address.
   * @param email The email address of the user.
   * @param options Additional options to be included when inviting.
   */
  async inviteUserByEmail(email, options = {}) {
    try {
      return await (0, _fetch._request)(this.fetch, 'POST', `${this.url}/invite`, {
        body: {
          email,
          data: options.data
        },
        headers: this.headers,
        redirectTo: options.redirectTo,
        xform: _fetch._userResponse
      });
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            user: null
          },
          error
        };
      }
      throw error;
    }
  }
  /**
   * Generates email links and OTPs to be sent via a custom email provider.
   * @param email The user's email.
   * @param options.password User password. For signup only.
   * @param options.data Optional user metadata. For signup only.
   * @param options.redirectTo The redirect url which should be appended to the generated link
   */
  async generateLink(params) {
    try {
      const {
          options
        } = params,
        rest = __rest(params, ["options"]);
      const body = Object.assign(Object.assign({}, rest), options);
      if ('newEmail' in rest) {
        // replace newEmail with new_email in request body
        body.new_email = rest === null || rest === void 0 ? void 0 : rest.newEmail;
        delete body['newEmail'];
      }
      return await (0, _fetch._request)(this.fetch, 'POST', `${this.url}/admin/generate_link`, {
        body: body,
        headers: this.headers,
        xform: _fetch._generateLinkResponse,
        redirectTo: options === null || options === void 0 ? void 0 : options.redirectTo
      });
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            properties: null,
            user: null
          },
          error
        };
      }
      throw error;
    }
  }
  // User Admin API
  /**
   * Creates a new user.
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async createUser(attributes) {
    try {
      return await (0, _fetch._request)(this.fetch, 'POST', `${this.url}/admin/users`, {
        body: attributes,
        headers: this.headers,
        xform: _fetch._userResponse
      });
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            user: null
          },
          error
        };
      }
      throw error;
    }
  }
  /**
   * Get a list of users.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
   */
  async listUsers(params) {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
      const pagination = {
        nextPage: null,
        lastPage: 0,
        total: 0
      };
      const response = await (0, _fetch._request)(this.fetch, 'GET', `${this.url}/admin/users`, {
        headers: this.headers,
        noResolveJson: true,
        query: {
          page: (_b = (_a = params === null || params === void 0 ? void 0 : params.page) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '',
          per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ''
        },
        xform: _fetch._noResolveJsonResponse
      });
      if (response.error) throw response.error;
      const users = await response.json();
      const total = (_e = response.headers.get('x-total-count')) !== null && _e !== void 0 ? _e : 0;
      const links = (_g = (_f = response.headers.get('link')) === null || _f === void 0 ? void 0 : _f.split(',')) !== null && _g !== void 0 ? _g : [];
      if (links.length > 0) {
        links.forEach(link => {
          const page = parseInt(link.split(';')[0].split('=')[1].substring(0, 1));
          const rel = JSON.parse(link.split(';')[1].split('=')[1]);
          pagination[`${rel}Page`] = page;
        });
        pagination.total = parseInt(total);
      }
      return {
        data: Object.assign(Object.assign({}, users), pagination),
        error: null
      };
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            users: []
          },
          error
        };
      }
      throw error;
    }
  }
  /**
   * Get user by id.
   *
   * @param uid The user's unique identifier
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async getUserById(uid) {
    try {
      return await (0, _fetch._request)(this.fetch, 'GET', `${this.url}/admin/users/${uid}`, {
        headers: this.headers,
        xform: _fetch._userResponse
      });
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            user: null
          },
          error
        };
      }
      throw error;
    }
  }
  /**
   * Updates the user data.
   *
   * @param attributes The data you want to update.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async updateUserById(uid, attributes) {
    try {
      return await (0, _fetch._request)(this.fetch, 'PUT', `${this.url}/admin/users/${uid}`, {
        body: attributes,
        headers: this.headers,
        xform: _fetch._userResponse
      });
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            user: null
          },
          error
        };
      }
      throw error;
    }
  }
  /**
   * Delete a user. Requires a `service_role` key.
   *
   * @param id The user id you want to remove.
   * @param shouldSoftDelete If true, then the user will be soft-deleted from the auth schema.
   * Defaults to false for backward compatibility.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async deleteUser(id, shouldSoftDelete = false) {
    try {
      return await (0, _fetch._request)(this.fetch, 'DELETE', `${this.url}/admin/users/${id}`, {
        headers: this.headers,
        body: {
          should_soft_delete: shouldSoftDelete
        },
        xform: _fetch._userResponse
      });
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            user: null
          },
          error
        };
      }
      throw error;
    }
  }
  async _listFactors(params) {
    try {
      const {
        data,
        error
      } = await (0, _fetch._request)(this.fetch, 'GET', `${this.url}/admin/users/${params.userId}/factors`, {
        headers: this.headers,
        xform: factors => {
          return {
            data: {
              factors
            },
            error: null
          };
        }
      });
      return {
        data,
        error
      };
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: null,
          error
        };
      }
      throw error;
    }
  }
  async _deleteFactor(params) {
    try {
      const data = await (0, _fetch._request)(this.fetch, 'DELETE', `${this.url}/admin/users/${params.userId}/factors/${params.id}`, {
        headers: this.headers
      });
      return {
        data,
        error: null
      };
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: null,
          error
        };
      }
      throw error;
    }
  }
}
exports.default = GoTrueAdminApi;
},{"./lib/fetch":"node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js","./lib/helpers":"node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js","./lib/errors":"node_modules/@supabase/gotrue-js/dist/module/lib/errors.js"}],"node_modules/@supabase/gotrue-js/dist/module/lib/version.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
// Generated by genversion.
const version = '2.46.1';
exports.version = version;
},{}],"node_modules/@supabase/gotrue-js/dist/module/lib/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STORAGE_KEY = exports.NETWORK_FAILURE = exports.GOTRUE_URL = exports.EXPIRY_MARGIN = exports.DEFAULT_HEADERS = exports.AUDIENCE = void 0;
var _version = require("./version");
const GOTRUE_URL = 'http://localhost:9999';
exports.GOTRUE_URL = GOTRUE_URL;
const STORAGE_KEY = 'supabase.auth.token';
exports.STORAGE_KEY = STORAGE_KEY;
const AUDIENCE = '';
exports.AUDIENCE = AUDIENCE;
const DEFAULT_HEADERS = {
  'X-Client-Info': `gotrue-js/${_version.version}`
};
exports.DEFAULT_HEADERS = DEFAULT_HEADERS;
const EXPIRY_MARGIN = 10; // in seconds
exports.EXPIRY_MARGIN = EXPIRY_MARGIN;
const NETWORK_FAILURE = {
  MAX_RETRIES: 10,
  RETRY_INTERVAL: 2 // in deciseconds
};
exports.NETWORK_FAILURE = NETWORK_FAILURE;
},{"./version":"node_modules/@supabase/gotrue-js/dist/module/lib/version.js"}],"node_modules/@supabase/gotrue-js/dist/module/lib/local-storage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _helpers = require("./helpers");
const localStorageAdapter = {
  getItem: key => {
    if (!(0, _helpers.supportsLocalStorage)()) {
      return null;
    }
    return globalThis.localStorage.getItem(key);
  },
  setItem: (key, value) => {
    if (!(0, _helpers.supportsLocalStorage)()) {
      return;
    }
    globalThis.localStorage.setItem(key, value);
  },
  removeItem: key => {
    if (!(0, _helpers.supportsLocalStorage)()) {
      return;
    }
    globalThis.localStorage.removeItem(key);
  }
};
var _default = localStorageAdapter;
exports.default = _default;
},{"./helpers":"node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js"}],"node_modules/@supabase/gotrue-js/dist/module/lib/polyfills.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polyfillGlobalThis = polyfillGlobalThis;
/**
 * https://mathiasbynens.be/notes/globalthis
 */
function polyfillGlobalThis() {
  if (typeof globalThis === 'object') return;
  try {
    Object.defineProperty(Object.prototype, '__magic__', {
      get: function () {
        return this;
      },
      configurable: true
    });
    // @ts-expect-error 'Allow access to magic'
    __magic__.globalThis = __magic__;
    // @ts-expect-error 'Allow access to magic'
    delete Object.prototype.__magic__;
  } catch (e) {
    if (typeof self !== 'undefined') {
      // @ts-expect-error 'Allow access to globals'
      self.globalThis = self;
    }
  }
}
},{}],"node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _GoTrueAdminApi = _interopRequireDefault(require("./GoTrueAdminApi"));
var _constants = require("./lib/constants");
var _errors = require("./lib/errors");
var _fetch = require("./lib/fetch");
var _helpers = require("./lib/helpers");
var _localStorage = _interopRequireDefault(require("./lib/local-storage"));
var _polyfills = require("./lib/polyfills");
var _version = require("./lib/version");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _polyfills.polyfillGlobalThis)(); // Make "globalThis" available
const DEFAULT_OPTIONS = {
  url: _constants.GOTRUE_URL,
  storageKey: _constants.STORAGE_KEY,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  headers: _constants.DEFAULT_HEADERS,
  flowType: 'implicit',
  debug: false
};
/** Current session will be checked for refresh at this interval. */
const AUTO_REFRESH_TICK_DURATION = 30 * 1000;
/**
 * A token refresh will be attempted this many ticks before the current session expires. */
const AUTO_REFRESH_TICK_THRESHOLD = 3;
async function lockNoOp(name, acquireTimeout, fn) {
  return await fn();
}
class GoTrueClient {
  /**
   * Create a new client for use in the browser.
   */
  constructor(options) {
    var _a;
    this.stateChangeEmitters = new Map();
    this.autoRefreshTicker = null;
    this.visibilityChangedCallback = null;
    this.refreshingDeferred = null;
    /**
     * Keeps track of the async client initialization.
     * When null or not yet resolved the auth state is `unknown`
     * Once resolved the the auth state is known and it's save to call any further client methods.
     * Keep extra care to never reject or throw uncaught errors
     */
    this.initializePromise = null;
    this.detectSessionInUrl = true;
    /**
     * Used to broadcast state change events to other tabs listening.
     */
    this.broadcastChannel = null;
    this.instanceID = GoTrueClient.nextInstanceID;
    GoTrueClient.nextInstanceID += 1;
    if (this.instanceID > 0 && (0, _helpers.isBrowser)()) {
      console.warn('Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.');
    }
    const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
    this.logDebugMessages = settings.debug;
    this.inMemorySession = null;
    this.storageKey = settings.storageKey;
    this.autoRefreshToken = settings.autoRefreshToken;
    this.persistSession = settings.persistSession;
    this.storage = settings.storage || _localStorage.default;
    this.admin = new _GoTrueAdminApi.default({
      url: settings.url,
      headers: settings.headers,
      fetch: settings.fetch
    });
    this.url = settings.url;
    this.headers = settings.headers;
    this.fetch = (0, _helpers.resolveFetch)(settings.fetch);
    this.lock = settings.lock || lockNoOp;
    this.detectSessionInUrl = settings.detectSessionInUrl;
    this.flowType = settings.flowType;
    this.mfa = {
      verify: this._verify.bind(this),
      enroll: this._enroll.bind(this),
      unenroll: this._unenroll.bind(this),
      challenge: this._challenge.bind(this),
      listFactors: this._listFactors.bind(this),
      challengeAndVerify: this._challengeAndVerify.bind(this),
      getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this)
    };
    if (this.persistSession && this.storage === _localStorage.default && !(0, _helpers.supportsLocalStorage)()) {
      console.warn(`No storage option exists to persist the session, which may result in unexpected behavior when using auth.
        If you want to set persistSession to true, please provide a storage option or you may set persistSession to false to disable this warning.`);
    }
    if ((0, _helpers.isBrowser)() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
      try {
        this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
      } catch (e) {
        console.error('Failed to create a new BroadcastChannel, multi-tab state changes will not be available', e);
      }
      (_a = this.broadcastChannel) === null || _a === void 0 ? void 0 : _a.addEventListener('message', async event => {
        this._debug('received broadcast notification from other tab or client', event);
        await this._notifyAllSubscribers(event.data.event, event.data.session, false); // broadcast = false so we don't get an endless loop of messages
      });
    }

    this.initialize();
  }
  _debug(...args) {
    if (this.logDebugMessages) {
      console.log(`GoTrueClient@${this.instanceID} (${_version.version}) ${new Date().toISOString()}`, ...args);
    }
    return this;
  }
  /**
   * Initializes the client session either from the url or from storage.
   * This method is automatically called when instantiating the client, but should also be called
   * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
   */
  initialize() {
    if (this.initializePromise) {
      return this.initializePromise;
    }
    return this._initialize();
  }
  /**
   * IMPORTANT:
   * 1. Never throw in this method, as it is called from the constructor
   * 2. Never return a session from this method as it would be cached over
   *    the whole lifetime of the client
   */
  async _initialize() {
    if (this.initializePromise) {
      throw new Error('Double call of #_initialize()');
    }
    this.initializePromise = this._acquireLock(-1, async () => await (0, _helpers.stackGuard)('_initialize', async () => {
      try {
        const isPKCEFlow = (0, _helpers.isBrowser)() ? await this._isPKCEFlow() : false;
        this._debug('#_initialize()', 'begin', 'is PKCE flow', isPKCEFlow);
        if (isPKCEFlow || this.detectSessionInUrl && this._isImplicitGrantFlow()) {
          const {
            data,
            error
          } = await this._getSessionFromURL(isPKCEFlow);
          if (error) {
            this._debug('#_initialize()', 'error detecting session from URL', error);
            // failed login attempt via url,
            // remove old session as in verifyOtp, signUp and signInWith*
            await this._removeSession();
            return {
              error
            };
          }
          const {
            session,
            redirectType
          } = data;
          this._debug('#_initialize()', 'detected session in URL', session, 'redirect type', redirectType);
          await this._saveSession(session);
          setTimeout(async () => {
            if (redirectType === 'recovery') {
              await this._notifyAllSubscribers('PASSWORD_RECOVERY', session);
            } else {
              await this._notifyAllSubscribers('SIGNED_IN', session);
            }
          }, 0);
          return {
            error: null
          };
        }
        // no login attempt via callback url try to recover session from storage
        await this._recoverAndRefresh();
        return {
          error: null
        };
      } catch (error) {
        if ((0, _errors.isAuthError)(error)) {
          return {
            error
          };
        }
        return {
          error: new _errors.AuthUnknownError('Unexpected error during initialization', error)
        };
      } finally {
        await this._handleVisibilityChange();
        this._debug('#_initialize()', 'end');
      }
    }));
    return await this.initializePromise;
  }
  /**
   * Creates a new user.
   *
   * Be aware that if a user account exists in the system you may get back an
   * error message that attempts to hide this information from the user.
   * This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
   *
   * @returns A logged-in session if the server has "autoconfirm" ON
   * @returns A user if the server has "autoconfirm" OFF
   */
  async signUp(credentials) {
    var _a, _b, _c;
    try {
      await this._removeSession();
      let res;
      if ('email' in credentials) {
        const {
          email,
          password,
          options
        } = credentials;
        let codeChallenge = null;
        let codeChallengeMethod = null;
        if (this.flowType === 'pkce') {
          const codeVerifier = (0, _helpers.generatePKCEVerifier)();
          await (0, _helpers.setItemAsync)(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
          codeChallenge = await (0, _helpers.generatePKCEChallenge)(codeVerifier);
          codeChallengeMethod = codeVerifier === codeChallenge ? 'plain' : 's256';
        }
        res = await (0, _fetch._request)(this.fetch, 'POST', `${this.url}/signup`, {
          headers: this.headers,
          redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
          body: {
            email,
            password,
            data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
            gotrue_meta_security: {
              captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
            },
            code_challenge: codeChallenge,
            code_challenge_method: codeChallengeMethod
          },
          xform: _fetch._sessionResponse
        });
      } else if ('phone' in credentials) {
        const {
          phone,
          password,
          options
        } = credentials;
        res = await (0, _fetch._request)(this.fetch, 'POST', `${this.url}/signup`, {
          headers: this.headers,
          body: {
            phone,
            password,
            data: (_b = options === null || options === void 0 ? void 0 : options.data) !== null && _b !== void 0 ? _b : {},
            channel: (_c = options === null || options === void 0 ? void 0 : options.channel) !== null && _c !== void 0 ? _c : 'sms',
            gotrue_meta_security: {
              captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
            }
          },
          xform: _fetch._sessionResponse
        });
      } else {
        throw new _errors.AuthInvalidCredentialsError('You must provide either an email or phone number and a password');
      }
      const {
        data,
        error
      } = res;
      if (error || !data) {
        return {
          data: {
            user: null,
            session: null
          },
          error: error
        };
      }
      const session = data.session;
      const user = data.user;
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers('SIGNED_IN', session);
      }
      return {
        data: {
          user,
          session
        },
        error: null
      };
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            user: null,
            session: null
          },
          error
        };
      }
      throw error;
    }
  }
  /**
   * Log in an existing user with an email and password or phone and password.
   *
   * Be aware that you may get back an error message that will not distinguish
   * between the cases where the account does not exist or that the
   * email/phone and password combination is wrong or that the account can only
   * be accessed via social login.
   */
  async signInWithPassword(credentials) {
    try {
      await this._removeSession();
      let res;
      if ('email' in credentials) {
        const {
          email,
          password,
          options
        } = credentials;
        res = await (0, _fetch._request)(this.fetch, 'POST', `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            email,
            password,
            gotrue_meta_security: {
              captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
            }
          },
          xform: _fetch._sessionResponse
        });
      } else if ('phone' in credentials) {
        const {
          phone,
          password,
          options
        } = credentials;
        res = await (0, _fetch._request)(this.fetch, 'POST', `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            phone,
            password,
            gotrue_meta_security: {
              captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
            }
          },
          xform: _fetch._sessionResponse
        });
      } else {
        throw new _errors.AuthInvalidCredentialsError('You must provide either an email or phone number and a password');
      }
      const {
        data,
        error
      } = res;
      if (error) {
        return {
          data: {
            user: null,
            session: null
          },
          error
        };
      } else if (!data || !data.session || !data.user) {
        return {
          data: {
            user: null,
            session: null
          },
          error: new _errors.AuthInvalidTokenResponseError()
        };
      }
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers('SIGNED_IN', data.session);
      }
      return {
        data: {
          user: data.user,
          session: data.session
        },
        error
      };
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            user: null,
            session: null
          },
          error
        };
      }
      throw error;
    }
  }
  /**
   * Log in an existing user via a third-party provider.
   * This method supports the PKCE flow.
   */
  async signInWithOAuth(credentials) {
    var _a, _b, _c, _d;
    await this._removeSession();
    return await this._handleProviderSignIn(credentials.provider, {
      redirectTo: (_a = credentials.options) === null || _a === void 0 ? void 0 : _a.redirectTo,
      scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
      queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
      skipBrowserRedirect: (_d = credentials.options) === null || _d === void 0 ? void 0 : _d.skipBrowserRedirect
    });
  }
  /**
   * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
   */
  async exchangeCodeForSession(authCode) {
    const codeVerifier = await (0, _helpers.getItemAsync)(this.storage, `${this.storageKey}-code-verifier`);
    const {
      data,
      error
    } = await (0, _fetch._request)(this.fetch, 'POST', `${this.url}/token?grant_type=pkce`, {
      headers: this.headers,
      body: {
        auth_code: authCode,
        code_verifier: codeVerifier
      },
      xform: _fetch._sessionResponse
    });
    await (0, _helpers.removeItemAsync)(this.storage, `${this.storageKey}-code-verifier`);
    if (error) {
      return {
        data: {
          user: null,
          session: null
        },
        error
      };
    } else if (!data || !data.session || !data.user) {
      return {
        data: {
          user: null,
          session: null
        },
        error: new _errors.AuthInvalidTokenResponseError()
      };
    }
    if (data.session) {
      await this._saveSession(data.session);
      await this._notifyAllSubscribers('SIGNED_IN', data.session);
    }
    return {
      data,
      error
    };
  }
  /**
   * Allows signing in with an OIDC ID token. The authentication provider used
   * should be enabled and configured.
   */
  async signInWithIdToken(credentials) {
    await this._removeSession();
    try {
      const {
        options,
        provider,
        token,
        access_token,
        nonce
      } = credentials;
      const res = await (0, _fetch._request)(this.fetch, 'POST', `${this.url}/token?grant_type=id_token`, {
        headers: this.headers,
        body: {
          provider,
          id_token: token,
          access_token,
          nonce,
          gotrue_meta_security: {
            captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
          }
        },
        xform: _fetch._sessionResponse
      });
      const {
        data,
        error
      } = res;
      if (error) {
        return {
          data: {
            user: null,
            session: null
          },
          error
        };
      } else if (!data || !data.session || !data.user) {
        return {
          data: {
            user: null,
            session: null
          },
          error: new _errors.AuthInvalidTokenResponseError()
        };
      }
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers('SIGNED_IN', data.session);
      }
      return {
        data,
        error
      };
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            user: null,
            session: null
          },
          error
        };
      }
      throw error;
    }
  }
  /**
   * Log in a user using magiclink or a one-time password (OTP).
   *
   * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
   * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
   * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
   *
   * Be aware that you may get back an error message that will not distinguish
   * between the cases where the account does not exist or, that the account
   * can only be accessed via social login.
   *
   * Do note that you will need to configure a Whatsapp sender on Twilio
   * if you are using phone sign in with the 'whatsapp' channel. The whatsapp
   * channel is not supported on other providers
   * at this time.
   * This method supports PKCE when an email is passed.
   */
  async signInWithOtp(credentials) {
    var _a, _b, _c, _d, _e;
    try {
      await this._removeSession();
      if ('email' in credentials) {
        const {
          email,
          options
        } = credentials;
        let codeChallenge = null;
        let codeChallengeMethod = null;
        if (this.flowType === 'pkce') {
          const codeVerifier = (0, _helpers.generatePKCEVerifier)();
          await (0, _helpers.setItemAsync)(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
          codeChallenge = await (0, _helpers.generatePKCEChallenge)(codeVerifier);
          codeChallengeMethod = codeVerifier === codeChallenge ? 'plain' : 's256';
        }
        const {
          error
        } = await (0, _fetch._request)(this.fetch, 'POST', `${this.url}/otp`, {
          headers: this.headers,
          body: {
            email,
            data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
            create_user: (_b = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _b !== void 0 ? _b : true,
            gotrue_meta_security: {
              captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
            },
            code_challenge: codeChallenge,
            code_challenge_method: codeChallengeMethod
          },
          redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo
        });
        return {
          data: {
            user: null,
            session: null
          },
          error
        };
      }
      if ('phone' in credentials) {
        const {
          phone,
          options
        } = credentials;
        const {
          data,
          error
        } = await (0, _fetch._request)(this.fetch, 'POST', `${this.url}/otp`, {
          headers: this.headers,
          body: {
            phone,
            data: (_c = options === null || options === void 0 ? void 0 : options.data) !== null && _c !== void 0 ? _c : {},
            create_user: (_d = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _d !== void 0 ? _d : true,
            gotrue_meta_security: {
              captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
            },
            channel: (_e = options === null || options === void 0 ? void 0 : options.channel) !== null && _e !== void 0 ? _e : 'sms'
          }
        });
        return {
          data: {
            user: null,
            session: null,
            messageId: data === null || data === void 0 ? void 0 : data.message_id
          },
          error
        };
      }
      throw new _errors.AuthInvalidCredentialsError('You must provide either an email or phone number.');
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            user: null,
            session: null
          },
          error
        };
      }
      throw error;
    }
  }
  /**
   * Log in a user given a User supplied OTP received via mobile.
   */
  async verifyOtp(params) {
    var _a, _b;
    try {
      if (params.type !== 'email_change' && params.type !== 'phone_change') {
        // we don't want to remove the authenticated session if the user is performing an email_change or phone_change verification
        await this._removeSession();
      }
      let redirectTo = undefined;
      let captchaToken = undefined;
      if ('options' in params) {
        redirectTo = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo;
        captchaToken = (_b = params.options) === null || _b === void 0 ? void 0 : _b.captchaToken;
      }
      const {
        data,
        error
      } = await (0, _fetch._request)(this.fetch, 'POST', `${this.url}/verify`, {
        headers: this.headers,
        body: Object.assign(Object.assign({}, params), {
          gotrue_meta_security: {
            captcha_token: captchaToken
          }
        }),
        redirectTo,
        xform: _fetch._sessionResponse
      });
      if (error) {
        throw error;
      }
      if (!data) {
        throw new Error('An error occurred on token verification.');
      }
      const session = data.session;
      const user = data.user;
      if (session === null || session === void 0 ? void 0 : session.access_token) {
        await this._saveSession(session);
        await this._notifyAllSubscribers('SIGNED_IN', session);
      }
      return {
        data: {
          user,
          session
        },
        error: null
      };
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            user: null,
            session: null
          },
          error
        };
      }
      throw error;
    }
  }
  /**
   * Attempts a single-sign on using an enterprise Identity Provider. A
   * successful SSO attempt will redirect the current page to the identity
   * provider authorization page. The redirect URL is implementation and SSO
   * protocol specific.
   *
   * You can use it by providing a SSO domain. Typically you can extract this
   * domain by asking users for their email address. If this domain is
   * registered on the Auth instance the redirect will use that organization's
   * currently active SSO Identity Provider for the login.
   *
   * If you have built an organization-specific login page, you can use the
   * organization's SSO Identity Provider UUID directly instead.
   */
  async signInWithSSO(params) {
    var _a, _b, _c;
    try {
      await this._removeSession();
      return await (0, _fetch._request)(this.fetch, 'POST', `${this.url}/sso`, {
        body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, 'providerId' in params ? {
          provider_id: params.providerId
        } : null), 'domain' in params ? {
          domain: params.domain
        } : null), {
          redirect_to: (_b = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo) !== null && _b !== void 0 ? _b : undefined
        }), ((_c = params === null || params === void 0 ? void 0 : params.options) === null || _c === void 0 ? void 0 : _c.captchaToken) ? {
          gotrue_meta_security: {
            captcha_token: params.options.captchaToken
          }
        } : null), {
          skip_http_redirect: true
        }),
        headers: this.headers,
        xform: _fetch._ssoResponse
      });
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: null,
          error
        };
      }
      throw error;
    }
  }
  /**
   * Sends a reauthentication OTP to the user's email or phone number.
   * Requires the user to be signed-in.
   */
  async reauthenticate() {
    try {
      return await this._useSession(async result => {
        const {
          data: {
            session
          },
          error: sessionError
        } = result;
        if (sessionError) throw sessionError;
        if (!session) throw new _errors.AuthSessionMissingError();
        const {
          error
        } = await (0, _fetch._request)(this.fetch, 'GET', `${this.url}/reauthenticate`, {
          headers: this.headers,
          jwt: session.access_token
        });
        return {
          data: {
            user: null,
            session: null
          },
          error
        };
      });
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            user: null,
            session: null
          },
          error
        };
      }
      throw error;
    }
  }
  /**
   * Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
   */
  async resend(credentials) {
    try {
      if (credentials.type != 'email_change' && credentials.type != 'phone_change') {
        await this._removeSession();
      }
      const endpoint = `${this.url}/resend`;
      if ('email' in credentials) {
        const {
          email,
          type,
          options
        } = credentials;
        const {
          error
        } = await (0, _fetch._request)(this.fetch, 'POST', endpoint, {
          headers: this.headers,
          body: {
            email,
            type,
            gotrue_meta_security: {
              captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
            }
          },
          redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo
        });
        return {
          data: {
            user: null,
            session: null
          },
          error
        };
      } else if ('phone' in credentials) {
        const {
          phone,
          type,
          options
        } = credentials;
        const {
          data,
          error
        } = await (0, _fetch._request)(this.fetch, 'POST', endpoint, {
          headers: this.headers,
          body: {
            phone,
            type,
            gotrue_meta_security: {
              captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
            }
          }
        });
        return {
          data: {
            user: null,
            session: null,
            messageId: data === null || data === void 0 ? void 0 : data.message_id
          },
          error
        };
      }
      throw new _errors.AuthInvalidCredentialsError('You must provide either an email or phone number and a type');
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            user: null,
            session: null
          },
          error
        };
      }
      throw error;
    }
  }
  /**
   * Returns the session, refreshing it if necessary.
   * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
   */
  async getSession() {
    return this._useSession(async result => {
      return result;
    });
  }
  /**
   * Acquires a global lock based on the storage key.
   */
  async _acquireLock(acquireTimeout, fn) {
    this._debug('#_acquireLock', 'begin', acquireTimeout);
    try {
      if (!(await (0, _helpers.stackGuardsSupported)())) {
        this._debug('#_acquireLock', 'Stack guards not supported, so exclusive locking is not performed as it can lead to deadlocks if the lock is attempted to be recursively acquired (as the recursion cannot be detected).');
        return await fn();
      }
      if ((0, _helpers.isInStackGuard)('_acquireLock')) {
        this._debug('#_acquireLock', 'recursive call');
        return await fn();
      }
      return await this.lock(`lock:${this.storageKey}`, acquireTimeout, async () => {
        this._debug('#_acquireLock', 'lock acquired for storage key', this.storageKey);
        try {
          return await (0, _helpers.stackGuard)('_acquireLock', async () => {
            return await fn();
          });
        } finally {
          this._debug('#_acquireLock', 'lock released for storage key', this.storageKey);
        }
      });
    } finally {
      this._debug('#_acquireLock', 'end');
    }
  }
  /**
   * Use instead of {@link #getSession} inside the library. It is
   * semantically usually what you want, as getting a session involves some
   * processing afterwards that requires only one client operating on the
   * session at once across multiple tabs or processes.
   */
  async _useSession(fn) {
    this._debug('#_useSession', 'begin');
    try {
      if ((0, _helpers.isInStackGuard)('_useSession')) {
        this._debug('#_useSession', 'recursive call');
        // the use of __loadSession here is the only correct use of the function!
        const result = await this.__loadSession();
        return await fn(result);
      }
      return await this._acquireLock(-1, async () => {
        return await (0, _helpers.stackGuard)('_useSession', async () => {
          // the use of __loadSession here is the only correct use of the function!
          const result = await this.__loadSession();
          return await fn(result);
        });
      });
    } finally {
      this._debug('#_useSession', 'end');
    }
  }
  /**
   * NEVER USE DIRECTLY!
   *
   * Always use {@link #_useSession}.
   */
  async __loadSession() {
    this._debug('#__loadSession()', 'begin');
    if (this.logDebugMessages && !(0, _helpers.isInStackGuard)('_useSession') && (await (0, _helpers.stackGuardsSupported)())) {
      throw new Error('Please use #_useSession()');
    }
    if ((0, _helpers.isInStackGuard)('_initialize')) {
      this._debug('#__loadSession', '#_initialize recursion detected', new Error().stack);
    }
    // always wait for #_initialize() to finish before loading anything from
    // storage
    await this.initializePromise;
    try {
      let currentSession = null;
      if (this.persistSession) {
        const maybeSession = await (0, _helpers.getItemAsync)(this.storage, this.storageKey);
        this._debug('#getSession()', 'session from storage', maybeSession);
        if (maybeSession !== null) {
          if (this._isValidSession(maybeSession)) {
            currentSession = maybeSession;
          } else {
            this._debug('#getSession()', 'session from storage is not valid');
            await this._removeSession();
          }
        }
      } else {
        currentSession = this.inMemorySession;
        this._debug('#getSession()', 'session from memory', currentSession);
      }
      if (!currentSession) {
        return {
          data: {
            session: null
          },
          error: null
        };
      }
      const hasExpired = currentSession.expires_at ? currentSession.expires_at <= Date.now() / 1000 : false;
      this._debug('#__loadSession()', `session has${hasExpired ? '' : ' not'} expired`, 'expires_at', currentSession.expires_at);
      if (!hasExpired) {
        return {
          data: {
            session: currentSession
          },
          error: null
        };
      }
      const {
        session,
        error
      } = await this._callRefreshToken(currentSession.refresh_token);
      if (error) {
        return {
          data: {
            session: null
          },
          error
        };
      }
      return {
        data: {
          session
        },
        error: null
      };
    } finally {
      this._debug('#__loadSession()', 'end');
    }
  }
  /**
   * Gets the current user details if there is an existing session.
   * @param jwt Takes in an optional access token jwt. If no jwt is provided, getUser() will attempt to get the jwt from the current session.
   */
  async getUser(jwt) {
    try {
      if (jwt) {
        return await (0, _fetch._request)(this.fetch, 'GET', `${this.url}/user`, {
          headers: this.headers,
          jwt: jwt,
          xform: _fetch._userResponse
        });
      }
      return await this._useSession(async result => {
        var _a, _b;
        const {
          data,
          error
        } = result;
        if (error) {
          throw error;
        }
        return await (0, _fetch._request)(this.fetch, 'GET', `${this.url}/user`, {
          headers: this.headers,
          jwt: (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : undefined,
          xform: _fetch._userResponse
        });
      });
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            user: null
          },
          error
        };
      }
      throw error;
    }
  }
  /**
   * Updates user data for a logged in user.
   */
  async updateUser(attributes, options = {}) {
    try {
      return await this._useSession(async result => {
        const {
          data: sessionData,
          error: sessionError
        } = result;
        if (sessionError) {
          throw sessionError;
        }
        if (!sessionData.session) {
          throw new _errors.AuthSessionMissingError();
        }
        const session = sessionData.session;
        const {
          data,
          error: userError
        } = await (0, _fetch._request)(this.fetch, 'PUT', `${this.url}/user`, {
          headers: this.headers,
          redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
          body: attributes,
          jwt: session.access_token,
          xform: _fetch._userResponse
        });
        if (userError) throw userError;
        session.user = data.user;
        await this._saveSession(session);
        await this._notifyAllSubscribers('USER_UPDATED', session);
        return {
          data: {
            user: session.user
          },
          error: null
        };
      });
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            user: null
          },
          error
        };
      }
      throw error;
    }
  }
  /**
   * Decodes a JWT (without performing any validation).
   */
  _decodeJWT(jwt) {
    return (0, _helpers.decodeJWTPayload)(jwt);
  }
  /**
   * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
   * If the refresh token or access token in the current session is invalid, an error will be thrown.
   * @param currentSession The current session that minimally contains an access token and refresh token.
   */
  async setSession(currentSession) {
    try {
      if (!currentSession.access_token || !currentSession.refresh_token) {
        throw new _errors.AuthSessionMissingError();
      }
      const timeNow = Date.now() / 1000;
      let expiresAt = timeNow;
      let hasExpired = true;
      let session = null;
      const payload = (0, _helpers.decodeJWTPayload)(currentSession.access_token);
      if (payload.exp) {
        expiresAt = payload.exp;
        hasExpired = expiresAt <= timeNow;
      }
      if (hasExpired) {
        const {
          session: refreshedSession,
          error
        } = await this._callRefreshToken(currentSession.refresh_token);
        if (error) {
          return {
            data: {
              user: null,
              session: null
            },
            error: error
          };
        }
        if (!refreshedSession) {
          return {
            data: {
              user: null,
              session: null
            },
            error: null
          };
        }
        session = refreshedSession;
      } else {
        const {
          data,
          error
        } = await this.getUser(currentSession.access_token);
        if (error) {
          throw error;
        }
        session = {
          access_token: currentSession.access_token,
          refresh_token: currentSession.refresh_token,
          user: data.user,
          token_type: 'bearer',
          expires_in: expiresAt - timeNow,
          expires_at: expiresAt
        };
        await this._saveSession(session);
        await this._notifyAllSubscribers('SIGNED_IN', session);
      }
      return {
        data: {
          user: session.user,
          session
        },
        error: null
      };
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            session: null,
            user: null
          },
          error
        };
      }
      throw error;
    }
  }
  /**
   * Returns a new session, regardless of expiry status.
   * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
   * If the current session's refresh token is invalid, an error will be thrown.
   * @param currentSession The current session. If passed in, it must contain a refresh token.
   */
  async refreshSession(currentSession) {
    try {
      return await this._useSession(async result => {
        var _a;
        if (!currentSession) {
          const {
            data,
            error
          } = result;
          if (error) {
            throw error;
          }
          currentSession = (_a = data.session) !== null && _a !== void 0 ? _a : undefined;
        }
        if (!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.refresh_token)) {
          throw new _errors.AuthSessionMissingError();
        }
        const {
          session,
          error
        } = await this._callRefreshToken(currentSession.refresh_token);
        if (error) {
          return {
            data: {
              user: null,
              session: null
            },
            error: error
          };
        }
        if (!session) {
          return {
            data: {
              user: null,
              session: null
            },
            error: null
          };
        }
        return {
          data: {
            user: session.user,
            session
          },
          error: null
        };
      });
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            user: null,
            session: null
          },
          error
        };
      }
      throw error;
    }
  }
  /**
   * Gets the session data from a URL string
   */
  async _getSessionFromURL(isPKCEFlow) {
    try {
      if (!(0, _helpers.isBrowser)()) throw new _errors.AuthImplicitGrantRedirectError('No browser detected.');
      if (this.flowType === 'implicit' && !this._isImplicitGrantFlow()) {
        throw new _errors.AuthImplicitGrantRedirectError('Not a valid implicit grant flow url.');
      } else if (this.flowType == 'pkce' && !isPKCEFlow) {
        throw new _errors.AuthPKCEGrantCodeExchangeError('Not a valid PKCE flow url.');
      }
      const params = (0, _helpers.parseParametersFromURL)(window.location.href);
      if (isPKCEFlow) {
        if (!params.code) throw new _errors.AuthPKCEGrantCodeExchangeError('No code detected.');
        const {
          data,
          error
        } = await this.exchangeCodeForSession(params.code);
        if (error) throw error;
        const url = new URL(window.location.href);
        url.searchParams.delete('code');
        window.history.replaceState(window.history.state, '', url.toString());
        return {
          data: {
            session: data.session,
            redirectType: null
          },
          error: null
        };
      }
      if (params.error || params.error_description || params.error_code) {
        throw new _errors.AuthImplicitGrantRedirectError(params.error_description || 'Error in URL with unspecified error_description', {
          error: params.error || 'unspecified_error',
          code: params.error_code || 'unspecified_code'
        });
      }
      const {
        provider_token,
        provider_refresh_token,
        access_token,
        refresh_token,
        expires_in,
        token_type
      } = params;
      if (!access_token || !expires_in || !refresh_token || !token_type) {
        throw new _errors.AuthImplicitGrantRedirectError('No session defined in URL');
      }
      const timeNow = Math.round(Date.now() / 1000);
      const expiresIn = parseInt(expires_in);
      const expires_at = timeNow + expiresIn;
      const {
        data,
        error
      } = await this.getUser(access_token);
      if (error) throw error;
      const session = {
        provider_token,
        provider_refresh_token,
        access_token,
        expires_in: expiresIn,
        expires_at,
        refresh_token,
        token_type,
        user: data.user
      };
      // Remove tokens from URL
      window.location.hash = '';
      this._debug('#_getSessionFromURL()', 'clearing window.location.hash');
      return {
        data: {
          session,
          redirectType: params.type
        },
        error: null
      };
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            session: null,
            redirectType: null
          },
          error
        };
      }
      throw error;
    }
  }
  /**
   * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
   */
  _isImplicitGrantFlow() {
    const params = (0, _helpers.parseParametersFromURL)(window.location.href);
    return !!((0, _helpers.isBrowser)() && (params.access_token || params.error_description));
  }
  /**
   * Checks if the current URL and backing storage contain parameters given by a PKCE flow
   */
  async _isPKCEFlow() {
    const params = (0, _helpers.parseParametersFromURL)(window.location.href);
    const currentStorageContent = await (0, _helpers.getItemAsync)(this.storage, `${this.storageKey}-code-verifier`);
    return !!(params.code && currentStorageContent);
  }
  /**
   * Inside a browser context, `signOut()` will remove the logged in user from the browser session
   * and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
   *
   * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
   * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
   *
   * If using others scope, no `SIGNED_OUT` event is fired!
   */
  async signOut({
    scope
  } = {
    scope: 'global'
  }) {
    return await this._useSession(async result => {
      var _a;
      const {
        data,
        error: sessionError
      } = result;
      if (sessionError) {
        return {
          error: sessionError
        };
      }
      const accessToken = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token;
      if (accessToken) {
        const {
          error
        } = await this.admin.signOut(accessToken, scope);
        if (error) {
          // ignore 404s since user might not exist anymore
          // ignore 401s since an invalid or expired JWT should sign out the current session
          if (!((0, _errors.isAuthApiError)(error) && (error.status === 404 || error.status === 401))) {
            return {
              error
            };
          }
        }
      }
      if (scope !== 'others') {
        await this._removeSession();
        await (0, _helpers.removeItemAsync)(this.storage, `${this.storageKey}-code-verifier`);
        await this._notifyAllSubscribers('SIGNED_OUT', null);
      }
      return {
        error: null
      };
    });
  }
  /**
   * Receive a notification every time an auth event happens.
   * @param callback A callback function to be invoked when an auth event happens.
   */
  onAuthStateChange(callback) {
    const id = (0, _helpers.uuid)();
    const subscription = {
      id,
      callback,
      unsubscribe: () => {
        this._debug('#unsubscribe()', 'state change callback with id removed', id);
        this.stateChangeEmitters.delete(id);
      }
    };
    this._debug('#onAuthStateChange()', 'registered callback with id', id);
    this.stateChangeEmitters.set(id, subscription);
    this._emitInitialSession(id);
    return {
      data: {
        subscription
      }
    };
  }
  async _emitInitialSession(id) {
    return await this._useSession(async result => {
      var _a, _b;
      try {
        const {
          data: {
            session
          },
          error
        } = result;
        if (error) throw error;
        await ((_a = this.stateChangeEmitters.get(id)) === null || _a === void 0 ? void 0 : _a.callback('INITIAL_SESSION', session));
        this._debug('INITIAL_SESSION', 'callback id', id, 'session', session);
      } catch (err) {
        await ((_b = this.stateChangeEmitters.get(id)) === null || _b === void 0 ? void 0 : _b.callback('INITIAL_SESSION', null));
        this._debug('INITIAL_SESSION', 'callback id', id, 'error', err);
        console.error(err);
      }
    });
  }
  /**
   * Sends a password reset request to an email address.
   * This method supports the PKCE flow.
   * @param email The email address of the user.
   * @param options.redirectTo The URL to send the user to after they click the password reset link.
   * @param options.captchaToken Verification token received when the user completes the captcha on the site.
   */
  async resetPasswordForEmail(email, options = {}) {
    let codeChallenge = null;
    let codeChallengeMethod = null;
    if (this.flowType === 'pkce') {
      const codeVerifier = (0, _helpers.generatePKCEVerifier)();
      await (0, _helpers.setItemAsync)(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
      codeChallenge = await (0, _helpers.generatePKCEChallenge)(codeVerifier);
      codeChallengeMethod = codeVerifier === codeChallenge ? 'plain' : 's256';
    }
    try {
      return await (0, _fetch._request)(this.fetch, 'POST', `${this.url}/recover`, {
        body: {
          email,
          code_challenge: codeChallenge,
          code_challenge_method: codeChallengeMethod,
          gotrue_meta_security: {
            captcha_token: options.captchaToken
          }
        },
        headers: this.headers,
        redirectTo: options.redirectTo
      });
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: null,
          error
        };
      }
      throw error;
    }
  }
  /**
   * Generates a new JWT.
   * @param refreshToken A valid refresh token that was returned on login.
   */
  async _refreshAccessToken(refreshToken) {
    const debugName = `#_refreshAccessToken(${refreshToken.substring(0, 5)}...)`;
    this._debug(debugName, 'begin');
    try {
      const startedAt = Date.now();
      // will attempt to refresh the token with exponential backoff
      return await (0, _helpers.retryable)(async attempt => {
        await (0, _helpers.sleep)(attempt * 200); // 0, 200, 400, 800, ...
        this._debug(debugName, 'refreshing attempt', attempt);
        return await (0, _fetch._request)(this.fetch, 'POST', `${this.url}/token?grant_type=refresh_token`, {
          body: {
            refresh_token: refreshToken
          },
          headers: this.headers,
          xform: _fetch._sessionResponse
        });
      }, (attempt, _, result) => result && result.error && (0, _errors.isAuthRetryableFetchError)(result.error) &&
      // retryable only if the request can be sent before the backoff overflows the tick duration
      Date.now() + (attempt + 1) * 200 - startedAt < AUTO_REFRESH_TICK_DURATION);
    } catch (error) {
      this._debug(debugName, 'error', error);
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: {
            session: null,
            user: null
          },
          error
        };
      }
      throw error;
    } finally {
      this._debug(debugName, 'end');
    }
  }
  _isValidSession(maybeSession) {
    const isValidSession = typeof maybeSession === 'object' && maybeSession !== null && 'access_token' in maybeSession && 'refresh_token' in maybeSession && 'expires_at' in maybeSession;
    return isValidSession;
  }
  async _handleProviderSignIn(provider, options) {
    const url = await this._getUrlForProvider(provider, {
      redirectTo: options.redirectTo,
      scopes: options.scopes,
      queryParams: options.queryParams
    });
    this._debug('#_handleProviderSignIn()', 'provider', provider, 'options', options, 'url', url);
    // try to open on the browser
    if ((0, _helpers.isBrowser)() && !options.skipBrowserRedirect) {
      window.location.assign(url);
    }
    return {
      data: {
        provider,
        url
      },
      error: null
    };
  }
  /**
   * Recovers the session from LocalStorage and refreshes
   * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
   */
  async _recoverAndRefresh() {
    var _a;
    const debugName = '#_recoverAndRefresh()';
    this._debug(debugName, 'begin');
    try {
      const currentSession = await (0, _helpers.getItemAsync)(this.storage, this.storageKey);
      this._debug(debugName, 'session from storage', currentSession);
      if (!this._isValidSession(currentSession)) {
        this._debug(debugName, 'session is not valid');
        if (currentSession !== null) {
          await this._removeSession();
        }
        return;
      }
      const timeNow = Math.round(Date.now() / 1000);
      const expiresWithMargin = ((_a = currentSession.expires_at) !== null && _a !== void 0 ? _a : Infinity) < timeNow + _constants.EXPIRY_MARGIN;
      this._debug(debugName, `session has${expiresWithMargin ? '' : ' not'} expired with margin of ${_constants.EXPIRY_MARGIN}s`);
      if (expiresWithMargin) {
        if (this.autoRefreshToken && currentSession.refresh_token) {
          const {
            error
          } = await this._callRefreshToken(currentSession.refresh_token);
          if (error) {
            console.error(error);
            if (!(0, _errors.isAuthRetryableFetchError)(error)) {
              this._debug(debugName, 'refresh failed with a non-retryable error, removing the session', error);
              await this._removeSession();
            }
          }
        }
      } else {
        // no need to persist currentSession again, as we just loaded it from
        // local storage; persisting it again may overwrite a value saved by
        // another client with access to the same local storage
        await this._notifyAllSubscribers('SIGNED_IN', currentSession);
      }
    } catch (err) {
      this._debug(debugName, 'error', err);
      console.error(err);
      return;
    } finally {
      this._debug(debugName, 'end');
    }
  }
  async _callRefreshToken(refreshToken) {
    var _a, _b;
    if (!refreshToken) {
      throw new _errors.AuthSessionMissingError();
    }
    // refreshing is already in progress
    if (this.refreshingDeferred) {
      return this.refreshingDeferred.promise;
    }
    const debugName = `#_callRefreshToken(${refreshToken.substring(0, 5)}...)`;
    this._debug(debugName, 'begin');
    try {
      this.refreshingDeferred = new _helpers.Deferred();
      const {
        data,
        error
      } = await this._refreshAccessToken(refreshToken);
      if (error) throw error;
      if (!data.session) throw new _errors.AuthSessionMissingError();
      await this._saveSession(data.session);
      await this._notifyAllSubscribers('TOKEN_REFRESHED', data.session);
      const result = {
        session: data.session,
        error: null
      };
      this.refreshingDeferred.resolve(result);
      return result;
    } catch (error) {
      this._debug(debugName, 'error', error);
      if ((0, _errors.isAuthError)(error)) {
        const result = {
          session: null,
          error
        };
        (_a = this.refreshingDeferred) === null || _a === void 0 ? void 0 : _a.resolve(result);
        return result;
      }
      (_b = this.refreshingDeferred) === null || _b === void 0 ? void 0 : _b.reject(error);
      throw error;
    } finally {
      this.refreshingDeferred = null;
      this._debug(debugName, 'end');
    }
  }
  async _notifyAllSubscribers(event, session, broadcast = true) {
    const debugName = `#_notifyAllSubscribers(${event})`;
    this._debug(debugName, 'begin', session, `broadcast = ${broadcast}`);
    try {
      if (this.broadcastChannel && broadcast) {
        this.broadcastChannel.postMessage({
          event,
          session
        });
      }
      const errors = [];
      const promises = Array.from(this.stateChangeEmitters.values()).map(async x => {
        try {
          await x.callback(event, session);
        } catch (e) {
          errors.push(e);
        }
      });
      await Promise.all(promises);
      if (errors.length > 0) {
        for (let i = 0; i < errors.length; i += 1) {
          console.error(errors[i]);
        }
        throw errors[0];
      }
    } finally {
      this._debug(debugName, 'end');
    }
  }
  /**
   * set currentSession and currentUser
   * process to _startAutoRefreshToken if possible
   */
  async _saveSession(session) {
    this._debug('#_saveSession()', session);
    if (!this.persistSession) {
      this.inMemorySession = session;
    }
    if (this.persistSession && session.expires_at) {
      await this._persistSession(session);
    }
  }
  _persistSession(currentSession) {
    this._debug('#_persistSession()', currentSession);
    return (0, _helpers.setItemAsync)(this.storage, this.storageKey, currentSession);
  }
  async _removeSession() {
    this._debug('#_removeSession()');
    if (this.persistSession) {
      await (0, _helpers.removeItemAsync)(this.storage, this.storageKey);
    } else {
      this.inMemorySession = null;
    }
  }
  /**
   * Removes any registered visibilitychange callback.
   *
   * {@see #startAutoRefresh}
   * {@see #stopAutoRefresh}
   */
  _removeVisibilityChangedCallback() {
    this._debug('#_removeVisibilityChangedCallback()');
    const callback = this.visibilityChangedCallback;
    this.visibilityChangedCallback = null;
    try {
      if (callback && (0, _helpers.isBrowser)() && (window === null || window === void 0 ? void 0 : window.removeEventListener)) {
        window.removeEventListener('visibilitychange', callback);
      }
    } catch (e) {
      console.error('removing visibilitychange callback failed', e);
    }
  }
  /**
   * This is the private implementation of {@link #startAutoRefresh}. Use this
   * within the library.
   */
  async _startAutoRefresh() {
    await this._stopAutoRefresh();
    this._debug('#_startAutoRefresh()');
    const ticker = setInterval(() => this._autoRefreshTokenTick(), AUTO_REFRESH_TICK_DURATION);
    this.autoRefreshTicker = ticker;
    if (ticker && typeof ticker === 'object' && typeof ticker.unref === 'function') {
      // ticker is a NodeJS Timeout object that has an `unref` method
      // https://nodejs.org/api/timers.html#timeoutunref
      // When auto refresh is used in NodeJS (like for testing) the
      // `setInterval` is preventing the process from being marked as
      // finished and tests run endlessly. This can be prevented by calling
      // `unref()` on the returned object.
      ticker.unref();
      // @ts-ignore
    } else if (typeof Deno !== 'undefined' && typeof Deno.unrefTimer === 'function') {
      // similar like for NodeJS, but with the Deno API
      // https://deno.land/api@latest?unstable&s=Deno.unrefTimer
      // @ts-ignore
      Deno.unrefTimer(ticker);
    }
    // run the tick immediately, but in the next pass of the event loop so that
    // #_initialize can be allowed to complete without recursively waiting on
    // itself
    setTimeout(async () => {
      await this.initializePromise;
      await this._autoRefreshTokenTick();
    }, 0);
  }
  /**
   * This is the private implementation of {@link #stopAutoRefresh}. Use this
   * within the library.
   */
  async _stopAutoRefresh() {
    this._debug('#_stopAutoRefresh()');
    const ticker = this.autoRefreshTicker;
    this.autoRefreshTicker = null;
    if (ticker) {
      clearInterval(ticker);
    }
  }
  /**
   * Starts an auto-refresh process in the background. The session is checked
   * every few seconds. Close to the time of expiration a process is started to
   * refresh the session. If refreshing fails it will be retried for as long as
   * necessary.
   *
   * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
   * to call this function, it will be called for you.
   *
   * On browsers the refresh process works only when the tab/window is in the
   * foreground to conserve resources as well as prevent race conditions and
   * flooding auth with requests. If you call this method any managed
   * visibility change callback will be removed and you must manage visibility
   * changes on your own.
   *
   * On non-browser platforms the refresh process works *continuously* in the
   * background, which may not be desirable. You should hook into your
   * platform's foreground indication mechanism and call these methods
   * appropriately to conserve resources.
   *
   * {@see #stopAutoRefresh}
   */
  async startAutoRefresh() {
    this._removeVisibilityChangedCallback();
    await this._startAutoRefresh();
  }
  /**
   * Stops an active auto refresh process running in the background (if any).
   *
   * If you call this method any managed visibility change callback will be
   * removed and you must manage visibility changes on your own.
   *
   * See {@link #startAutoRefresh} for more details.
   */
  async stopAutoRefresh() {
    this._removeVisibilityChangedCallback();
    await this._stopAutoRefresh();
  }
  /**
   * Runs the auto refresh token tick.
   */
  async _autoRefreshTokenTick() {
    this._debug('#_autoRefreshTokenTick()', 'begin');
    try {
      const now = Date.now();
      try {
        return await this._useSession(async result => {
          const {
            data: {
              session
            }
          } = result;
          if (!session || !session.refresh_token || !session.expires_at) {
            this._debug('#_autoRefreshTokenTick()', 'no session');
            return;
          }
          // session will expire in this many ticks (or has already expired if <= 0)
          const expiresInTicks = Math.floor((session.expires_at * 1000 - now) / AUTO_REFRESH_TICK_DURATION);
          this._debug('#_autoRefreshTokenTick()', `access token expires in ${expiresInTicks} ticks, a tick lasts ${AUTO_REFRESH_TICK_DURATION}ms, refresh threshold is ${AUTO_REFRESH_TICK_THRESHOLD} ticks`);
          if (expiresInTicks <= AUTO_REFRESH_TICK_THRESHOLD) {
            await this._callRefreshToken(session.refresh_token);
          }
        });
      } catch (e) {
        console.error('Auto refresh tick failed with error. This is likely a transient error.', e);
      }
    } finally {
      this._debug('#_autoRefreshTokenTick()', 'end');
    }
  }
  /**
   * Registers callbacks on the browser / platform, which in-turn run
   * algorithms when the browser window/tab are in foreground. On non-browser
   * platforms it assumes always foreground.
   */
  async _handleVisibilityChange() {
    this._debug('#_handleVisibilityChange()');
    if (!(0, _helpers.isBrowser)() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
      if (this.autoRefreshToken) {
        // in non-browser environments the refresh token ticker runs always
        this.startAutoRefresh();
      }
      return false;
    }
    try {
      this.visibilityChangedCallback = async () => await this._onVisibilityChanged(false);
      window === null || window === void 0 ? void 0 : window.addEventListener('visibilitychange', this.visibilityChangedCallback);
      // now immediately call the visbility changed callback to setup with the
      // current visbility state
      await this._onVisibilityChanged(true); // initial call
    } catch (error) {
      console.error('_handleVisibilityChange', error);
    }
  }
  /**
   * Callback registered with `window.addEventListener('visibilitychange')`.
   */
  async _onVisibilityChanged(isInitial) {
    this._debug(`#_onVisibilityChanged(${isInitial})`, 'visibilityState', document.visibilityState);
    if (document.visibilityState === 'visible') {
      // to avoid recursively depending on #_initialize(), run the visibility
      // changed callback in the next event loop tick
      setTimeout(async () => {
        if (!isInitial) {
          // initial visibility change setup is handled in another flow under #initialize()
          await this.initializePromise;
          await this._recoverAndRefresh();
          this._debug('#_onVisibilityChanged()', 'finished waiting for initialize, _recoverAndRefresh');
        }
        if (this.autoRefreshToken) {
          // in browser environments the refresh token ticker runs only on focused tabs
          // which prevents race conditions
          this._startAutoRefresh();
        }
      }, 0);
    } else if (document.visibilityState === 'hidden') {
      if (this.autoRefreshToken) {
        this._stopAutoRefresh();
      }
    }
  }
  /**
   * Generates the relevant login URL for a third-party provider.
   * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
   * @param options.scopes A space-separated list of scopes granted to the OAuth application.
   * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
   */
  async _getUrlForProvider(provider, options) {
    const urlParams = [`provider=${encodeURIComponent(provider)}`];
    if (options === null || options === void 0 ? void 0 : options.redirectTo) {
      urlParams.push(`redirect_to=${encodeURIComponent(options.redirectTo)}`);
    }
    if (options === null || options === void 0 ? void 0 : options.scopes) {
      urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
    }
    if (this.flowType === 'pkce') {
      const codeVerifier = (0, _helpers.generatePKCEVerifier)();
      await (0, _helpers.setItemAsync)(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
      const codeChallenge = await (0, _helpers.generatePKCEChallenge)(codeVerifier);
      const codeChallengeMethod = codeVerifier === codeChallenge ? 'plain' : 's256';
      this._debug('PKCE', 'code verifier', `${codeVerifier.substring(0, 5)}...`, 'code challenge', codeChallenge, 'method', codeChallengeMethod);
      const flowParams = new URLSearchParams({
        code_challenge: `${encodeURIComponent(codeChallenge)}`,
        code_challenge_method: `${encodeURIComponent(codeChallengeMethod)}`
      });
      urlParams.push(flowParams.toString());
    }
    if (options === null || options === void 0 ? void 0 : options.queryParams) {
      const query = new URLSearchParams(options.queryParams);
      urlParams.push(query.toString());
    }
    return `${this.url}/authorize?${urlParams.join('&')}`;
  }
  async _unenroll(params) {
    try {
      return await this._useSession(async result => {
        var _a;
        const {
          data: sessionData,
          error: sessionError
        } = result;
        if (sessionError) {
          return {
            data: null,
            error: sessionError
          };
        }
        return await (0, _fetch._request)(this.fetch, 'DELETE', `${this.url}/factors/${params.factorId}`, {
          headers: this.headers,
          jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
        });
      });
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: null,
          error
        };
      }
      throw error;
    }
  }
  /**
   * {@see GoTrueMFAApi#enroll}
   */
  async _enroll(params) {
    try {
      return await this._useSession(async result => {
        var _a, _b;
        const {
          data: sessionData,
          error: sessionError
        } = result;
        if (sessionError) {
          return {
            data: null,
            error: sessionError
          };
        }
        const {
          data,
          error
        } = await (0, _fetch._request)(this.fetch, 'POST', `${this.url}/factors`, {
          body: {
            friendly_name: params.friendlyName,
            factor_type: params.factorType,
            issuer: params.issuer
          },
          headers: this.headers,
          jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
        });
        if (error) {
          return {
            data: null,
            error
          };
        }
        if ((_b = data === null || data === void 0 ? void 0 : data.totp) === null || _b === void 0 ? void 0 : _b.qr_code) {
          data.totp.qr_code = `data:image/svg+xml;utf-8,${data.totp.qr_code}`;
        }
        return {
          data,
          error: null
        };
      });
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: null,
          error
        };
      }
      throw error;
    }
  }
  /**
   * {@see GoTrueMFAApi#verify}
   */
  async _verify(params) {
    try {
      return await this._useSession(async result => {
        var _a;
        const {
          data: sessionData,
          error: sessionError
        } = result;
        if (sessionError) {
          return {
            data: null,
            error: sessionError
          };
        }
        const {
          data,
          error
        } = await (0, _fetch._request)(this.fetch, 'POST', `${this.url}/factors/${params.factorId}/verify`, {
          body: {
            code: params.code,
            challenge_id: params.challengeId
          },
          headers: this.headers,
          jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
        });
        if (error) {
          return {
            data: null,
            error
          };
        }
        await this._saveSession(Object.assign({
          expires_at: Math.round(Date.now() / 1000) + data.expires_in
        }, data));
        await this._notifyAllSubscribers('MFA_CHALLENGE_VERIFIED', data);
        return {
          data,
          error
        };
      });
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: null,
          error
        };
      }
      throw error;
    }
  }
  /**
   * {@see GoTrueMFAApi#challenge}
   */
  async _challenge(params) {
    try {
      return await this._useSession(async result => {
        var _a;
        const {
          data: sessionData,
          error: sessionError
        } = result;
        if (sessionError) {
          return {
            data: null,
            error: sessionError
          };
        }
        return await (0, _fetch._request)(this.fetch, 'POST', `${this.url}/factors/${params.factorId}/challenge`, {
          headers: this.headers,
          jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
        });
      });
    } catch (error) {
      if ((0, _errors.isAuthError)(error)) {
        return {
          data: null,
          error
        };
      }
      throw error;
    }
  }
  /**
   * {@see GoTrueMFAApi#challengeAndVerify}
   */
  async _challengeAndVerify(params) {
    const {
      data: challengeData,
      error: challengeError
    } = await this._challenge({
      factorId: params.factorId
    });
    if (challengeError) {
      return {
        data: null,
        error: challengeError
      };
    }
    return await this._verify({
      factorId: params.factorId,
      challengeId: challengeData.id,
      code: params.code
    });
  }
  /**
   * {@see GoTrueMFAApi#listFactors}
   */
  async _listFactors() {
    const {
      data: {
        user
      },
      error: userError
    } = await this.getUser();
    if (userError) {
      return {
        data: null,
        error: userError
      };
    }
    const factors = (user === null || user === void 0 ? void 0 : user.factors) || [];
    const totp = factors.filter(factor => factor.factor_type === 'totp' && factor.status === 'verified');
    return {
      data: {
        all: factors,
        totp
      },
      error: null
    };
  }
  /**
   * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
   */
  async _getAuthenticatorAssuranceLevel() {
    return await this._useSession(async result => {
      var _a, _b;
      const {
        data: {
          session
        },
        error: sessionError
      } = result;
      if (sessionError) {
        return {
          data: null,
          error: sessionError
        };
      }
      if (!session) {
        return {
          data: {
            currentLevel: null,
            nextLevel: null,
            currentAuthenticationMethods: []
          },
          error: null
        };
      }
      const payload = this._decodeJWT(session.access_token);
      let currentLevel = null;
      if (payload.aal) {
        currentLevel = payload.aal;
      }
      let nextLevel = currentLevel;
      const verifiedFactors = (_b = (_a = session.user.factors) === null || _a === void 0 ? void 0 : _a.filter(factor => factor.status === 'verified')) !== null && _b !== void 0 ? _b : [];
      if (verifiedFactors.length > 0) {
        nextLevel = 'aal2';
      }
      const currentAuthenticationMethods = payload.amr || [];
      return {
        data: {
          currentLevel,
          nextLevel,
          currentAuthenticationMethods
        },
        error: null
      };
    });
  }
}
exports.default = GoTrueClient;
GoTrueClient.nextInstanceID = 0;
},{"./GoTrueAdminApi":"node_modules/@supabase/gotrue-js/dist/module/GoTrueAdminApi.js","./lib/constants":"node_modules/@supabase/gotrue-js/dist/module/lib/constants.js","./lib/errors":"node_modules/@supabase/gotrue-js/dist/module/lib/errors.js","./lib/fetch":"node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js","./lib/helpers":"node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js","./lib/local-storage":"node_modules/@supabase/gotrue-js/dist/module/lib/local-storage.js","./lib/polyfills":"node_modules/@supabase/gotrue-js/dist/module/lib/polyfills.js","./lib/version":"node_modules/@supabase/gotrue-js/dist/module/lib/version.js"}],"node_modules/@supabase/gotrue-js/dist/module/lib/types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"node_modules/@supabase/gotrue-js/dist/module/lib/locks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.internals = exports.NavigatorLockAcquireTimeoutError = void 0;
exports.navigatorLock = navigatorLock;
/**
 * @experimental
 */
const internals = {
  /**
   * @experimental
   */
  debug: !!(globalThis && globalThis.localStorage && globalThis.localStorage.getItem('supabase.gotrue-js.locks.debug') === 'true')
};
exports.internals = internals;
class NavigatorLockAcquireTimeoutError extends Error {
  constructor(message) {
    super(message);
    this.isAcquireTimeout = true;
  }
}
/**
 * Implements a global exclusive lock using the Navigator LockManager API. It
 * is available on all browsers released after 2022-03-15 with Safari being the
 * last one to release support. If the API is not available, this function will
 * throw. Make sure you check availablility before configuring {@link
 * GoTrueClient}.
 *
 * You can turn on debugging by setting the `supabase.gotrue-js.locks.debug`
 * local storage item to `true`.
 *
 * Internals:
 *
 * Since the LockManager API does not preserve stack traces for the async
 * function passed in the `request` method, a trick is used where acquiring the
 * lock releases a previously started promise to run the operation in the `fn`
 * function. The lock waits for that promise to finish (with or without error),
 * while the function will finally wait for the result anyway.
 *
 * @experimental
 *
 * @param name Name of the lock to be acquired.
 * @param acquireTimeout If negative, no timeout. If 0 an error is thrown if
 *                       the lock can't be acquired without waiting. If positive, the lock acquire
 *                       will time out after so many milliseconds. An error is
 *                       a timeout if it has `isAcquireTimeout` set to true.
 * @param fn The operation to run once the lock is acquired.
 */
exports.NavigatorLockAcquireTimeoutError = NavigatorLockAcquireTimeoutError;
async function navigatorLock(name, acquireTimeout, fn) {
  if (internals.debug) {
    console.log('@supabase/gotrue-js: navigatorLock: acquire lock', name, acquireTimeout);
  }
  let beginOperation = null;
  let rejectOperation = null;
  const beginOperationPromise = new Promise((accept, reject) => {
    beginOperation = accept;
    rejectOperation = reject;
  });
  // this lets us preserve stack traces over the operation, which the
  // navigator.locks.request function does not preserve well still
  const result = (async () => {
    await beginOperationPromise;
    if (internals.debug) {
      console.log('@supabase/gotrue-js: navigatorLock: operation start');
    }
    try {
      return await fn();
    } finally {
      if (internals.debug) {
        console.log('@supabase/gotrue-js: navigatorLock: operation end');
      }
    }
  })();
  const abortController = new globalThis.AbortController();
  if (acquireTimeout > 0) {
    setTimeout(() => {
      beginOperation = null;
      abortController.abort();
      if (rejectOperation) {
        if (internals.debug) {
          console.log('@supabase/gotrue-js: navigatorLock acquire timed out', name);
        }
        if (rejectOperation) {
          rejectOperation(new NavigatorLockAcquireTimeoutError(`Acquiring an exclusive Navigator LockManager lock "${name}" timed out after ${acquireTimeout}ms`));
        }
        beginOperation = null;
        rejectOperation = null;
      }
    }, acquireTimeout);
  }
  await globalThis.navigator.locks.request(name, {
    mode: 'exclusive',
    ifAvailable: acquireTimeout === 0,
    signal: abortController.signal
  }, async lock => {
    if (lock) {
      if (internals.debug) {
        console.log('@supabase/gotrue-js: navigatorLock acquired', name);
      }
      try {
        if (beginOperation) {
          beginOperation();
          beginOperation = null;
          rejectOperation = null;
          await result;
        }
      } catch (e) {
        // not important to handle the error here
      } finally {
        if (internals.debug) {
          console.log('@supabase/gotrue-js: navigatorLock released', name);
        }
      }
    } else {
      if (internals.debug) {
        console.log('@supabase/gotrue-js: navigatorLock not immediately available', name);
      }
      // no lock was available because acquireTimeout === 0
      const timeout = new Error(`Acquiring an exclusive Navigator LockManager lock "${name}" immediately failed`);
      timeout.isAcquireTimeout = true;
      if (rejectOperation) {
        rejectOperation(new NavigatorLockAcquireTimeoutError(`Acquiring an exclusive Navigator LockManager lock "${name}" immediately failed`));
      }
      beginOperation = null;
      rejectOperation = null;
    }
  });
  return await result;
}
},{}],"node_modules/@supabase/gotrue-js/dist/module/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  GoTrueAdminApi: true,
  GoTrueClient: true,
  navigatorLock: true,
  NavigatorLockAcquireTimeoutError: true,
  lockInternals: true
};
Object.defineProperty(exports, "GoTrueAdminApi", {
  enumerable: true,
  get: function () {
    return _GoTrueAdminApi.default;
  }
});
Object.defineProperty(exports, "GoTrueClient", {
  enumerable: true,
  get: function () {
    return _GoTrueClient.default;
  }
});
Object.defineProperty(exports, "NavigatorLockAcquireTimeoutError", {
  enumerable: true,
  get: function () {
    return _locks.NavigatorLockAcquireTimeoutError;
  }
});
Object.defineProperty(exports, "lockInternals", {
  enumerable: true,
  get: function () {
    return _locks.internals;
  }
});
Object.defineProperty(exports, "navigatorLock", {
  enumerable: true,
  get: function () {
    return _locks.navigatorLock;
  }
});
var _GoTrueAdminApi = _interopRequireDefault(require("./GoTrueAdminApi"));
var _GoTrueClient = _interopRequireDefault(require("./GoTrueClient"));
var _types = require("./lib/types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
var _errors = require("./lib/errors");
Object.keys(_errors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _errors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _errors[key];
    }
  });
});
var _locks = require("./lib/locks");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./GoTrueAdminApi":"node_modules/@supabase/gotrue-js/dist/module/GoTrueAdminApi.js","./GoTrueClient":"node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js","./lib/types":"node_modules/@supabase/gotrue-js/dist/module/lib/types.js","./lib/errors":"node_modules/@supabase/gotrue-js/dist/module/lib/errors.js","./lib/locks":"node_modules/@supabase/gotrue-js/dist/module/lib/locks.js"}],"node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SupabaseAuthClient = void 0;
var _gotrueJs = require("@supabase/gotrue-js");
class SupabaseAuthClient extends _gotrueJs.GoTrueClient {
  constructor(options) {
    super(options);
  }
}
exports.SupabaseAuthClient = SupabaseAuthClient;
},{"@supabase/gotrue-js":"node_modules/@supabase/gotrue-js/dist/module/index.js"}],"node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _functionsJs = require("@supabase/functions-js");
var _postgrestJs = require("@supabase/postgrest-js");
var _realtimeJs = require("@supabase/realtime-js");
var _storageJs = require("@supabase/storage-js");
var _constants = require("./lib/constants");
var _fetch = require("./lib/fetch");
var _helpers = require("./lib/helpers");
var _SupabaseAuthClient = require("./lib/SupabaseAuthClient");
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const DEFAULT_GLOBAL_OPTIONS = {
  headers: _constants.DEFAULT_HEADERS
};
const DEFAULT_DB_OPTIONS = {
  schema: 'public'
};
const DEFAULT_AUTH_OPTIONS = {
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  flowType: 'implicit'
};
const DEFAULT_REALTIME_OPTIONS = {};
/**
 * Supabase Client.
 *
 * An isomorphic Javascript client for interacting with Postgres.
 */
class SupabaseClient {
  /**
   * Create a new client for use in the browser.
   * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
   * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
   * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
   * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
   * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
   * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
   * @param options.realtime Options passed along to realtime-js constructor.
   * @param options.global.fetch A custom fetch implementation.
   * @param options.global.headers Any additional headers to send with each network request.
   */
  constructor(supabaseUrl, supabaseKey, options) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
    if (!supabaseUrl) throw new Error('supabaseUrl is required.');
    if (!supabaseKey) throw new Error('supabaseKey is required.');
    const _supabaseUrl = (0, _helpers.stripTrailingSlash)(supabaseUrl);
    this.realtimeUrl = `${_supabaseUrl}/realtime/v1`.replace(/^http/i, 'ws');
    this.authUrl = `${_supabaseUrl}/auth/v1`;
    this.storageUrl = `${_supabaseUrl}/storage/v1`;
    this.functionsUrl = `${_supabaseUrl}/functions/v1`;
    // default storage key uses the supabase project ref as a namespace
    const defaultStorageKey = `sb-${new URL(this.authUrl).hostname.split('.')[0]}-auth-token`;
    const DEFAULTS = {
      db: DEFAULT_DB_OPTIONS,
      realtime: DEFAULT_REALTIME_OPTIONS,
      auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), {
        storageKey: defaultStorageKey
      }),
      global: DEFAULT_GLOBAL_OPTIONS
    };
    const settings = (0, _helpers.applySettingDefaults)(options !== null && options !== void 0 ? options : {}, DEFAULTS);
    this.storageKey = (_b = (_a = settings.auth) === null || _a === void 0 ? void 0 : _a.storageKey) !== null && _b !== void 0 ? _b : '';
    this.headers = (_d = (_c = settings.global) === null || _c === void 0 ? void 0 : _c.headers) !== null && _d !== void 0 ? _d : {};
    this.auth = this._initSupabaseAuthClient((_e = settings.auth) !== null && _e !== void 0 ? _e : {}, this.headers, (_f = settings.global) === null || _f === void 0 ? void 0 : _f.fetch);
    this.fetch = (0, _fetch.fetchWithAuth)(supabaseKey, this._getAccessToken.bind(this), (_g = settings.global) === null || _g === void 0 ? void 0 : _g.fetch);
    this.realtime = this._initRealtimeClient(Object.assign({
      headers: this.headers
    }, settings.realtime));
    this.rest = new _postgrestJs.PostgrestClient(`${_supabaseUrl}/rest/v1`, {
      headers: this.headers,
      schema: (_h = settings.db) === null || _h === void 0 ? void 0 : _h.schema,
      fetch: this.fetch
    });
    this._listenForAuthEvents();
  }
  /**
   * Supabase Functions allows you to deploy and invoke edge functions.
   */
  get functions() {
    return new _functionsJs.FunctionsClient(this.functionsUrl, {
      headers: this.headers,
      customFetch: this.fetch
    });
  }
  /**
   * Supabase Storage allows you to manage user-generated content, such as photos or videos.
   */
  get storage() {
    return new _storageJs.StorageClient(this.storageUrl, this.headers, this.fetch);
  }
  /**
   * Perform a query on a table or a view.
   *
   * @param relation - The table or view name to query
   */
  from(relation) {
    return this.rest.from(relation);
  }
  /**
   * Perform a function call.
   *
   * @param fn - The function name to call
   * @param args - The arguments to pass to the function call
   * @param options - Named parameters
   * @param options.head - When set to `true`, `data` will not be returned.
   * Useful if you only need the count.
   * @param options.count - Count algorithm to use to count rows returned by the
   * function. Only applicable for [set-returning
   * functions](https://www.postgresql.org/docs/current/functions-srf.html).
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  rpc(fn, args = {}, options) {
    return this.rest.rpc(fn, args, options);
  }
  /**
   * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
   *
   * @param {string} name - The name of the Realtime channel.
   * @param {Object} opts - The options to pass to the Realtime channel.
   *
   */
  channel(name, opts = {
    config: {}
  }) {
    return this.realtime.channel(name, opts);
  }
  /**
   * Returns all Realtime channels.
   */
  getChannels() {
    return this.realtime.getChannels();
  }
  /**
   * Unsubscribes and removes Realtime channel from Realtime client.
   *
   * @param {RealtimeChannel} channel - The name of the Realtime channel.
   *
   */
  removeChannel(channel) {
    return this.realtime.removeChannel(channel);
  }
  /**
   * Unsubscribes and removes all Realtime channels from Realtime client.
   */
  removeAllChannels() {
    return this.realtime.removeAllChannels();
  }
  _getAccessToken() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
      const {
        data
      } = yield this.auth.getSession();
      return (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : null;
    });
  }
  _initSupabaseAuthClient({
    autoRefreshToken,
    persistSession,
    detectSessionInUrl,
    storage,
    storageKey,
    flowType,
    debug
  }, headers, fetch) {
    const authHeaders = {
      Authorization: `Bearer ${this.supabaseKey}`,
      apikey: `${this.supabaseKey}`
    };
    return new _SupabaseAuthClient.SupabaseAuthClient({
      url: this.authUrl,
      headers: Object.assign(Object.assign({}, authHeaders), headers),
      storageKey: storageKey,
      autoRefreshToken,
      persistSession,
      detectSessionInUrl,
      storage,
      flowType,
      debug,
      fetch
    });
  }
  _initRealtimeClient(options) {
    return new _realtimeJs.RealtimeClient(this.realtimeUrl, Object.assign(Object.assign({}, options), {
      params: Object.assign({
        apikey: this.supabaseKey
      }, options === null || options === void 0 ? void 0 : options.params)
    }));
  }
  _listenForAuthEvents() {
    let data = this.auth.onAuthStateChange((event, session) => {
      this._handleTokenChanged(event, 'CLIENT', session === null || session === void 0 ? void 0 : session.access_token);
    });
    return data;
  }
  _handleTokenChanged(event, source, token) {
    if ((event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') && this.changedAccessToken !== token) {
      // Token has changed
      this.realtime.setAuth(token !== null && token !== void 0 ? token : null);
      this.changedAccessToken = token;
    } else if (event === 'SIGNED_OUT') {
      // Token is removed
      this.realtime.setAuth(this.supabaseKey);
      if (source == 'STORAGE') this.auth.signOut();
      this.changedAccessToken = undefined;
    }
  }
}
exports.default = SupabaseClient;
},{"@supabase/functions-js":"node_modules/@supabase/functions-js/dist/module/index.js","@supabase/postgrest-js":"node_modules/@supabase/postgrest-js/dist/module/index.js","@supabase/realtime-js":"node_modules/@supabase/realtime-js/dist/module/index.js","@supabase/storage-js":"node_modules/@supabase/storage-js/dist/module/index.js","./lib/constants":"node_modules/@supabase/supabase-js/dist/module/lib/constants.js","./lib/fetch":"node_modules/@supabase/supabase-js/dist/module/lib/fetch.js","./lib/helpers":"node_modules/@supabase/supabase-js/dist/module/lib/helpers.js","./lib/SupabaseAuthClient":"node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js"}],"node_modules/@supabase/supabase-js/dist/module/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  createClient: true,
  SupabaseClient: true,
  FunctionsHttpError: true,
  FunctionsFetchError: true,
  FunctionsRelayError: true,
  FunctionsError: true
};
Object.defineProperty(exports, "FunctionsError", {
  enumerable: true,
  get: function () {
    return _functionsJs.FunctionsError;
  }
});
Object.defineProperty(exports, "FunctionsFetchError", {
  enumerable: true,
  get: function () {
    return _functionsJs.FunctionsFetchError;
  }
});
Object.defineProperty(exports, "FunctionsHttpError", {
  enumerable: true,
  get: function () {
    return _functionsJs.FunctionsHttpError;
  }
});
Object.defineProperty(exports, "FunctionsRelayError", {
  enumerable: true,
  get: function () {
    return _functionsJs.FunctionsRelayError;
  }
});
Object.defineProperty(exports, "SupabaseClient", {
  enumerable: true,
  get: function () {
    return _SupabaseClient.default;
  }
});
exports.createClient = void 0;
var _SupabaseClient = _interopRequireDefault(require("./SupabaseClient"));
var _gotrueJs = require("@supabase/gotrue-js");
Object.keys(_gotrueJs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _gotrueJs[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _gotrueJs[key];
    }
  });
});
var _functionsJs = require("@supabase/functions-js");
var _realtimeJs = require("@supabase/realtime-js");
Object.keys(_realtimeJs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _realtimeJs[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _realtimeJs[key];
    }
  });
});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Creates a new Supabase Client.
 */
const createClient = (supabaseUrl, supabaseKey, options) => {
  return new _SupabaseClient.default(supabaseUrl, supabaseKey, options);
};
exports.createClient = createClient;
},{"./SupabaseClient":"node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js","@supabase/gotrue-js":"node_modules/@supabase/gotrue-js/dist/module/index.js","@supabase/functions-js":"node_modules/@supabase/functions-js/dist/module/index.js","@supabase/realtime-js":"node_modules/@supabase/realtime-js/dist/module/index.js"}],"demo.js":[function(require,module,exports) {
"use strict";

var _supabaseJs = require("@supabase/supabase-js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// Replace these with your Supabase project URL and public API key
var supabaseUrl = 'https://qcmzcfublrqyfgdiforw.supabase.co';
var supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjbXpjZnVibHJxeWZnZGlmb3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyMjA4NjUsImV4cCI6MjAwNTc5Njg2NX0.wTZbmgx2Z9_UZLnlUYy0kMyn2nnetIe4G06LPl5HX10';
var supabase = (0, _supabaseJs.createClient)(supabaseUrl, supabaseKey);
window.addEventListener('load', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var _yield$supabase$from$, data, error, leaderboardData, leaderboardContainer;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.prev = 0;
        _context.next = 3;
        return supabase.from('Medals').select('country_name', 'medal_type');
      case 3:
        _yield$supabase$from$ = _context.sent;
        data = _yield$supabase$from$.data;
        error = _yield$supabase$from$.error;
        if (!error) {
          _context.next = 8;
          break;
        }
        throw new Error(error.message);
      case 8:
        // Process the data to calculate the medal counts for each country.
        leaderboardData = generateLeaderboardData(data); // Display the leaderboard data in the container.
        leaderboardContainer = document.getElementById('leaderboardContainer');
        leaderboardContainer.innerHTML = generateLeaderboardHTML(leaderboardData);
        _context.next = 16;
        break;
      case 13:
        _context.prev = 13;
        _context.t0 = _context["catch"](0);
        console.error('Error fetching leaderboard:', _context.t0.message);
      case 16:
      case "end":
        return _context.stop();
    }
  }, _callee, null, [[0, 13]]);
})));
function generateLeaderboardData(data) {
  // Create an object to store the medal counts for each country.
  var medalCountsByCountry = {};

  // Loop through the data and count the medals for each country.
  data.forEach(function (entry) {
    var country_name = entry.country_name,
      medal_type = entry.medal_type;
    if (!medalCountsByCountry[country_name]) {
      medalCountsByCountry[country_name] = {
        country_name: country_name,
        gold_medals: 0,
        silver_medals: 0,
        bronze_medals: 0
      };
    }
    if (medal_type === 'GOLD') {
      medalCountsByCountry[country_name].gold_medals++;
    } else if (medal_type === 'SILVER') {
      medalCountsByCountry[country_name].silver_medals++;
    } else if (medal_type === 'BRONZE') {
      medalCountsByCountry[country_name].bronze_medals++;
    }
  });

  // Convert the object values to an array for easier sorting.
  var leaderboardData = Object.values(medalCountsByCountry);

  // Sort the array based on the total number of medals.
  leaderboardData.sort(function (a, b) {
    var totalMedalsA = a.gold_medals + a.silver_medals + a.bronze_medals;
    var totalMedalsB = b.gold_medals + b.silver_medals + b.bronze_medals;
    return totalMedalsB - totalMedalsA;
  });
  return leaderboardData;
}
function generateLeaderboardHTML(data) {
  // Create a table to display the leaderboard.
  var html = '<table>';
  html += '<tr><th>Country</th><th>Gold</th><th>Silver</th><th>Bronze</th><th>Total</th></tr>';

  // Loop through the leaderboard data and add rows to the table.
  data.forEach(function (countryData) {
    var country_name = countryData.country_name,
      gold_medals = countryData.gold_medals,
      silver_medals = countryData.silver_medals,
      bronze_medals = countryData.bronze_medals;
    var totalMedals = gold_medals + silver_medals + bronze_medals;
    html += "<tr><td>".concat(country_name, "</td><td>").concat(gold_medals, "</td><td>").concat(silver_medals, "</td><td>").concat(bronze_medals, "</td><td>").concat(totalMedals, "</td></tr>");
  });
  html += '</table>';
  return html;
}
},{"@supabase/supabase-js":"node_modules/@supabase/supabase-js/dist/module/index.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("./demo.js");
},{"./demo.js":"demo.js"}],"../../../../AppData/Roaming/nvm/v18.15.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61415" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}],"../../../../AppData/Roaming/nvm/v18.15.0/node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js":[function(require,module,exports) {
module.exports = function loadJSBundle(bundle) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = bundle;
    script.onerror = function (e) {
      script.onerror = script.onload = null;
      reject(e);
    };
    script.onload = function () {
      script.onerror = script.onload = null;
      resolve();
    };
    document.getElementsByTagName('head')[0].appendChild(script);
  });
};
},{}],0:[function(require,module,exports) {
var b=require("../../../../AppData/Roaming/nvm/v18.15.0/node_modules/parcel-bundler/src/builtins/bundle-loader.js");b.register("js",require("../../../../AppData/Roaming/nvm/v18.15.0/node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js"));b.load([["browser-ponyfill.74474147.js","node_modules/cross-fetch/dist/browser-ponyfill.js"]]).then(function(){require("index.js");});
},{}]},{},["../../../../AppData/Roaming/nvm/v18.15.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js",0], null)
//# sourceMappingURL=/my-supabase-project.e31bb0bc.js.map