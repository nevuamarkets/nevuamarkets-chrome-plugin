var process = { env: { LOG_LEVEL: "warn" } };
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/ms/index.js
  var require_ms = __commonJS({
    "node_modules/ms/index.js"(exports2, module2) {
      var s = 1e3;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var w = d * 7;
      var y = d * 365.25;
      module2.exports = function(val, options2) {
        options2 = options2 || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse(val);
        } else if (type === "number" && isFinite(val)) {
          return options2.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error(
          "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
        );
      };
      function parse(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str
        );
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y;
          case "weeks":
          case "week":
          case "w":
            return n * w;
          case "days":
          case "day":
          case "d":
            return n * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      function fmtShort(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return Math.round(ms / d) + "d";
        }
        if (msAbs >= h) {
          return Math.round(ms / h) + "h";
        }
        if (msAbs >= m) {
          return Math.round(ms / m) + "m";
        }
        if (msAbs >= s) {
          return Math.round(ms / s) + "s";
        }
        return ms + "ms";
      }
      function fmtLong(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return plural(ms, msAbs, d, "day");
        }
        if (msAbs >= h) {
          return plural(ms, msAbs, h, "hour");
        }
        if (msAbs >= m) {
          return plural(ms, msAbs, m, "minute");
        }
        if (msAbs >= s) {
          return plural(ms, msAbs, s, "second");
        }
        return ms + " ms";
      }
      function plural(ms, msAbs, n, name) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
      }
    }
  });

  // node_modules/lodash/lodash.js
  var require_lodash = __commonJS({
    "node_modules/lodash/lodash.js"(exports2, module2) {
      (function() {
        var undefined2;
        var VERSION = "4.17.21";
        var LARGE_ARRAY_SIZE = 200;
        var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
        var HASH_UNDEFINED = "__lodash_hash_undefined__";
        var MAX_MEMOIZE_SIZE = 500;
        var PLACEHOLDER = "__lodash_placeholder__";
        var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
        var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
        var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
        var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
        var HOT_COUNT = 800, HOT_SPAN = 16;
        var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
        var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
        var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
        var wrapFlags = [
          ["ary", WRAP_ARY_FLAG],
          ["bind", WRAP_BIND_FLAG],
          ["bindKey", WRAP_BIND_KEY_FLAG],
          ["curry", WRAP_CURRY_FLAG],
          ["curryRight", WRAP_CURRY_RIGHT_FLAG],
          ["flip", WRAP_FLIP_FLAG],
          ["partial", WRAP_PARTIAL_FLAG],
          ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
          ["rearg", WRAP_REARG_FLAG]
        ];
        var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
        var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
        var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
        var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
        var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
        var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
        var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
        var reTrimStart = /^\s+/;
        var reWhitespace = /\s/;
        var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
        var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
        var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
        var reEscapeChar = /\\(\\)?/g;
        var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
        var reFlags = /\w*$/;
        var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
        var reIsBinary = /^0b[01]+$/i;
        var reIsHostCtor = /^\[object .+?Constructor\]$/;
        var reIsOctal = /^0o[0-7]+$/i;
        var reIsUint = /^(?:0|[1-9]\d*)$/;
        var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
        var reNoMatch = /($^)/;
        var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
        var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
        var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
        var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
        var reApos = RegExp(rsApos, "g");
        var reComboMark = RegExp(rsCombo, "g");
        var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
        var reUnicodeWord = RegExp([
          rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
          rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
          rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
          rsUpper + "+" + rsOptContrUpper,
          rsOrdUpper,
          rsOrdLower,
          rsDigits,
          rsEmoji
        ].join("|"), "g");
        var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
        var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
        var contextProps = [
          "Array",
          "Buffer",
          "DataView",
          "Date",
          "Error",
          "Float32Array",
          "Float64Array",
          "Function",
          "Int8Array",
          "Int16Array",
          "Int32Array",
          "Map",
          "Math",
          "Object",
          "Promise",
          "RegExp",
          "Set",
          "String",
          "Symbol",
          "TypeError",
          "Uint8Array",
          "Uint8ClampedArray",
          "Uint16Array",
          "Uint32Array",
          "WeakMap",
          "_",
          "clearTimeout",
          "isFinite",
          "parseInt",
          "setTimeout"
        ];
        var templateCounter = -1;
        var typedArrayTags = {};
        typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
        typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
        var cloneableTags = {};
        cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
        cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
        var deburredLetters = {
          // Latin-1 Supplement block.
          "\xC0": "A",
          "\xC1": "A",
          "\xC2": "A",
          "\xC3": "A",
          "\xC4": "A",
          "\xC5": "A",
          "\xE0": "a",
          "\xE1": "a",
          "\xE2": "a",
          "\xE3": "a",
          "\xE4": "a",
          "\xE5": "a",
          "\xC7": "C",
          "\xE7": "c",
          "\xD0": "D",
          "\xF0": "d",
          "\xC8": "E",
          "\xC9": "E",
          "\xCA": "E",
          "\xCB": "E",
          "\xE8": "e",
          "\xE9": "e",
          "\xEA": "e",
          "\xEB": "e",
          "\xCC": "I",
          "\xCD": "I",
          "\xCE": "I",
          "\xCF": "I",
          "\xEC": "i",
          "\xED": "i",
          "\xEE": "i",
          "\xEF": "i",
          "\xD1": "N",
          "\xF1": "n",
          "\xD2": "O",
          "\xD3": "O",
          "\xD4": "O",
          "\xD5": "O",
          "\xD6": "O",
          "\xD8": "O",
          "\xF2": "o",
          "\xF3": "o",
          "\xF4": "o",
          "\xF5": "o",
          "\xF6": "o",
          "\xF8": "o",
          "\xD9": "U",
          "\xDA": "U",
          "\xDB": "U",
          "\xDC": "U",
          "\xF9": "u",
          "\xFA": "u",
          "\xFB": "u",
          "\xFC": "u",
          "\xDD": "Y",
          "\xFD": "y",
          "\xFF": "y",
          "\xC6": "Ae",
          "\xE6": "ae",
          "\xDE": "Th",
          "\xFE": "th",
          "\xDF": "ss",
          // Latin Extended-A block.
          "\u0100": "A",
          "\u0102": "A",
          "\u0104": "A",
          "\u0101": "a",
          "\u0103": "a",
          "\u0105": "a",
          "\u0106": "C",
          "\u0108": "C",
          "\u010A": "C",
          "\u010C": "C",
          "\u0107": "c",
          "\u0109": "c",
          "\u010B": "c",
          "\u010D": "c",
          "\u010E": "D",
          "\u0110": "D",
          "\u010F": "d",
          "\u0111": "d",
          "\u0112": "E",
          "\u0114": "E",
          "\u0116": "E",
          "\u0118": "E",
          "\u011A": "E",
          "\u0113": "e",
          "\u0115": "e",
          "\u0117": "e",
          "\u0119": "e",
          "\u011B": "e",
          "\u011C": "G",
          "\u011E": "G",
          "\u0120": "G",
          "\u0122": "G",
          "\u011D": "g",
          "\u011F": "g",
          "\u0121": "g",
          "\u0123": "g",
          "\u0124": "H",
          "\u0126": "H",
          "\u0125": "h",
          "\u0127": "h",
          "\u0128": "I",
          "\u012A": "I",
          "\u012C": "I",
          "\u012E": "I",
          "\u0130": "I",
          "\u0129": "i",
          "\u012B": "i",
          "\u012D": "i",
          "\u012F": "i",
          "\u0131": "i",
          "\u0134": "J",
          "\u0135": "j",
          "\u0136": "K",
          "\u0137": "k",
          "\u0138": "k",
          "\u0139": "L",
          "\u013B": "L",
          "\u013D": "L",
          "\u013F": "L",
          "\u0141": "L",
          "\u013A": "l",
          "\u013C": "l",
          "\u013E": "l",
          "\u0140": "l",
          "\u0142": "l",
          "\u0143": "N",
          "\u0145": "N",
          "\u0147": "N",
          "\u014A": "N",
          "\u0144": "n",
          "\u0146": "n",
          "\u0148": "n",
          "\u014B": "n",
          "\u014C": "O",
          "\u014E": "O",
          "\u0150": "O",
          "\u014D": "o",
          "\u014F": "o",
          "\u0151": "o",
          "\u0154": "R",
          "\u0156": "R",
          "\u0158": "R",
          "\u0155": "r",
          "\u0157": "r",
          "\u0159": "r",
          "\u015A": "S",
          "\u015C": "S",
          "\u015E": "S",
          "\u0160": "S",
          "\u015B": "s",
          "\u015D": "s",
          "\u015F": "s",
          "\u0161": "s",
          "\u0162": "T",
          "\u0164": "T",
          "\u0166": "T",
          "\u0163": "t",
          "\u0165": "t",
          "\u0167": "t",
          "\u0168": "U",
          "\u016A": "U",
          "\u016C": "U",
          "\u016E": "U",
          "\u0170": "U",
          "\u0172": "U",
          "\u0169": "u",
          "\u016B": "u",
          "\u016D": "u",
          "\u016F": "u",
          "\u0171": "u",
          "\u0173": "u",
          "\u0174": "W",
          "\u0175": "w",
          "\u0176": "Y",
          "\u0177": "y",
          "\u0178": "Y",
          "\u0179": "Z",
          "\u017B": "Z",
          "\u017D": "Z",
          "\u017A": "z",
          "\u017C": "z",
          "\u017E": "z",
          "\u0132": "IJ",
          "\u0133": "ij",
          "\u0152": "Oe",
          "\u0153": "oe",
          "\u0149": "'n",
          "\u017F": "s"
        };
        var htmlEscapes = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        };
        var htmlUnescapes = {
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&quot;": '"',
          "&#39;": "'"
        };
        var stringEscapes = {
          "\\": "\\",
          "'": "'",
          "\n": "n",
          "\r": "r",
          "\u2028": "u2028",
          "\u2029": "u2029"
        };
        var freeParseFloat = parseFloat, freeParseInt = parseInt;
        var freeGlobal = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis;
        var freeSelf = typeof self == "object" && self && self.Object === Object && self;
        var root = freeGlobal || freeSelf || Function("return this")();
        var freeExports = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
        var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
        var moduleExports = freeModule && freeModule.exports === freeExports;
        var freeProcess = moduleExports && freeGlobal.process;
        var nodeUtil = function() {
          try {
            var types = freeModule && freeModule.require && freeModule.require("util").types;
            if (types) {
              return types;
            }
            return freeProcess && freeProcess.binding && freeProcess.binding("util");
          } catch (e) {
          }
        }();
        var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
        function apply(func, thisArg, args) {
          switch (args.length) {
            case 0:
              return func.call(thisArg);
            case 1:
              return func.call(thisArg, args[0]);
            case 2:
              return func.call(thisArg, args[0], args[1]);
            case 3:
              return func.call(thisArg, args[0], args[1], args[2]);
          }
          return func.apply(thisArg, args);
        }
        function arrayAggregator(array, setter, iteratee, accumulator) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            var value = array[index];
            setter(accumulator, value, iteratee(value), array);
          }
          return accumulator;
        }
        function arrayEach(array, iteratee) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
              break;
            }
          }
          return array;
        }
        function arrayEachRight(array, iteratee) {
          var length = array == null ? 0 : array.length;
          while (length--) {
            if (iteratee(array[length], length, array) === false) {
              break;
            }
          }
          return array;
        }
        function arrayEvery(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (!predicate(array[index], index, array)) {
              return false;
            }
          }
          return true;
        }
        function arrayFilter(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result[resIndex++] = value;
            }
          }
          return result;
        }
        function arrayIncludes(array, value) {
          var length = array == null ? 0 : array.length;
          return !!length && baseIndexOf(array, value, 0) > -1;
        }
        function arrayIncludesWith(array, value, comparator) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (comparator(value, array[index])) {
              return true;
            }
          }
          return false;
        }
        function arrayMap(array, iteratee) {
          var index = -1, length = array == null ? 0 : array.length, result = Array(length);
          while (++index < length) {
            result[index] = iteratee(array[index], index, array);
          }
          return result;
        }
        function arrayPush(array, values) {
          var index = -1, length = values.length, offset = array.length;
          while (++index < length) {
            array[offset + index] = values[index];
          }
          return array;
        }
        function arrayReduce(array, iteratee, accumulator, initAccum) {
          var index = -1, length = array == null ? 0 : array.length;
          if (initAccum && length) {
            accumulator = array[++index];
          }
          while (++index < length) {
            accumulator = iteratee(accumulator, array[index], index, array);
          }
          return accumulator;
        }
        function arrayReduceRight(array, iteratee, accumulator, initAccum) {
          var length = array == null ? 0 : array.length;
          if (initAccum && length) {
            accumulator = array[--length];
          }
          while (length--) {
            accumulator = iteratee(accumulator, array[length], length, array);
          }
          return accumulator;
        }
        function arraySome(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (predicate(array[index], index, array)) {
              return true;
            }
          }
          return false;
        }
        var asciiSize = baseProperty("length");
        function asciiToArray(string) {
          return string.split("");
        }
        function asciiWords(string) {
          return string.match(reAsciiWord) || [];
        }
        function baseFindKey(collection, predicate, eachFunc) {
          var result;
          eachFunc(collection, function(value, key, collection2) {
            if (predicate(value, key, collection2)) {
              result = key;
              return false;
            }
          });
          return result;
        }
        function baseFindIndex(array, predicate, fromIndex, fromRight) {
          var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
          while (fromRight ? index-- : ++index < length) {
            if (predicate(array[index], index, array)) {
              return index;
            }
          }
          return -1;
        }
        function baseIndexOf(array, value, fromIndex) {
          return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
        }
        function baseIndexOfWith(array, value, fromIndex, comparator) {
          var index = fromIndex - 1, length = array.length;
          while (++index < length) {
            if (comparator(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function baseIsNaN(value) {
          return value !== value;
        }
        function baseMean(array, iteratee) {
          var length = array == null ? 0 : array.length;
          return length ? baseSum(array, iteratee) / length : NAN;
        }
        function baseProperty(key) {
          return function(object) {
            return object == null ? undefined2 : object[key];
          };
        }
        function basePropertyOf(object) {
          return function(key) {
            return object == null ? undefined2 : object[key];
          };
        }
        function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
          eachFunc(collection, function(value, index, collection2) {
            accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
          });
          return accumulator;
        }
        function baseSortBy(array, comparer) {
          var length = array.length;
          array.sort(comparer);
          while (length--) {
            array[length] = array[length].value;
          }
          return array;
        }
        function baseSum(array, iteratee) {
          var result, index = -1, length = array.length;
          while (++index < length) {
            var current = iteratee(array[index]);
            if (current !== undefined2) {
              result = result === undefined2 ? current : result + current;
            }
          }
          return result;
        }
        function baseTimes(n, iteratee) {
          var index = -1, result = Array(n);
          while (++index < n) {
            result[index] = iteratee(index);
          }
          return result;
        }
        function baseToPairs(object, props) {
          return arrayMap(props, function(key) {
            return [key, object[key]];
          });
        }
        function baseTrim(string) {
          return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
        }
        function baseUnary(func) {
          return function(value) {
            return func(value);
          };
        }
        function baseValues(object, props) {
          return arrayMap(props, function(key) {
            return object[key];
          });
        }
        function cacheHas(cache, key) {
          return cache.has(key);
        }
        function charsStartIndex(strSymbols, chrSymbols) {
          var index = -1, length = strSymbols.length;
          while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
          }
          return index;
        }
        function charsEndIndex(strSymbols, chrSymbols) {
          var index = strSymbols.length;
          while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
          }
          return index;
        }
        function countHolders(array, placeholder) {
          var length = array.length, result = 0;
          while (length--) {
            if (array[length] === placeholder) {
              ++result;
            }
          }
          return result;
        }
        var deburrLetter = basePropertyOf(deburredLetters);
        var escapeHtmlChar = basePropertyOf(htmlEscapes);
        function escapeStringChar(chr) {
          return "\\" + stringEscapes[chr];
        }
        function getValue(object, key) {
          return object == null ? undefined2 : object[key];
        }
        function hasUnicode(string) {
          return reHasUnicode.test(string);
        }
        function hasUnicodeWord(string) {
          return reHasUnicodeWord.test(string);
        }
        function iteratorToArray(iterator) {
          var data, result = [];
          while (!(data = iterator.next()).done) {
            result.push(data.value);
          }
          return result;
        }
        function mapToArray(map) {
          var index = -1, result = Array(map.size);
          map.forEach(function(value, key) {
            result[++index] = [key, value];
          });
          return result;
        }
        function overArg(func, transform) {
          return function(arg) {
            return func(transform(arg));
          };
        }
        function replaceHolders(array, placeholder) {
          var index = -1, length = array.length, resIndex = 0, result = [];
          while (++index < length) {
            var value = array[index];
            if (value === placeholder || value === PLACEHOLDER) {
              array[index] = PLACEHOLDER;
              result[resIndex++] = index;
            }
          }
          return result;
        }
        function setToArray(set) {
          var index = -1, result = Array(set.size);
          set.forEach(function(value) {
            result[++index] = value;
          });
          return result;
        }
        function setToPairs(set) {
          var index = -1, result = Array(set.size);
          set.forEach(function(value) {
            result[++index] = [value, value];
          });
          return result;
        }
        function strictIndexOf(array, value, fromIndex) {
          var index = fromIndex - 1, length = array.length;
          while (++index < length) {
            if (array[index] === value) {
              return index;
            }
          }
          return -1;
        }
        function strictLastIndexOf(array, value, fromIndex) {
          var index = fromIndex + 1;
          while (index--) {
            if (array[index] === value) {
              return index;
            }
          }
          return index;
        }
        function stringSize(string) {
          return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
        }
        function stringToArray(string) {
          return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
        }
        function trimmedEndIndex(string) {
          var index = string.length;
          while (index-- && reWhitespace.test(string.charAt(index))) {
          }
          return index;
        }
        var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
        function unicodeSize(string) {
          var result = reUnicode.lastIndex = 0;
          while (reUnicode.test(string)) {
            ++result;
          }
          return result;
        }
        function unicodeToArray(string) {
          return string.match(reUnicode) || [];
        }
        function unicodeWords(string) {
          return string.match(reUnicodeWord) || [];
        }
        var runInContext = function runInContext2(context) {
          context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
          var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
          var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
          var coreJsData = context["__core-js_shared__"];
          var funcToString = funcProto.toString;
          var hasOwnProperty = objectProto.hasOwnProperty;
          var idCounter = 0;
          var maskSrcKey = function() {
            var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
            return uid ? "Symbol(src)_1." + uid : "";
          }();
          var nativeObjectToString = objectProto.toString;
          var objectCtorString = funcToString.call(Object2);
          var oldDash = root._;
          var reIsNative = RegExp2(
            "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
          );
          var Buffer2 = moduleExports ? context.Buffer : undefined2, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined2, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined2, symIterator = Symbol2 ? Symbol2.iterator : undefined2, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined2;
          var defineProperty = function() {
            try {
              var func = getNative(Object2, "defineProperty");
              func({}, "", {});
              return func;
            } catch (e) {
            }
          }();
          var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
          var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined2, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
          var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
          var metaMap = WeakMap && new WeakMap();
          var realNames = {};
          var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap);
          var symbolProto = Symbol2 ? Symbol2.prototype : undefined2, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined2, symbolToString = symbolProto ? symbolProto.toString : undefined2;
          function lodash(value) {
            if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
              if (value instanceof LodashWrapper) {
                return value;
              }
              if (hasOwnProperty.call(value, "__wrapped__")) {
                return wrapperClone(value);
              }
            }
            return new LodashWrapper(value);
          }
          var baseCreate = /* @__PURE__ */ function() {
            function object() {
            }
            return function(proto) {
              if (!isObject(proto)) {
                return {};
              }
              if (objectCreate) {
                return objectCreate(proto);
              }
              object.prototype = proto;
              var result2 = new object();
              object.prototype = undefined2;
              return result2;
            };
          }();
          function baseLodash() {
          }
          function LodashWrapper(value, chainAll) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__chain__ = !!chainAll;
            this.__index__ = 0;
            this.__values__ = undefined2;
          }
          lodash.templateSettings = {
            /**
             * Used to detect `data` property values to be HTML-escaped.
             *
             * @memberOf _.templateSettings
             * @type {RegExp}
             */
            "escape": reEscape,
            /**
             * Used to detect code to be evaluated.
             *
             * @memberOf _.templateSettings
             * @type {RegExp}
             */
            "evaluate": reEvaluate,
            /**
             * Used to detect `data` property values to inject.
             *
             * @memberOf _.templateSettings
             * @type {RegExp}
             */
            "interpolate": reInterpolate,
            /**
             * Used to reference the data object in the template text.
             *
             * @memberOf _.templateSettings
             * @type {string}
             */
            "variable": "",
            /**
             * Used to import variables into the compiled template.
             *
             * @memberOf _.templateSettings
             * @type {Object}
             */
            "imports": {
              /**
               * A reference to the `lodash` function.
               *
               * @memberOf _.templateSettings.imports
               * @type {Function}
               */
              "_": lodash
            }
          };
          lodash.prototype = baseLodash.prototype;
          lodash.prototype.constructor = lodash;
          LodashWrapper.prototype = baseCreate(baseLodash.prototype);
          LodashWrapper.prototype.constructor = LodashWrapper;
          function LazyWrapper(value) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__dir__ = 1;
            this.__filtered__ = false;
            this.__iteratees__ = [];
            this.__takeCount__ = MAX_ARRAY_LENGTH;
            this.__views__ = [];
          }
          function lazyClone() {
            var result2 = new LazyWrapper(this.__wrapped__);
            result2.__actions__ = copyArray(this.__actions__);
            result2.__dir__ = this.__dir__;
            result2.__filtered__ = this.__filtered__;
            result2.__iteratees__ = copyArray(this.__iteratees__);
            result2.__takeCount__ = this.__takeCount__;
            result2.__views__ = copyArray(this.__views__);
            return result2;
          }
          function lazyReverse() {
            if (this.__filtered__) {
              var result2 = new LazyWrapper(this);
              result2.__dir__ = -1;
              result2.__filtered__ = true;
            } else {
              result2 = this.clone();
              result2.__dir__ *= -1;
            }
            return result2;
          }
          function lazyValue() {
            var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
            if (!isArr || !isRight && arrLength == length && takeCount == length) {
              return baseWrapperValue(array, this.__actions__);
            }
            var result2 = [];
            outer:
              while (length-- && resIndex < takeCount) {
                index += dir;
                var iterIndex = -1, value = array[index];
                while (++iterIndex < iterLength) {
                  var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
                  if (type == LAZY_MAP_FLAG) {
                    value = computed;
                  } else if (!computed) {
                    if (type == LAZY_FILTER_FLAG) {
                      continue outer;
                    } else {
                      break outer;
                    }
                  }
                }
                result2[resIndex++] = value;
              }
            return result2;
          }
          LazyWrapper.prototype = baseCreate(baseLodash.prototype);
          LazyWrapper.prototype.constructor = LazyWrapper;
          function Hash(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          function hashClear() {
            this.__data__ = nativeCreate ? nativeCreate(null) : {};
            this.size = 0;
          }
          function hashDelete(key) {
            var result2 = this.has(key) && delete this.__data__[key];
            this.size -= result2 ? 1 : 0;
            return result2;
          }
          function hashGet(key) {
            var data = this.__data__;
            if (nativeCreate) {
              var result2 = data[key];
              return result2 === HASH_UNDEFINED ? undefined2 : result2;
            }
            return hasOwnProperty.call(data, key) ? data[key] : undefined2;
          }
          function hashHas(key) {
            var data = this.__data__;
            return nativeCreate ? data[key] !== undefined2 : hasOwnProperty.call(data, key);
          }
          function hashSet(key, value) {
            var data = this.__data__;
            this.size += this.has(key) ? 0 : 1;
            data[key] = nativeCreate && value === undefined2 ? HASH_UNDEFINED : value;
            return this;
          }
          Hash.prototype.clear = hashClear;
          Hash.prototype["delete"] = hashDelete;
          Hash.prototype.get = hashGet;
          Hash.prototype.has = hashHas;
          Hash.prototype.set = hashSet;
          function ListCache(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          function listCacheClear() {
            this.__data__ = [];
            this.size = 0;
          }
          function listCacheDelete(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) {
              return false;
            }
            var lastIndex = data.length - 1;
            if (index == lastIndex) {
              data.pop();
            } else {
              splice.call(data, index, 1);
            }
            --this.size;
            return true;
          }
          function listCacheGet(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            return index < 0 ? undefined2 : data[index][1];
          }
          function listCacheHas(key) {
            return assocIndexOf(this.__data__, key) > -1;
          }
          function listCacheSet(key, value) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) {
              ++this.size;
              data.push([key, value]);
            } else {
              data[index][1] = value;
            }
            return this;
          }
          ListCache.prototype.clear = listCacheClear;
          ListCache.prototype["delete"] = listCacheDelete;
          ListCache.prototype.get = listCacheGet;
          ListCache.prototype.has = listCacheHas;
          ListCache.prototype.set = listCacheSet;
          function MapCache(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          function mapCacheClear() {
            this.size = 0;
            this.__data__ = {
              "hash": new Hash(),
              "map": new (Map2 || ListCache)(),
              "string": new Hash()
            };
          }
          function mapCacheDelete(key) {
            var result2 = getMapData(this, key)["delete"](key);
            this.size -= result2 ? 1 : 0;
            return result2;
          }
          function mapCacheGet(key) {
            return getMapData(this, key).get(key);
          }
          function mapCacheHas(key) {
            return getMapData(this, key).has(key);
          }
          function mapCacheSet(key, value) {
            var data = getMapData(this, key), size2 = data.size;
            data.set(key, value);
            this.size += data.size == size2 ? 0 : 1;
            return this;
          }
          MapCache.prototype.clear = mapCacheClear;
          MapCache.prototype["delete"] = mapCacheDelete;
          MapCache.prototype.get = mapCacheGet;
          MapCache.prototype.has = mapCacheHas;
          MapCache.prototype.set = mapCacheSet;
          function SetCache(values2) {
            var index = -1, length = values2 == null ? 0 : values2.length;
            this.__data__ = new MapCache();
            while (++index < length) {
              this.add(values2[index]);
            }
          }
          function setCacheAdd(value) {
            this.__data__.set(value, HASH_UNDEFINED);
            return this;
          }
          function setCacheHas(value) {
            return this.__data__.has(value);
          }
          SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
          SetCache.prototype.has = setCacheHas;
          function Stack(entries) {
            var data = this.__data__ = new ListCache(entries);
            this.size = data.size;
          }
          function stackClear() {
            this.__data__ = new ListCache();
            this.size = 0;
          }
          function stackDelete(key) {
            var data = this.__data__, result2 = data["delete"](key);
            this.size = data.size;
            return result2;
          }
          function stackGet(key) {
            return this.__data__.get(key);
          }
          function stackHas(key) {
            return this.__data__.has(key);
          }
          function stackSet(key, value) {
            var data = this.__data__;
            if (data instanceof ListCache) {
              var pairs = data.__data__;
              if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
                pairs.push([key, value]);
                this.size = ++data.size;
                return this;
              }
              data = this.__data__ = new MapCache(pairs);
            }
            data.set(key, value);
            this.size = data.size;
            return this;
          }
          Stack.prototype.clear = stackClear;
          Stack.prototype["delete"] = stackDelete;
          Stack.prototype.get = stackGet;
          Stack.prototype.has = stackHas;
          Stack.prototype.set = stackSet;
          function arrayLikeKeys(value, inherited) {
            var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
            for (var key in value) {
              if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
              (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
              isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
              isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
              isIndex(key, length)))) {
                result2.push(key);
              }
            }
            return result2;
          }
          function arraySample(array) {
            var length = array.length;
            return length ? array[baseRandom(0, length - 1)] : undefined2;
          }
          function arraySampleSize(array, n) {
            return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
          }
          function arrayShuffle(array) {
            return shuffleSelf(copyArray(array));
          }
          function assignMergeValue(object, key, value) {
            if (value !== undefined2 && !eq(object[key], value) || value === undefined2 && !(key in object)) {
              baseAssignValue(object, key, value);
            }
          }
          function assignValue(object, key, value) {
            var objValue = object[key];
            if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined2 && !(key in object)) {
              baseAssignValue(object, key, value);
            }
          }
          function assocIndexOf(array, key) {
            var length = array.length;
            while (length--) {
              if (eq(array[length][0], key)) {
                return length;
              }
            }
            return -1;
          }
          function baseAggregator(collection, setter, iteratee2, accumulator) {
            baseEach(collection, function(value, key, collection2) {
              setter(accumulator, value, iteratee2(value), collection2);
            });
            return accumulator;
          }
          function baseAssign(object, source) {
            return object && copyObject(source, keys(source), object);
          }
          function baseAssignIn(object, source) {
            return object && copyObject(source, keysIn(source), object);
          }
          function baseAssignValue(object, key, value) {
            if (key == "__proto__" && defineProperty) {
              defineProperty(object, key, {
                "configurable": true,
                "enumerable": true,
                "value": value,
                "writable": true
              });
            } else {
              object[key] = value;
            }
          }
          function baseAt(object, paths) {
            var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
            while (++index < length) {
              result2[index] = skip ? undefined2 : get(object, paths[index]);
            }
            return result2;
          }
          function baseClamp(number, lower, upper) {
            if (number === number) {
              if (upper !== undefined2) {
                number = number <= upper ? number : upper;
              }
              if (lower !== undefined2) {
                number = number >= lower ? number : lower;
              }
            }
            return number;
          }
          function baseClone(value, bitmask, customizer, key, object, stack) {
            var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
            if (customizer) {
              result2 = object ? customizer(value, key, object, stack) : customizer(value);
            }
            if (result2 !== undefined2) {
              return result2;
            }
            if (!isObject(value)) {
              return value;
            }
            var isArr = isArray(value);
            if (isArr) {
              result2 = initCloneArray(value);
              if (!isDeep) {
                return copyArray(value, result2);
              }
            } else {
              var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
              if (isBuffer(value)) {
                return cloneBuffer(value, isDeep);
              }
              if (tag == objectTag || tag == argsTag || isFunc && !object) {
                result2 = isFlat || isFunc ? {} : initCloneObject(value);
                if (!isDeep) {
                  return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
                }
              } else {
                if (!cloneableTags[tag]) {
                  return object ? value : {};
                }
                result2 = initCloneByTag(value, tag, isDeep);
              }
            }
            stack || (stack = new Stack());
            var stacked = stack.get(value);
            if (stacked) {
              return stacked;
            }
            stack.set(value, result2);
            if (isSet(value)) {
              value.forEach(function(subValue) {
                result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
              });
            } else if (isMap(value)) {
              value.forEach(function(subValue, key2) {
                result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
              });
            }
            var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
            var props = isArr ? undefined2 : keysFunc(value);
            arrayEach(props || value, function(subValue, key2) {
              if (props) {
                key2 = subValue;
                subValue = value[key2];
              }
              assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
            return result2;
          }
          function baseConforms(source) {
            var props = keys(source);
            return function(object) {
              return baseConformsTo(object, source, props);
            };
          }
          function baseConformsTo(object, source, props) {
            var length = props.length;
            if (object == null) {
              return !length;
            }
            object = Object2(object);
            while (length--) {
              var key = props[length], predicate = source[key], value = object[key];
              if (value === undefined2 && !(key in object) || !predicate(value)) {
                return false;
              }
            }
            return true;
          }
          function baseDelay(func, wait, args) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return setTimeout2(function() {
              func.apply(undefined2, args);
            }, wait);
          }
          function baseDifference(array, values2, iteratee2, comparator) {
            var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
            if (!length) {
              return result2;
            }
            if (iteratee2) {
              values2 = arrayMap(values2, baseUnary(iteratee2));
            }
            if (comparator) {
              includes2 = arrayIncludesWith;
              isCommon = false;
            } else if (values2.length >= LARGE_ARRAY_SIZE) {
              includes2 = cacheHas;
              isCommon = false;
              values2 = new SetCache(values2);
            }
            outer:
              while (++index < length) {
                var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
                value = comparator || value !== 0 ? value : 0;
                if (isCommon && computed === computed) {
                  var valuesIndex = valuesLength;
                  while (valuesIndex--) {
                    if (values2[valuesIndex] === computed) {
                      continue outer;
                    }
                  }
                  result2.push(value);
                } else if (!includes2(values2, computed, comparator)) {
                  result2.push(value);
                }
              }
            return result2;
          }
          var baseEach = createBaseEach(baseForOwn);
          var baseEachRight = createBaseEach(baseForOwnRight, true);
          function baseEvery(collection, predicate) {
            var result2 = true;
            baseEach(collection, function(value, index, collection2) {
              result2 = !!predicate(value, index, collection2);
              return result2;
            });
            return result2;
          }
          function baseExtremum(array, iteratee2, comparator) {
            var index = -1, length = array.length;
            while (++index < length) {
              var value = array[index], current = iteratee2(value);
              if (current != null && (computed === undefined2 ? current === current && !isSymbol(current) : comparator(current, computed))) {
                var computed = current, result2 = value;
              }
            }
            return result2;
          }
          function baseFill(array, value, start, end) {
            var length = array.length;
            start = toInteger(start);
            if (start < 0) {
              start = -start > length ? 0 : length + start;
            }
            end = end === undefined2 || end > length ? length : toInteger(end);
            if (end < 0) {
              end += length;
            }
            end = start > end ? 0 : toLength(end);
            while (start < end) {
              array[start++] = value;
            }
            return array;
          }
          function baseFilter(collection, predicate) {
            var result2 = [];
            baseEach(collection, function(value, index, collection2) {
              if (predicate(value, index, collection2)) {
                result2.push(value);
              }
            });
            return result2;
          }
          function baseFlatten(array, depth, predicate, isStrict, result2) {
            var index = -1, length = array.length;
            predicate || (predicate = isFlattenable);
            result2 || (result2 = []);
            while (++index < length) {
              var value = array[index];
              if (depth > 0 && predicate(value)) {
                if (depth > 1) {
                  baseFlatten(value, depth - 1, predicate, isStrict, result2);
                } else {
                  arrayPush(result2, value);
                }
              } else if (!isStrict) {
                result2[result2.length] = value;
              }
            }
            return result2;
          }
          var baseFor = createBaseFor();
          var baseForRight = createBaseFor(true);
          function baseForOwn(object, iteratee2) {
            return object && baseFor(object, iteratee2, keys);
          }
          function baseForOwnRight(object, iteratee2) {
            return object && baseForRight(object, iteratee2, keys);
          }
          function baseFunctions(object, props) {
            return arrayFilter(props, function(key) {
              return isFunction(object[key]);
            });
          }
          function baseGet(object, path) {
            path = castPath(path, object);
            var index = 0, length = path.length;
            while (object != null && index < length) {
              object = object[toKey(path[index++])];
            }
            return index && index == length ? object : undefined2;
          }
          function baseGetAllKeys(object, keysFunc, symbolsFunc) {
            var result2 = keysFunc(object);
            return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
          }
          function baseGetTag(value) {
            if (value == null) {
              return value === undefined2 ? undefinedTag : nullTag;
            }
            return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
          }
          function baseGt(value, other) {
            return value > other;
          }
          function baseHas(object, key) {
            return object != null && hasOwnProperty.call(object, key);
          }
          function baseHasIn(object, key) {
            return object != null && key in Object2(object);
          }
          function baseInRange(number, start, end) {
            return number >= nativeMin(start, end) && number < nativeMax(start, end);
          }
          function baseIntersection(arrays, iteratee2, comparator) {
            var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
            while (othIndex--) {
              var array = arrays[othIndex];
              if (othIndex && iteratee2) {
                array = arrayMap(array, baseUnary(iteratee2));
              }
              maxLength = nativeMin(array.length, maxLength);
              caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined2;
            }
            array = arrays[0];
            var index = -1, seen = caches[0];
            outer:
              while (++index < length && result2.length < maxLength) {
                var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
                value = comparator || value !== 0 ? value : 0;
                if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                  othIndex = othLength;
                  while (--othIndex) {
                    var cache = caches[othIndex];
                    if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                      continue outer;
                    }
                  }
                  if (seen) {
                    seen.push(computed);
                  }
                  result2.push(value);
                }
              }
            return result2;
          }
          function baseInverter(object, setter, iteratee2, accumulator) {
            baseForOwn(object, function(value, key, object2) {
              setter(accumulator, iteratee2(value), key, object2);
            });
            return accumulator;
          }
          function baseInvoke(object, path, args) {
            path = castPath(path, object);
            object = parent(object, path);
            var func = object == null ? object : object[toKey(last(path))];
            return func == null ? undefined2 : apply(func, object, args);
          }
          function baseIsArguments(value) {
            return isObjectLike(value) && baseGetTag(value) == argsTag;
          }
          function baseIsArrayBuffer(value) {
            return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
          }
          function baseIsDate(value) {
            return isObjectLike(value) && baseGetTag(value) == dateTag;
          }
          function baseIsEqual(value, other, bitmask, customizer, stack) {
            if (value === other) {
              return true;
            }
            if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
              return value !== value && other !== other;
            }
            return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
          }
          function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
            var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
            objTag = objTag == argsTag ? objectTag : objTag;
            othTag = othTag == argsTag ? objectTag : othTag;
            var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
            if (isSameTag && isBuffer(object)) {
              if (!isBuffer(other)) {
                return false;
              }
              objIsArr = true;
              objIsObj = false;
            }
            if (isSameTag && !objIsObj) {
              stack || (stack = new Stack());
              return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
            }
            if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
              var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
              if (objIsWrapped || othIsWrapped) {
                var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
                stack || (stack = new Stack());
                return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
              }
            }
            if (!isSameTag) {
              return false;
            }
            stack || (stack = new Stack());
            return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
          }
          function baseIsMap(value) {
            return isObjectLike(value) && getTag(value) == mapTag;
          }
          function baseIsMatch(object, source, matchData, customizer) {
            var index = matchData.length, length = index, noCustomizer = !customizer;
            if (object == null) {
              return !length;
            }
            object = Object2(object);
            while (index--) {
              var data = matchData[index];
              if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
                return false;
              }
            }
            while (++index < length) {
              data = matchData[index];
              var key = data[0], objValue = object[key], srcValue = data[1];
              if (noCustomizer && data[2]) {
                if (objValue === undefined2 && !(key in object)) {
                  return false;
                }
              } else {
                var stack = new Stack();
                if (customizer) {
                  var result2 = customizer(objValue, srcValue, key, object, source, stack);
                }
                if (!(result2 === undefined2 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                  return false;
                }
              }
            }
            return true;
          }
          function baseIsNative(value) {
            if (!isObject(value) || isMasked(value)) {
              return false;
            }
            var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
            return pattern.test(toSource(value));
          }
          function baseIsRegExp(value) {
            return isObjectLike(value) && baseGetTag(value) == regexpTag;
          }
          function baseIsSet(value) {
            return isObjectLike(value) && getTag(value) == setTag;
          }
          function baseIsTypedArray(value) {
            return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
          }
          function baseIteratee(value) {
            if (typeof value == "function") {
              return value;
            }
            if (value == null) {
              return identity;
            }
            if (typeof value == "object") {
              return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
            }
            return property(value);
          }
          function baseKeys(object) {
            if (!isPrototype(object)) {
              return nativeKeys(object);
            }
            var result2 = [];
            for (var key in Object2(object)) {
              if (hasOwnProperty.call(object, key) && key != "constructor") {
                result2.push(key);
              }
            }
            return result2;
          }
          function baseKeysIn(object) {
            if (!isObject(object)) {
              return nativeKeysIn(object);
            }
            var isProto = isPrototype(object), result2 = [];
            for (var key in object) {
              if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
                result2.push(key);
              }
            }
            return result2;
          }
          function baseLt(value, other) {
            return value < other;
          }
          function baseMap(collection, iteratee2) {
            var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
            baseEach(collection, function(value, key, collection2) {
              result2[++index] = iteratee2(value, key, collection2);
            });
            return result2;
          }
          function baseMatches(source) {
            var matchData = getMatchData(source);
            if (matchData.length == 1 && matchData[0][2]) {
              return matchesStrictComparable(matchData[0][0], matchData[0][1]);
            }
            return function(object) {
              return object === source || baseIsMatch(object, source, matchData);
            };
          }
          function baseMatchesProperty(path, srcValue) {
            if (isKey(path) && isStrictComparable(srcValue)) {
              return matchesStrictComparable(toKey(path), srcValue);
            }
            return function(object) {
              var objValue = get(object, path);
              return objValue === undefined2 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
            };
          }
          function baseMerge(object, source, srcIndex, customizer, stack) {
            if (object === source) {
              return;
            }
            baseFor(source, function(srcValue, key) {
              stack || (stack = new Stack());
              if (isObject(srcValue)) {
                baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
              } else {
                var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined2;
                if (newValue === undefined2) {
                  newValue = srcValue;
                }
                assignMergeValue(object, key, newValue);
              }
            }, keysIn);
          }
          function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
            var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
            if (stacked) {
              assignMergeValue(object, key, stacked);
              return;
            }
            var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined2;
            var isCommon = newValue === undefined2;
            if (isCommon) {
              var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
              newValue = srcValue;
              if (isArr || isBuff || isTyped) {
                if (isArray(objValue)) {
                  newValue = objValue;
                } else if (isArrayLikeObject(objValue)) {
                  newValue = copyArray(objValue);
                } else if (isBuff) {
                  isCommon = false;
                  newValue = cloneBuffer(srcValue, true);
                } else if (isTyped) {
                  isCommon = false;
                  newValue = cloneTypedArray(srcValue, true);
                } else {
                  newValue = [];
                }
              } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
                newValue = objValue;
                if (isArguments(objValue)) {
                  newValue = toPlainObject(objValue);
                } else if (!isObject(objValue) || isFunction(objValue)) {
                  newValue = initCloneObject(srcValue);
                }
              } else {
                isCommon = false;
              }
            }
            if (isCommon) {
              stack.set(srcValue, newValue);
              mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
              stack["delete"](srcValue);
            }
            assignMergeValue(object, key, newValue);
          }
          function baseNth(array, n) {
            var length = array.length;
            if (!length) {
              return;
            }
            n += n < 0 ? length : 0;
            return isIndex(n, length) ? array[n] : undefined2;
          }
          function baseOrderBy(collection, iteratees, orders) {
            if (iteratees.length) {
              iteratees = arrayMap(iteratees, function(iteratee2) {
                if (isArray(iteratee2)) {
                  return function(value) {
                    return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                  };
                }
                return iteratee2;
              });
            } else {
              iteratees = [identity];
            }
            var index = -1;
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            var result2 = baseMap(collection, function(value, key, collection2) {
              var criteria = arrayMap(iteratees, function(iteratee2) {
                return iteratee2(value);
              });
              return { "criteria": criteria, "index": ++index, "value": value };
            });
            return baseSortBy(result2, function(object, other) {
              return compareMultiple(object, other, orders);
            });
          }
          function basePick(object, paths) {
            return basePickBy(object, paths, function(value, path) {
              return hasIn(object, path);
            });
          }
          function basePickBy(object, paths, predicate) {
            var index = -1, length = paths.length, result2 = {};
            while (++index < length) {
              var path = paths[index], value = baseGet(object, path);
              if (predicate(value, path)) {
                baseSet(result2, castPath(path, object), value);
              }
            }
            return result2;
          }
          function basePropertyDeep(path) {
            return function(object) {
              return baseGet(object, path);
            };
          }
          function basePullAll(array, values2, iteratee2, comparator) {
            var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
            if (array === values2) {
              values2 = copyArray(values2);
            }
            if (iteratee2) {
              seen = arrayMap(array, baseUnary(iteratee2));
            }
            while (++index < length) {
              var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
              while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
                if (seen !== array) {
                  splice.call(seen, fromIndex, 1);
                }
                splice.call(array, fromIndex, 1);
              }
            }
            return array;
          }
          function basePullAt(array, indexes) {
            var length = array ? indexes.length : 0, lastIndex = length - 1;
            while (length--) {
              var index = indexes[length];
              if (length == lastIndex || index !== previous) {
                var previous = index;
                if (isIndex(index)) {
                  splice.call(array, index, 1);
                } else {
                  baseUnset(array, index);
                }
              }
            }
            return array;
          }
          function baseRandom(lower, upper) {
            return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
          }
          function baseRange(start, end, step, fromRight) {
            var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
            while (length--) {
              result2[fromRight ? length : ++index] = start;
              start += step;
            }
            return result2;
          }
          function baseRepeat(string, n) {
            var result2 = "";
            if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
              return result2;
            }
            do {
              if (n % 2) {
                result2 += string;
              }
              n = nativeFloor(n / 2);
              if (n) {
                string += string;
              }
            } while (n);
            return result2;
          }
          function baseRest(func, start) {
            return setToString(overRest(func, start, identity), func + "");
          }
          function baseSample(collection) {
            return arraySample(values(collection));
          }
          function baseSampleSize(collection, n) {
            var array = values(collection);
            return shuffleSelf(array, baseClamp(n, 0, array.length));
          }
          function baseSet(object, path, value, customizer) {
            if (!isObject(object)) {
              return object;
            }
            path = castPath(path, object);
            var index = -1, length = path.length, lastIndex = length - 1, nested = object;
            while (nested != null && ++index < length) {
              var key = toKey(path[index]), newValue = value;
              if (key === "__proto__" || key === "constructor" || key === "prototype") {
                return object;
              }
              if (index != lastIndex) {
                var objValue = nested[key];
                newValue = customizer ? customizer(objValue, key, nested) : undefined2;
                if (newValue === undefined2) {
                  newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
                }
              }
              assignValue(nested, key, newValue);
              nested = nested[key];
            }
            return object;
          }
          var baseSetData = !metaMap ? identity : function(func, data) {
            metaMap.set(func, data);
            return func;
          };
          var baseSetToString = !defineProperty ? identity : function(func, string) {
            return defineProperty(func, "toString", {
              "configurable": true,
              "enumerable": false,
              "value": constant(string),
              "writable": true
            });
          };
          function baseShuffle(collection) {
            return shuffleSelf(values(collection));
          }
          function baseSlice(array, start, end) {
            var index = -1, length = array.length;
            if (start < 0) {
              start = -start > length ? 0 : length + start;
            }
            end = end > length ? length : end;
            if (end < 0) {
              end += length;
            }
            length = start > end ? 0 : end - start >>> 0;
            start >>>= 0;
            var result2 = Array2(length);
            while (++index < length) {
              result2[index] = array[index + start];
            }
            return result2;
          }
          function baseSome(collection, predicate) {
            var result2;
            baseEach(collection, function(value, index, collection2) {
              result2 = predicate(value, index, collection2);
              return !result2;
            });
            return !!result2;
          }
          function baseSortedIndex(array, value, retHighest) {
            var low = 0, high = array == null ? low : array.length;
            if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
              while (low < high) {
                var mid = low + high >>> 1, computed = array[mid];
                if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                  low = mid + 1;
                } else {
                  high = mid;
                }
              }
              return high;
            }
            return baseSortedIndexBy(array, value, identity, retHighest);
          }
          function baseSortedIndexBy(array, value, iteratee2, retHighest) {
            var low = 0, high = array == null ? 0 : array.length;
            if (high === 0) {
              return 0;
            }
            value = iteratee2(value);
            var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined2;
            while (low < high) {
              var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined2, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
              if (valIsNaN) {
                var setLow = retHighest || othIsReflexive;
              } else if (valIsUndefined) {
                setLow = othIsReflexive && (retHighest || othIsDefined);
              } else if (valIsNull) {
                setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
              } else if (valIsSymbol) {
                setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
              } else if (othIsNull || othIsSymbol) {
                setLow = false;
              } else {
                setLow = retHighest ? computed <= value : computed < value;
              }
              if (setLow) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return nativeMin(high, MAX_ARRAY_INDEX);
          }
          function baseSortedUniq(array, iteratee2) {
            var index = -1, length = array.length, resIndex = 0, result2 = [];
            while (++index < length) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              if (!index || !eq(computed, seen)) {
                var seen = computed;
                result2[resIndex++] = value === 0 ? 0 : value;
              }
            }
            return result2;
          }
          function baseToNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            return +value;
          }
          function baseToString(value) {
            if (typeof value == "string") {
              return value;
            }
            if (isArray(value)) {
              return arrayMap(value, baseToString) + "";
            }
            if (isSymbol(value)) {
              return symbolToString ? symbolToString.call(value) : "";
            }
            var result2 = value + "";
            return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
          }
          function baseUniq(array, iteratee2, comparator) {
            var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
            if (comparator) {
              isCommon = false;
              includes2 = arrayIncludesWith;
            } else if (length >= LARGE_ARRAY_SIZE) {
              var set2 = iteratee2 ? null : createSet(array);
              if (set2) {
                return setToArray(set2);
              }
              isCommon = false;
              includes2 = cacheHas;
              seen = new SetCache();
            } else {
              seen = iteratee2 ? [] : result2;
            }
            outer:
              while (++index < length) {
                var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
                value = comparator || value !== 0 ? value : 0;
                if (isCommon && computed === computed) {
                  var seenIndex = seen.length;
                  while (seenIndex--) {
                    if (seen[seenIndex] === computed) {
                      continue outer;
                    }
                  }
                  if (iteratee2) {
                    seen.push(computed);
                  }
                  result2.push(value);
                } else if (!includes2(seen, computed, comparator)) {
                  if (seen !== result2) {
                    seen.push(computed);
                  }
                  result2.push(value);
                }
              }
            return result2;
          }
          function baseUnset(object, path) {
            path = castPath(path, object);
            object = parent(object, path);
            return object == null || delete object[toKey(last(path))];
          }
          function baseUpdate(object, path, updater, customizer) {
            return baseSet(object, path, updater(baseGet(object, path)), customizer);
          }
          function baseWhile(array, predicate, isDrop, fromRight) {
            var length = array.length, index = fromRight ? length : -1;
            while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
            }
            return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
          }
          function baseWrapperValue(value, actions) {
            var result2 = value;
            if (result2 instanceof LazyWrapper) {
              result2 = result2.value();
            }
            return arrayReduce(actions, function(result3, action) {
              return action.func.apply(action.thisArg, arrayPush([result3], action.args));
            }, result2);
          }
          function baseXor(arrays, iteratee2, comparator) {
            var length = arrays.length;
            if (length < 2) {
              return length ? baseUniq(arrays[0]) : [];
            }
            var index = -1, result2 = Array2(length);
            while (++index < length) {
              var array = arrays[index], othIndex = -1;
              while (++othIndex < length) {
                if (othIndex != index) {
                  result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
                }
              }
            }
            return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
          }
          function baseZipObject(props, values2, assignFunc) {
            var index = -1, length = props.length, valsLength = values2.length, result2 = {};
            while (++index < length) {
              var value = index < valsLength ? values2[index] : undefined2;
              assignFunc(result2, props[index], value);
            }
            return result2;
          }
          function castArrayLikeObject(value) {
            return isArrayLikeObject(value) ? value : [];
          }
          function castFunction(value) {
            return typeof value == "function" ? value : identity;
          }
          function castPath(value, object) {
            if (isArray(value)) {
              return value;
            }
            return isKey(value, object) ? [value] : stringToPath(toString(value));
          }
          var castRest = baseRest;
          function castSlice(array, start, end) {
            var length = array.length;
            end = end === undefined2 ? length : end;
            return !start && end >= length ? array : baseSlice(array, start, end);
          }
          var clearTimeout2 = ctxClearTimeout || function(id) {
            return root.clearTimeout(id);
          };
          function cloneBuffer(buffer, isDeep) {
            if (isDeep) {
              return buffer.slice();
            }
            var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
            buffer.copy(result2);
            return result2;
          }
          function cloneArrayBuffer(arrayBuffer) {
            var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
            new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
            return result2;
          }
          function cloneDataView(dataView, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
            return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
          }
          function cloneRegExp(regexp) {
            var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
            result2.lastIndex = regexp.lastIndex;
            return result2;
          }
          function cloneSymbol(symbol) {
            return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
          }
          function cloneTypedArray(typedArray, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
            return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
          }
          function compareAscending(value, other) {
            if (value !== other) {
              var valIsDefined = value !== undefined2, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
              var othIsDefined = other !== undefined2, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
              if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
                return 1;
              }
              if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
                return -1;
              }
            }
            return 0;
          }
          function compareMultiple(object, other, orders) {
            var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
            while (++index < length) {
              var result2 = compareAscending(objCriteria[index], othCriteria[index]);
              if (result2) {
                if (index >= ordersLength) {
                  return result2;
                }
                var order = orders[index];
                return result2 * (order == "desc" ? -1 : 1);
              }
            }
            return object.index - other.index;
          }
          function composeArgs(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
            while (++leftIndex < leftLength) {
              result2[leftIndex] = partials[leftIndex];
            }
            while (++argsIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                result2[holders[argsIndex]] = args[argsIndex];
              }
            }
            while (rangeLength--) {
              result2[leftIndex++] = args[argsIndex++];
            }
            return result2;
          }
          function composeArgsRight(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
            while (++argsIndex < rangeLength) {
              result2[argsIndex] = args[argsIndex];
            }
            var offset = argsIndex;
            while (++rightIndex < rightLength) {
              result2[offset + rightIndex] = partials[rightIndex];
            }
            while (++holdersIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                result2[offset + holders[holdersIndex]] = args[argsIndex++];
              }
            }
            return result2;
          }
          function copyArray(source, array) {
            var index = -1, length = source.length;
            array || (array = Array2(length));
            while (++index < length) {
              array[index] = source[index];
            }
            return array;
          }
          function copyObject(source, props, object, customizer) {
            var isNew = !object;
            object || (object = {});
            var index = -1, length = props.length;
            while (++index < length) {
              var key = props[index];
              var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined2;
              if (newValue === undefined2) {
                newValue = source[key];
              }
              if (isNew) {
                baseAssignValue(object, key, newValue);
              } else {
                assignValue(object, key, newValue);
              }
            }
            return object;
          }
          function copySymbols(source, object) {
            return copyObject(source, getSymbols(source), object);
          }
          function copySymbolsIn(source, object) {
            return copyObject(source, getSymbolsIn(source), object);
          }
          function createAggregator(setter, initializer) {
            return function(collection, iteratee2) {
              var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
              return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
            };
          }
          function createAssigner(assigner) {
            return baseRest(function(object, sources) {
              var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined2, guard = length > 2 ? sources[2] : undefined2;
              customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined2;
              if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                customizer = length < 3 ? undefined2 : customizer;
                length = 1;
              }
              object = Object2(object);
              while (++index < length) {
                var source = sources[index];
                if (source) {
                  assigner(object, source, index, customizer);
                }
              }
              return object;
            });
          }
          function createBaseEach(eachFunc, fromRight) {
            return function(collection, iteratee2) {
              if (collection == null) {
                return collection;
              }
              if (!isArrayLike(collection)) {
                return eachFunc(collection, iteratee2);
              }
              var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
              while (fromRight ? index-- : ++index < length) {
                if (iteratee2(iterable[index], index, iterable) === false) {
                  break;
                }
              }
              return collection;
            };
          }
          function createBaseFor(fromRight) {
            return function(object, iteratee2, keysFunc) {
              var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
              while (length--) {
                var key = props[fromRight ? length : ++index];
                if (iteratee2(iterable[key], key, iterable) === false) {
                  break;
                }
              }
              return object;
            };
          }
          function createBind(func, bitmask, thisArg) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
              var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              return fn.apply(isBind ? thisArg : this, arguments);
            }
            return wrapper;
          }
          function createCaseFirst(methodName) {
            return function(string) {
              string = toString(string);
              var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined2;
              var chr = strSymbols ? strSymbols[0] : string.charAt(0);
              var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
              return chr[methodName]() + trailing;
            };
          }
          function createCompounder(callback) {
            return function(string) {
              return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
            };
          }
          function createCtor(Ctor) {
            return function() {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return new Ctor();
                case 1:
                  return new Ctor(args[0]);
                case 2:
                  return new Ctor(args[0], args[1]);
                case 3:
                  return new Ctor(args[0], args[1], args[2]);
                case 4:
                  return new Ctor(args[0], args[1], args[2], args[3]);
                case 5:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4]);
                case 6:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
                case 7:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
              }
              var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
              return isObject(result2) ? result2 : thisBinding;
            };
          }
          function createCurry(func, bitmask, arity) {
            var Ctor = createCtor(func);
            function wrapper() {
              var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
              while (index--) {
                args[index] = arguments[index];
              }
              var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
              length -= holders.length;
              if (length < arity) {
                return createRecurry(
                  func,
                  bitmask,
                  createHybrid,
                  wrapper.placeholder,
                  undefined2,
                  args,
                  holders,
                  undefined2,
                  undefined2,
                  arity - length
                );
              }
              var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              return apply(fn, this, args);
            }
            return wrapper;
          }
          function createFind(findIndexFunc) {
            return function(collection, predicate, fromIndex) {
              var iterable = Object2(collection);
              if (!isArrayLike(collection)) {
                var iteratee2 = getIteratee(predicate, 3);
                collection = keys(collection);
                predicate = function(key) {
                  return iteratee2(iterable[key], key, iterable);
                };
              }
              var index = findIndexFunc(collection, predicate, fromIndex);
              return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined2;
            };
          }
          function createFlow(fromRight) {
            return flatRest(function(funcs) {
              var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
              if (fromRight) {
                funcs.reverse();
              }
              while (index--) {
                var func = funcs[index];
                if (typeof func != "function") {
                  throw new TypeError2(FUNC_ERROR_TEXT);
                }
                if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                  var wrapper = new LodashWrapper([], true);
                }
              }
              index = wrapper ? index : length;
              while (++index < length) {
                func = funcs[index];
                var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined2;
                if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                  wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
                } else {
                  wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
                }
              }
              return function() {
                var args = arguments, value = args[0];
                if (wrapper && args.length == 1 && isArray(value)) {
                  return wrapper.plant(value).value();
                }
                var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
                while (++index2 < length) {
                  result2 = funcs[index2].call(this, result2);
                }
                return result2;
              };
            });
          }
          function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
            var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined2 : createCtor(func);
            function wrapper() {
              var length = arguments.length, args = Array2(length), index = length;
              while (index--) {
                args[index] = arguments[index];
              }
              if (isCurried) {
                var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
              }
              if (partials) {
                args = composeArgs(args, partials, holders, isCurried);
              }
              if (partialsRight) {
                args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
              }
              length -= holdersCount;
              if (isCurried && length < arity) {
                var newHolders = replaceHolders(args, placeholder);
                return createRecurry(
                  func,
                  bitmask,
                  createHybrid,
                  wrapper.placeholder,
                  thisArg,
                  args,
                  newHolders,
                  argPos,
                  ary2,
                  arity - length
                );
              }
              var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
              length = args.length;
              if (argPos) {
                args = reorder(args, argPos);
              } else if (isFlip && length > 1) {
                args.reverse();
              }
              if (isAry && ary2 < length) {
                args.length = ary2;
              }
              if (this && this !== root && this instanceof wrapper) {
                fn = Ctor || createCtor(fn);
              }
              return fn.apply(thisBinding, args);
            }
            return wrapper;
          }
          function createInverter(setter, toIteratee) {
            return function(object, iteratee2) {
              return baseInverter(object, setter, toIteratee(iteratee2), {});
            };
          }
          function createMathOperation(operator, defaultValue) {
            return function(value, other) {
              var result2;
              if (value === undefined2 && other === undefined2) {
                return defaultValue;
              }
              if (value !== undefined2) {
                result2 = value;
              }
              if (other !== undefined2) {
                if (result2 === undefined2) {
                  return other;
                }
                if (typeof value == "string" || typeof other == "string") {
                  value = baseToString(value);
                  other = baseToString(other);
                } else {
                  value = baseToNumber(value);
                  other = baseToNumber(other);
                }
                result2 = operator(value, other);
              }
              return result2;
            };
          }
          function createOver(arrayFunc) {
            return flatRest(function(iteratees) {
              iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
              return baseRest(function(args) {
                var thisArg = this;
                return arrayFunc(iteratees, function(iteratee2) {
                  return apply(iteratee2, thisArg, args);
                });
              });
            });
          }
          function createPadding(length, chars) {
            chars = chars === undefined2 ? " " : baseToString(chars);
            var charsLength = chars.length;
            if (charsLength < 2) {
              return charsLength ? baseRepeat(chars, length) : chars;
            }
            var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
            return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
          }
          function createPartial(func, bitmask, thisArg, partials) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
              var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              while (++leftIndex < leftLength) {
                args[leftIndex] = partials[leftIndex];
              }
              while (argsLength--) {
                args[leftIndex++] = arguments[++argsIndex];
              }
              return apply(fn, isBind ? thisArg : this, args);
            }
            return wrapper;
          }
          function createRange(fromRight) {
            return function(start, end, step) {
              if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
                end = step = undefined2;
              }
              start = toFinite(start);
              if (end === undefined2) {
                end = start;
                start = 0;
              } else {
                end = toFinite(end);
              }
              step = step === undefined2 ? start < end ? 1 : -1 : toFinite(step);
              return baseRange(start, end, step, fromRight);
            };
          }
          function createRelationalOperation(operator) {
            return function(value, other) {
              if (!(typeof value == "string" && typeof other == "string")) {
                value = toNumber(value);
                other = toNumber(other);
              }
              return operator(value, other);
            };
          }
          function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
            var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined2, newHoldersRight = isCurry ? undefined2 : holders, newPartials = isCurry ? partials : undefined2, newPartialsRight = isCurry ? undefined2 : partials;
            bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
            bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
            if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
              bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
            }
            var newData = [
              func,
              bitmask,
              thisArg,
              newPartials,
              newHolders,
              newPartialsRight,
              newHoldersRight,
              argPos,
              ary2,
              arity
            ];
            var result2 = wrapFunc.apply(undefined2, newData);
            if (isLaziable(func)) {
              setData(result2, newData);
            }
            result2.placeholder = placeholder;
            return setWrapToString(result2, func, bitmask);
          }
          function createRound(methodName) {
            var func = Math2[methodName];
            return function(number, precision) {
              number = toNumber(number);
              precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
              if (precision && nativeIsFinite(number)) {
                var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
                pair = (toString(value) + "e").split("e");
                return +(pair[0] + "e" + (+pair[1] - precision));
              }
              return func(number);
            };
          }
          var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values2) {
            return new Set2(values2);
          };
          function createToPairs(keysFunc) {
            return function(object) {
              var tag = getTag(object);
              if (tag == mapTag) {
                return mapToArray(object);
              }
              if (tag == setTag) {
                return setToPairs(object);
              }
              return baseToPairs(object, keysFunc(object));
            };
          }
          function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
            var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
            if (!isBindKey && typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            var length = partials ? partials.length : 0;
            if (!length) {
              bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
              partials = holders = undefined2;
            }
            ary2 = ary2 === undefined2 ? ary2 : nativeMax(toInteger(ary2), 0);
            arity = arity === undefined2 ? arity : toInteger(arity);
            length -= holders ? holders.length : 0;
            if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
              var partialsRight = partials, holdersRight = holders;
              partials = holders = undefined2;
            }
            var data = isBindKey ? undefined2 : getData(func);
            var newData = [
              func,
              bitmask,
              thisArg,
              partials,
              holders,
              partialsRight,
              holdersRight,
              argPos,
              ary2,
              arity
            ];
            if (data) {
              mergeData(newData, data);
            }
            func = newData[0];
            bitmask = newData[1];
            thisArg = newData[2];
            partials = newData[3];
            holders = newData[4];
            arity = newData[9] = newData[9] === undefined2 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
            if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
              bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
            }
            if (!bitmask || bitmask == WRAP_BIND_FLAG) {
              var result2 = createBind(func, bitmask, thisArg);
            } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
              result2 = createCurry(func, bitmask, arity);
            } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
              result2 = createPartial(func, bitmask, thisArg, partials);
            } else {
              result2 = createHybrid.apply(undefined2, newData);
            }
            var setter = data ? baseSetData : setData;
            return setWrapToString(setter(result2, newData), func, bitmask);
          }
          function customDefaultsAssignIn(objValue, srcValue, key, object) {
            if (objValue === undefined2 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
              return srcValue;
            }
            return objValue;
          }
          function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
            if (isObject(objValue) && isObject(srcValue)) {
              stack.set(srcValue, objValue);
              baseMerge(objValue, srcValue, undefined2, customDefaultsMerge, stack);
              stack["delete"](srcValue);
            }
            return objValue;
          }
          function customOmitClone(value) {
            return isPlainObject(value) ? undefined2 : value;
          }
          function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
            if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
              return false;
            }
            var arrStacked = stack.get(array);
            var othStacked = stack.get(other);
            if (arrStacked && othStacked) {
              return arrStacked == other && othStacked == array;
            }
            var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined2;
            stack.set(array, other);
            stack.set(other, array);
            while (++index < arrLength) {
              var arrValue = array[index], othValue = other[index];
              if (customizer) {
                var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
              }
              if (compared !== undefined2) {
                if (compared) {
                  continue;
                }
                result2 = false;
                break;
              }
              if (seen) {
                if (!arraySome(other, function(othValue2, othIndex) {
                  if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                    return seen.push(othIndex);
                  }
                })) {
                  result2 = false;
                  break;
                }
              } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                result2 = false;
                break;
              }
            }
            stack["delete"](array);
            stack["delete"](other);
            return result2;
          }
          function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
            switch (tag) {
              case dataViewTag:
                if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                  return false;
                }
                object = object.buffer;
                other = other.buffer;
              case arrayBufferTag:
                if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                  return false;
                }
                return true;
              case boolTag:
              case dateTag:
              case numberTag:
                return eq(+object, +other);
              case errorTag:
                return object.name == other.name && object.message == other.message;
              case regexpTag:
              case stringTag:
                return object == other + "";
              case mapTag:
                var convert = mapToArray;
              case setTag:
                var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                convert || (convert = setToArray);
                if (object.size != other.size && !isPartial) {
                  return false;
                }
                var stacked = stack.get(object);
                if (stacked) {
                  return stacked == other;
                }
                bitmask |= COMPARE_UNORDERED_FLAG;
                stack.set(object, other);
                var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
                stack["delete"](object);
                return result2;
              case symbolTag:
                if (symbolValueOf) {
                  return symbolValueOf.call(object) == symbolValueOf.call(other);
                }
            }
            return false;
          }
          function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
            if (objLength != othLength && !isPartial) {
              return false;
            }
            var index = objLength;
            while (index--) {
              var key = objProps[index];
              if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
                return false;
              }
            }
            var objStacked = stack.get(object);
            var othStacked = stack.get(other);
            if (objStacked && othStacked) {
              return objStacked == other && othStacked == object;
            }
            var result2 = true;
            stack.set(object, other);
            stack.set(other, object);
            var skipCtor = isPartial;
            while (++index < objLength) {
              key = objProps[index];
              var objValue = object[key], othValue = other[key];
              if (customizer) {
                var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
              }
              if (!(compared === undefined2 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
                result2 = false;
                break;
              }
              skipCtor || (skipCtor = key == "constructor");
            }
            if (result2 && !skipCtor) {
              var objCtor = object.constructor, othCtor = other.constructor;
              if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
                result2 = false;
              }
            }
            stack["delete"](object);
            stack["delete"](other);
            return result2;
          }
          function flatRest(func) {
            return setToString(overRest(func, undefined2, flatten), func + "");
          }
          function getAllKeys(object) {
            return baseGetAllKeys(object, keys, getSymbols);
          }
          function getAllKeysIn(object) {
            return baseGetAllKeys(object, keysIn, getSymbolsIn);
          }
          var getData = !metaMap ? noop : function(func) {
            return metaMap.get(func);
          };
          function getFuncName(func) {
            var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
            while (length--) {
              var data = array[length], otherFunc = data.func;
              if (otherFunc == null || otherFunc == func) {
                return data.name;
              }
            }
            return result2;
          }
          function getHolder(func) {
            var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
            return object.placeholder;
          }
          function getIteratee() {
            var result2 = lodash.iteratee || iteratee;
            result2 = result2 === iteratee ? baseIteratee : result2;
            return arguments.length ? result2(arguments[0], arguments[1]) : result2;
          }
          function getMapData(map2, key) {
            var data = map2.__data__;
            return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
          }
          function getMatchData(object) {
            var result2 = keys(object), length = result2.length;
            while (length--) {
              var key = result2[length], value = object[key];
              result2[length] = [key, value, isStrictComparable(value)];
            }
            return result2;
          }
          function getNative(object, key) {
            var value = getValue(object, key);
            return baseIsNative(value) ? value : undefined2;
          }
          function getRawTag(value) {
            var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
            try {
              value[symToStringTag] = undefined2;
              var unmasked = true;
            } catch (e) {
            }
            var result2 = nativeObjectToString.call(value);
            if (unmasked) {
              if (isOwn) {
                value[symToStringTag] = tag;
              } else {
                delete value[symToStringTag];
              }
            }
            return result2;
          }
          var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
            if (object == null) {
              return [];
            }
            object = Object2(object);
            return arrayFilter(nativeGetSymbols(object), function(symbol) {
              return propertyIsEnumerable.call(object, symbol);
            });
          };
          var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
            var result2 = [];
            while (object) {
              arrayPush(result2, getSymbols(object));
              object = getPrototype(object);
            }
            return result2;
          };
          var getTag = baseGetTag;
          if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
            getTag = function(value) {
              var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined2, ctorString = Ctor ? toSource(Ctor) : "";
              if (ctorString) {
                switch (ctorString) {
                  case dataViewCtorString:
                    return dataViewTag;
                  case mapCtorString:
                    return mapTag;
                  case promiseCtorString:
                    return promiseTag;
                  case setCtorString:
                    return setTag;
                  case weakMapCtorString:
                    return weakMapTag;
                }
              }
              return result2;
            };
          }
          function getView(start, end, transforms) {
            var index = -1, length = transforms.length;
            while (++index < length) {
              var data = transforms[index], size2 = data.size;
              switch (data.type) {
                case "drop":
                  start += size2;
                  break;
                case "dropRight":
                  end -= size2;
                  break;
                case "take":
                  end = nativeMin(end, start + size2);
                  break;
                case "takeRight":
                  start = nativeMax(start, end - size2);
                  break;
              }
            }
            return { "start": start, "end": end };
          }
          function getWrapDetails(source) {
            var match = source.match(reWrapDetails);
            return match ? match[1].split(reSplitDetails) : [];
          }
          function hasPath(object, path, hasFunc) {
            path = castPath(path, object);
            var index = -1, length = path.length, result2 = false;
            while (++index < length) {
              var key = toKey(path[index]);
              if (!(result2 = object != null && hasFunc(object, key))) {
                break;
              }
              object = object[key];
            }
            if (result2 || ++index != length) {
              return result2;
            }
            length = object == null ? 0 : object.length;
            return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
          }
          function initCloneArray(array) {
            var length = array.length, result2 = new array.constructor(length);
            if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
              result2.index = array.index;
              result2.input = array.input;
            }
            return result2;
          }
          function initCloneObject(object) {
            return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
          }
          function initCloneByTag(object, tag, isDeep) {
            var Ctor = object.constructor;
            switch (tag) {
              case arrayBufferTag:
                return cloneArrayBuffer(object);
              case boolTag:
              case dateTag:
                return new Ctor(+object);
              case dataViewTag:
                return cloneDataView(object, isDeep);
              case float32Tag:
              case float64Tag:
              case int8Tag:
              case int16Tag:
              case int32Tag:
              case uint8Tag:
              case uint8ClampedTag:
              case uint16Tag:
              case uint32Tag:
                return cloneTypedArray(object, isDeep);
              case mapTag:
                return new Ctor();
              case numberTag:
              case stringTag:
                return new Ctor(object);
              case regexpTag:
                return cloneRegExp(object);
              case setTag:
                return new Ctor();
              case symbolTag:
                return cloneSymbol(object);
            }
          }
          function insertWrapDetails(source, details) {
            var length = details.length;
            if (!length) {
              return source;
            }
            var lastIndex = length - 1;
            details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
            details = details.join(length > 2 ? ", " : " ");
            return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
          }
          function isFlattenable(value) {
            return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
          }
          function isIndex(value, length) {
            var type = typeof value;
            length = length == null ? MAX_SAFE_INTEGER : length;
            return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
          }
          function isIterateeCall(value, index, object) {
            if (!isObject(object)) {
              return false;
            }
            var type = typeof index;
            if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
              return eq(object[index], value);
            }
            return false;
          }
          function isKey(value, object) {
            if (isArray(value)) {
              return false;
            }
            var type = typeof value;
            if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
              return true;
            }
            return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
          }
          function isKeyable(value) {
            var type = typeof value;
            return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
          }
          function isLaziable(func) {
            var funcName = getFuncName(func), other = lodash[funcName];
            if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
              return false;
            }
            if (func === other) {
              return true;
            }
            var data = getData(other);
            return !!data && func === data[0];
          }
          function isMasked(func) {
            return !!maskSrcKey && maskSrcKey in func;
          }
          var isMaskable = coreJsData ? isFunction : stubFalse;
          function isPrototype(value) {
            var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
            return value === proto;
          }
          function isStrictComparable(value) {
            return value === value && !isObject(value);
          }
          function matchesStrictComparable(key, srcValue) {
            return function(object) {
              if (object == null) {
                return false;
              }
              return object[key] === srcValue && (srcValue !== undefined2 || key in Object2(object));
            };
          }
          function memoizeCapped(func) {
            var result2 = memoize(func, function(key) {
              if (cache.size === MAX_MEMOIZE_SIZE) {
                cache.clear();
              }
              return key;
            });
            var cache = result2.cache;
            return result2;
          }
          function mergeData(data, source) {
            var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
            var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
            if (!(isCommon || isCombo)) {
              return data;
            }
            if (srcBitmask & WRAP_BIND_FLAG) {
              data[2] = source[2];
              newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
            }
            var value = source[3];
            if (value) {
              var partials = data[3];
              data[3] = partials ? composeArgs(partials, value, source[4]) : value;
              data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
            }
            value = source[5];
            if (value) {
              partials = data[5];
              data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
              data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
            }
            value = source[7];
            if (value) {
              data[7] = value;
            }
            if (srcBitmask & WRAP_ARY_FLAG) {
              data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
            }
            if (data[9] == null) {
              data[9] = source[9];
            }
            data[0] = source[0];
            data[1] = newBitmask;
            return data;
          }
          function nativeKeysIn(object) {
            var result2 = [];
            if (object != null) {
              for (var key in Object2(object)) {
                result2.push(key);
              }
            }
            return result2;
          }
          function objectToString(value) {
            return nativeObjectToString.call(value);
          }
          function overRest(func, start, transform2) {
            start = nativeMax(start === undefined2 ? func.length - 1 : start, 0);
            return function() {
              var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
              while (++index < length) {
                array[index] = args[start + index];
              }
              index = -1;
              var otherArgs = Array2(start + 1);
              while (++index < start) {
                otherArgs[index] = args[index];
              }
              otherArgs[start] = transform2(array);
              return apply(func, this, otherArgs);
            };
          }
          function parent(object, path) {
            return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
          }
          function reorder(array, indexes) {
            var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
            while (length--) {
              var index = indexes[length];
              array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined2;
            }
            return array;
          }
          function safeGet(object, key) {
            if (key === "constructor" && typeof object[key] === "function") {
              return;
            }
            if (key == "__proto__") {
              return;
            }
            return object[key];
          }
          var setData = shortOut(baseSetData);
          var setTimeout2 = ctxSetTimeout || function(func, wait) {
            return root.setTimeout(func, wait);
          };
          var setToString = shortOut(baseSetToString);
          function setWrapToString(wrapper, reference, bitmask) {
            var source = reference + "";
            return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
          }
          function shortOut(func) {
            var count = 0, lastCalled = 0;
            return function() {
              var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
              lastCalled = stamp;
              if (remaining > 0) {
                if (++count >= HOT_COUNT) {
                  return arguments[0];
                }
              } else {
                count = 0;
              }
              return func.apply(undefined2, arguments);
            };
          }
          function shuffleSelf(array, size2) {
            var index = -1, length = array.length, lastIndex = length - 1;
            size2 = size2 === undefined2 ? length : size2;
            while (++index < size2) {
              var rand = baseRandom(index, lastIndex), value = array[rand];
              array[rand] = array[index];
              array[index] = value;
            }
            array.length = size2;
            return array;
          }
          var stringToPath = memoizeCapped(function(string) {
            var result2 = [];
            if (string.charCodeAt(0) === 46) {
              result2.push("");
            }
            string.replace(rePropName, function(match, number, quote, subString) {
              result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
            });
            return result2;
          });
          function toKey(value) {
            if (typeof value == "string" || isSymbol(value)) {
              return value;
            }
            var result2 = value + "";
            return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
          }
          function toSource(func) {
            if (func != null) {
              try {
                return funcToString.call(func);
              } catch (e) {
              }
              try {
                return func + "";
              } catch (e) {
              }
            }
            return "";
          }
          function updateWrapDetails(details, bitmask) {
            arrayEach(wrapFlags, function(pair) {
              var value = "_." + pair[0];
              if (bitmask & pair[1] && !arrayIncludes(details, value)) {
                details.push(value);
              }
            });
            return details.sort();
          }
          function wrapperClone(wrapper) {
            if (wrapper instanceof LazyWrapper) {
              return wrapper.clone();
            }
            var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
            result2.__actions__ = copyArray(wrapper.__actions__);
            result2.__index__ = wrapper.__index__;
            result2.__values__ = wrapper.__values__;
            return result2;
          }
          function chunk(array, size2, guard) {
            if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined2) {
              size2 = 1;
            } else {
              size2 = nativeMax(toInteger(size2), 0);
            }
            var length = array == null ? 0 : array.length;
            if (!length || size2 < 1) {
              return [];
            }
            var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
            while (index < length) {
              result2[resIndex++] = baseSlice(array, index, index += size2);
            }
            return result2;
          }
          function compact(array) {
            var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
            while (++index < length) {
              var value = array[index];
              if (value) {
                result2[resIndex++] = value;
              }
            }
            return result2;
          }
          function concat() {
            var length = arguments.length;
            if (!length) {
              return [];
            }
            var args = Array2(length - 1), array = arguments[0], index = length;
            while (index--) {
              args[index - 1] = arguments[index];
            }
            return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
          }
          var difference = baseRest(function(array, values2) {
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
          });
          var differenceBy = baseRest(function(array, values2) {
            var iteratee2 = last(values2);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined2;
            }
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
          });
          var differenceWith = baseRest(function(array, values2) {
            var comparator = last(values2);
            if (isArrayLikeObject(comparator)) {
              comparator = undefined2;
            }
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined2, comparator) : [];
          });
          function drop(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            return baseSlice(array, n < 0 ? 0 : n, length);
          }
          function dropRight(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            n = length - n;
            return baseSlice(array, 0, n < 0 ? 0 : n);
          }
          function dropRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
          }
          function dropWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
          }
          function fill(array, value, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
              start = 0;
              end = length;
            }
            return baseFill(array, value, start, end);
          }
          function findIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
              index = nativeMax(length + index, 0);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index);
          }
          function findLastIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = length - 1;
            if (fromIndex !== undefined2) {
              index = toInteger(fromIndex);
              index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index, true);
          }
          function flatten(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, 1) : [];
          }
          function flattenDeep(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, INFINITY) : [];
          }
          function flattenDepth(array, depth) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            depth = depth === undefined2 ? 1 : toInteger(depth);
            return baseFlatten(array, depth);
          }
          function fromPairs(pairs) {
            var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
            while (++index < length) {
              var pair = pairs[index];
              result2[pair[0]] = pair[1];
            }
            return result2;
          }
          function head(array) {
            return array && array.length ? array[0] : undefined2;
          }
          function indexOf(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
              index = nativeMax(length + index, 0);
            }
            return baseIndexOf(array, value, index);
          }
          function initial(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 0, -1) : [];
          }
          var intersection = baseRest(function(arrays) {
            var mapped = arrayMap(arrays, castArrayLikeObject);
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
          });
          var intersectionBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            if (iteratee2 === last(mapped)) {
              iteratee2 = undefined2;
            } else {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
          });
          var intersectionWith = baseRest(function(arrays) {
            var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            comparator = typeof comparator == "function" ? comparator : undefined2;
            if (comparator) {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined2, comparator) : [];
          });
          function join(array, separator) {
            return array == null ? "" : nativeJoin.call(array, separator);
          }
          function last(array) {
            var length = array == null ? 0 : array.length;
            return length ? array[length - 1] : undefined2;
          }
          function lastIndexOf(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = length;
            if (fromIndex !== undefined2) {
              index = toInteger(fromIndex);
              index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
            }
            return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
          }
          function nth(array, n) {
            return array && array.length ? baseNth(array, toInteger(n)) : undefined2;
          }
          var pull = baseRest(pullAll);
          function pullAll(array, values2) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
          }
          function pullAllBy(array, values2, iteratee2) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
          }
          function pullAllWith(array, values2, comparator) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined2, comparator) : array;
          }
          var pullAt = flatRest(function(array, indexes) {
            var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
            basePullAt(array, arrayMap(indexes, function(index) {
              return isIndex(index, length) ? +index : index;
            }).sort(compareAscending));
            return result2;
          });
          function remove(array, predicate) {
            var result2 = [];
            if (!(array && array.length)) {
              return result2;
            }
            var index = -1, indexes = [], length = array.length;
            predicate = getIteratee(predicate, 3);
            while (++index < length) {
              var value = array[index];
              if (predicate(value, index, array)) {
                result2.push(value);
                indexes.push(index);
              }
            }
            basePullAt(array, indexes);
            return result2;
          }
          function reverse(array) {
            return array == null ? array : nativeReverse.call(array);
          }
          function slice(array, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
              start = 0;
              end = length;
            } else {
              start = start == null ? 0 : toInteger(start);
              end = end === undefined2 ? length : toInteger(end);
            }
            return baseSlice(array, start, end);
          }
          function sortedIndex(array, value) {
            return baseSortedIndex(array, value);
          }
          function sortedIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
          }
          function sortedIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
              var index = baseSortedIndex(array, value);
              if (index < length && eq(array[index], value)) {
                return index;
              }
            }
            return -1;
          }
          function sortedLastIndex(array, value) {
            return baseSortedIndex(array, value, true);
          }
          function sortedLastIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
          }
          function sortedLastIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
              var index = baseSortedIndex(array, value, true) - 1;
              if (eq(array[index], value)) {
                return index;
              }
            }
            return -1;
          }
          function sortedUniq(array) {
            return array && array.length ? baseSortedUniq(array) : [];
          }
          function sortedUniqBy(array, iteratee2) {
            return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          function tail(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 1, length) : [];
          }
          function take(array, n, guard) {
            if (!(array && array.length)) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            return baseSlice(array, 0, n < 0 ? 0 : n);
          }
          function takeRight(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            n = length - n;
            return baseSlice(array, n < 0 ? 0 : n, length);
          }
          function takeRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
          }
          function takeWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
          }
          var union = baseRest(function(arrays) {
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
          });
          var unionBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined2;
            }
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
          });
          var unionWith = baseRest(function(arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined2;
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined2, comparator);
          });
          function uniq(array) {
            return array && array.length ? baseUniq(array) : [];
          }
          function uniqBy(array, iteratee2) {
            return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          function uniqWith(array, comparator) {
            comparator = typeof comparator == "function" ? comparator : undefined2;
            return array && array.length ? baseUniq(array, undefined2, comparator) : [];
          }
          function unzip(array) {
            if (!(array && array.length)) {
              return [];
            }
            var length = 0;
            array = arrayFilter(array, function(group) {
              if (isArrayLikeObject(group)) {
                length = nativeMax(group.length, length);
                return true;
              }
            });
            return baseTimes(length, function(index) {
              return arrayMap(array, baseProperty(index));
            });
          }
          function unzipWith(array, iteratee2) {
            if (!(array && array.length)) {
              return [];
            }
            var result2 = unzip(array);
            if (iteratee2 == null) {
              return result2;
            }
            return arrayMap(result2, function(group) {
              return apply(iteratee2, undefined2, group);
            });
          }
          var without = baseRest(function(array, values2) {
            return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
          });
          var xor = baseRest(function(arrays) {
            return baseXor(arrayFilter(arrays, isArrayLikeObject));
          });
          var xorBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined2;
            }
            return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
          });
          var xorWith = baseRest(function(arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined2;
            return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined2, comparator);
          });
          var zip = baseRest(unzip);
          function zipObject(props, values2) {
            return baseZipObject(props || [], values2 || [], assignValue);
          }
          function zipObjectDeep(props, values2) {
            return baseZipObject(props || [], values2 || [], baseSet);
          }
          var zipWith = baseRest(function(arrays) {
            var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined2;
            iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined2;
            return unzipWith(arrays, iteratee2);
          });
          function chain(value) {
            var result2 = lodash(value);
            result2.__chain__ = true;
            return result2;
          }
          function tap(value, interceptor) {
            interceptor(value);
            return value;
          }
          function thru(value, interceptor) {
            return interceptor(value);
          }
          var wrapperAt = flatRest(function(paths) {
            var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
              return baseAt(object, paths);
            };
            if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
              return this.thru(interceptor);
            }
            value = value.slice(start, +start + (length ? 1 : 0));
            value.__actions__.push({
              "func": thru,
              "args": [interceptor],
              "thisArg": undefined2
            });
            return new LodashWrapper(value, this.__chain__).thru(function(array) {
              if (length && !array.length) {
                array.push(undefined2);
              }
              return array;
            });
          });
          function wrapperChain() {
            return chain(this);
          }
          function wrapperCommit() {
            return new LodashWrapper(this.value(), this.__chain__);
          }
          function wrapperNext() {
            if (this.__values__ === undefined2) {
              this.__values__ = toArray(this.value());
            }
            var done = this.__index__ >= this.__values__.length, value = done ? undefined2 : this.__values__[this.__index__++];
            return { "done": done, "value": value };
          }
          function wrapperToIterator() {
            return this;
          }
          function wrapperPlant(value) {
            var result2, parent2 = this;
            while (parent2 instanceof baseLodash) {
              var clone2 = wrapperClone(parent2);
              clone2.__index__ = 0;
              clone2.__values__ = undefined2;
              if (result2) {
                previous.__wrapped__ = clone2;
              } else {
                result2 = clone2;
              }
              var previous = clone2;
              parent2 = parent2.__wrapped__;
            }
            previous.__wrapped__ = value;
            return result2;
          }
          function wrapperReverse() {
            var value = this.__wrapped__;
            if (value instanceof LazyWrapper) {
              var wrapped = value;
              if (this.__actions__.length) {
                wrapped = new LazyWrapper(this);
              }
              wrapped = wrapped.reverse();
              wrapped.__actions__.push({
                "func": thru,
                "args": [reverse],
                "thisArg": undefined2
              });
              return new LodashWrapper(wrapped, this.__chain__);
            }
            return this.thru(reverse);
          }
          function wrapperValue() {
            return baseWrapperValue(this.__wrapped__, this.__actions__);
          }
          var countBy = createAggregator(function(result2, value, key) {
            if (hasOwnProperty.call(result2, key)) {
              ++result2[key];
            } else {
              baseAssignValue(result2, key, 1);
            }
          });
          function every(collection, predicate, guard) {
            var func = isArray(collection) ? arrayEvery : baseEvery;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined2;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          function filter(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, getIteratee(predicate, 3));
          }
          var find = createFind(findIndex);
          var findLast = createFind(findLastIndex);
          function flatMap(collection, iteratee2) {
            return baseFlatten(map(collection, iteratee2), 1);
          }
          function flatMapDeep(collection, iteratee2) {
            return baseFlatten(map(collection, iteratee2), INFINITY);
          }
          function flatMapDepth(collection, iteratee2, depth) {
            depth = depth === undefined2 ? 1 : toInteger(depth);
            return baseFlatten(map(collection, iteratee2), depth);
          }
          function forEach(collection, iteratee2) {
            var func = isArray(collection) ? arrayEach : baseEach;
            return func(collection, getIteratee(iteratee2, 3));
          }
          function forEachRight(collection, iteratee2) {
            var func = isArray(collection) ? arrayEachRight : baseEachRight;
            return func(collection, getIteratee(iteratee2, 3));
          }
          var groupBy = createAggregator(function(result2, value, key) {
            if (hasOwnProperty.call(result2, key)) {
              result2[key].push(value);
            } else {
              baseAssignValue(result2, key, [value]);
            }
          });
          function includes(collection, value, fromIndex, guard) {
            collection = isArrayLike(collection) ? collection : values(collection);
            fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
            var length = collection.length;
            if (fromIndex < 0) {
              fromIndex = nativeMax(length + fromIndex, 0);
            }
            return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
          }
          var invokeMap = baseRest(function(collection, path, args) {
            var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
            baseEach(collection, function(value) {
              result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
            });
            return result2;
          });
          var keyBy = createAggregator(function(result2, value, key) {
            baseAssignValue(result2, key, value);
          });
          function map(collection, iteratee2) {
            var func = isArray(collection) ? arrayMap : baseMap;
            return func(collection, getIteratee(iteratee2, 3));
          }
          function orderBy(collection, iteratees, orders, guard) {
            if (collection == null) {
              return [];
            }
            if (!isArray(iteratees)) {
              iteratees = iteratees == null ? [] : [iteratees];
            }
            orders = guard ? undefined2 : orders;
            if (!isArray(orders)) {
              orders = orders == null ? [] : [orders];
            }
            return baseOrderBy(collection, iteratees, orders);
          }
          var partition = createAggregator(function(result2, value, key) {
            result2[key ? 0 : 1].push(value);
          }, function() {
            return [[], []];
          });
          function reduce(collection, iteratee2, accumulator) {
            var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
          }
          function reduceRight(collection, iteratee2, accumulator) {
            var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
          }
          function reject(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, negate(getIteratee(predicate, 3)));
          }
          function sample(collection) {
            var func = isArray(collection) ? arraySample : baseSample;
            return func(collection);
          }
          function sampleSize(collection, n, guard) {
            if (guard ? isIterateeCall(collection, n, guard) : n === undefined2) {
              n = 1;
            } else {
              n = toInteger(n);
            }
            var func = isArray(collection) ? arraySampleSize : baseSampleSize;
            return func(collection, n);
          }
          function shuffle(collection) {
            var func = isArray(collection) ? arrayShuffle : baseShuffle;
            return func(collection);
          }
          function size(collection) {
            if (collection == null) {
              return 0;
            }
            if (isArrayLike(collection)) {
              return isString(collection) ? stringSize(collection) : collection.length;
            }
            var tag = getTag(collection);
            if (tag == mapTag || tag == setTag) {
              return collection.size;
            }
            return baseKeys(collection).length;
          }
          function some(collection, predicate, guard) {
            var func = isArray(collection) ? arraySome : baseSome;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined2;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          var sortBy = baseRest(function(collection, iteratees) {
            if (collection == null) {
              return [];
            }
            var length = iteratees.length;
            if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
              iteratees = [];
            } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
              iteratees = [iteratees[0]];
            }
            return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
          });
          var now = ctxNow || function() {
            return root.Date.now();
          };
          function after(n, func) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function() {
              if (--n < 1) {
                return func.apply(this, arguments);
              }
            };
          }
          function ary(func, n, guard) {
            n = guard ? undefined2 : n;
            n = func && n == null ? func.length : n;
            return createWrap(func, WRAP_ARY_FLAG, undefined2, undefined2, undefined2, undefined2, n);
          }
          function before(n, func) {
            var result2;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function() {
              if (--n > 0) {
                result2 = func.apply(this, arguments);
              }
              if (n <= 1) {
                func = undefined2;
              }
              return result2;
            };
          }
          var bind = baseRest(function(func, thisArg, partials) {
            var bitmask = WRAP_BIND_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bind));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(func, bitmask, thisArg, partials, holders);
          });
          var bindKey = baseRest(function(object, key, partials) {
            var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bindKey));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(key, bitmask, object, partials, holders);
          });
          function curry(func, arity, guard) {
            arity = guard ? undefined2 : arity;
            var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
            result2.placeholder = curry.placeholder;
            return result2;
          }
          function curryRight(func, arity, guard) {
            arity = guard ? undefined2 : arity;
            var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
            result2.placeholder = curryRight.placeholder;
            return result2;
          }
          function debounce(func, wait, options2) {
            var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            wait = toNumber(wait) || 0;
            if (isObject(options2)) {
              leading = !!options2.leading;
              maxing = "maxWait" in options2;
              maxWait = maxing ? nativeMax(toNumber(options2.maxWait) || 0, wait) : maxWait;
              trailing = "trailing" in options2 ? !!options2.trailing : trailing;
            }
            function invokeFunc(time) {
              var args = lastArgs, thisArg = lastThis;
              lastArgs = lastThis = undefined2;
              lastInvokeTime = time;
              result2 = func.apply(thisArg, args);
              return result2;
            }
            function leadingEdge(time) {
              lastInvokeTime = time;
              timerId = setTimeout2(timerExpired, wait);
              return leading ? invokeFunc(time) : result2;
            }
            function remainingWait(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
              return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
            }
            function shouldInvoke(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
              return lastCallTime === undefined2 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
            }
            function timerExpired() {
              var time = now();
              if (shouldInvoke(time)) {
                return trailingEdge(time);
              }
              timerId = setTimeout2(timerExpired, remainingWait(time));
            }
            function trailingEdge(time) {
              timerId = undefined2;
              if (trailing && lastArgs) {
                return invokeFunc(time);
              }
              lastArgs = lastThis = undefined2;
              return result2;
            }
            function cancel() {
              if (timerId !== undefined2) {
                clearTimeout2(timerId);
              }
              lastInvokeTime = 0;
              lastArgs = lastCallTime = lastThis = timerId = undefined2;
            }
            function flush() {
              return timerId === undefined2 ? result2 : trailingEdge(now());
            }
            function debounced() {
              var time = now(), isInvoking = shouldInvoke(time);
              lastArgs = arguments;
              lastThis = this;
              lastCallTime = time;
              if (isInvoking) {
                if (timerId === undefined2) {
                  return leadingEdge(lastCallTime);
                }
                if (maxing) {
                  clearTimeout2(timerId);
                  timerId = setTimeout2(timerExpired, wait);
                  return invokeFunc(lastCallTime);
                }
              }
              if (timerId === undefined2) {
                timerId = setTimeout2(timerExpired, wait);
              }
              return result2;
            }
            debounced.cancel = cancel;
            debounced.flush = flush;
            return debounced;
          }
          var defer = baseRest(function(func, args) {
            return baseDelay(func, 1, args);
          });
          var delay = baseRest(function(func, wait, args) {
            return baseDelay(func, toNumber(wait) || 0, args);
          });
          function flip(func) {
            return createWrap(func, WRAP_FLIP_FLAG);
          }
          function memoize(func, resolver) {
            if (typeof func != "function" || resolver != null && typeof resolver != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            var memoized = function() {
              var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
              if (cache.has(key)) {
                return cache.get(key);
              }
              var result2 = func.apply(this, args);
              memoized.cache = cache.set(key, result2) || cache;
              return result2;
            };
            memoized.cache = new (memoize.Cache || MapCache)();
            return memoized;
          }
          memoize.Cache = MapCache;
          function negate(predicate) {
            if (typeof predicate != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return function() {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return !predicate.call(this);
                case 1:
                  return !predicate.call(this, args[0]);
                case 2:
                  return !predicate.call(this, args[0], args[1]);
                case 3:
                  return !predicate.call(this, args[0], args[1], args[2]);
              }
              return !predicate.apply(this, args);
            };
          }
          function once(func) {
            return before(2, func);
          }
          var overArgs = castRest(function(func, transforms) {
            transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
            var funcsLength = transforms.length;
            return baseRest(function(args) {
              var index = -1, length = nativeMin(args.length, funcsLength);
              while (++index < length) {
                args[index] = transforms[index].call(this, args[index]);
              }
              return apply(func, this, args);
            });
          });
          var partial = baseRest(function(func, partials) {
            var holders = replaceHolders(partials, getHolder(partial));
            return createWrap(func, WRAP_PARTIAL_FLAG, undefined2, partials, holders);
          });
          var partialRight = baseRest(function(func, partials) {
            var holders = replaceHolders(partials, getHolder(partialRight));
            return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined2, partials, holders);
          });
          var rearg = flatRest(function(func, indexes) {
            return createWrap(func, WRAP_REARG_FLAG, undefined2, undefined2, undefined2, indexes);
          });
          function rest(func, start) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            start = start === undefined2 ? start : toInteger(start);
            return baseRest(func, start);
          }
          function spread(func, start) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            start = start == null ? 0 : nativeMax(toInteger(start), 0);
            return baseRest(function(args) {
              var array = args[start], otherArgs = castSlice(args, 0, start);
              if (array) {
                arrayPush(otherArgs, array);
              }
              return apply(func, this, otherArgs);
            });
          }
          function throttle(func, wait, options2) {
            var leading = true, trailing = true;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            if (isObject(options2)) {
              leading = "leading" in options2 ? !!options2.leading : leading;
              trailing = "trailing" in options2 ? !!options2.trailing : trailing;
            }
            return debounce(func, wait, {
              "leading": leading,
              "maxWait": wait,
              "trailing": trailing
            });
          }
          function unary(func) {
            return ary(func, 1);
          }
          function wrap(value, wrapper) {
            return partial(castFunction(wrapper), value);
          }
          function castArray() {
            if (!arguments.length) {
              return [];
            }
            var value = arguments[0];
            return isArray(value) ? value : [value];
          }
          function clone(value) {
            return baseClone(value, CLONE_SYMBOLS_FLAG);
          }
          function cloneWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
          }
          function cloneDeep(value) {
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
          }
          function cloneDeepWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
          }
          function conformsTo(object, source) {
            return source == null || baseConformsTo(object, source, keys(source));
          }
          function eq(value, other) {
            return value === other || value !== value && other !== other;
          }
          var gt = createRelationalOperation(baseGt);
          var gte = createRelationalOperation(function(value, other) {
            return value >= other;
          });
          var isArguments = baseIsArguments(/* @__PURE__ */ function() {
            return arguments;
          }()) ? baseIsArguments : function(value) {
            return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
          };
          var isArray = Array2.isArray;
          var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
          function isArrayLike(value) {
            return value != null && isLength(value.length) && !isFunction(value);
          }
          function isArrayLikeObject(value) {
            return isObjectLike(value) && isArrayLike(value);
          }
          function isBoolean(value) {
            return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
          }
          var isBuffer = nativeIsBuffer || stubFalse;
          var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
          function isElement(value) {
            return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
          }
          function isEmpty(value) {
            if (value == null) {
              return true;
            }
            if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
              return !value.length;
            }
            var tag = getTag(value);
            if (tag == mapTag || tag == setTag) {
              return !value.size;
            }
            if (isPrototype(value)) {
              return !baseKeys(value).length;
            }
            for (var key in value) {
              if (hasOwnProperty.call(value, key)) {
                return false;
              }
            }
            return true;
          }
          function isEqual(value, other) {
            return baseIsEqual(value, other);
          }
          function isEqualWith(value, other, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            var result2 = customizer ? customizer(value, other) : undefined2;
            return result2 === undefined2 ? baseIsEqual(value, other, undefined2, customizer) : !!result2;
          }
          function isError(value) {
            if (!isObjectLike(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
          }
          function isFinite2(value) {
            return typeof value == "number" && nativeIsFinite(value);
          }
          function isFunction(value) {
            if (!isObject(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
          }
          function isInteger(value) {
            return typeof value == "number" && value == toInteger(value);
          }
          function isLength(value) {
            return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
          }
          function isObject(value) {
            var type = typeof value;
            return value != null && (type == "object" || type == "function");
          }
          function isObjectLike(value) {
            return value != null && typeof value == "object";
          }
          var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
          function isMatch(object, source) {
            return object === source || baseIsMatch(object, source, getMatchData(source));
          }
          function isMatchWith(object, source, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return baseIsMatch(object, source, getMatchData(source), customizer);
          }
          function isNaN2(value) {
            return isNumber(value) && value != +value;
          }
          function isNative(value) {
            if (isMaskable(value)) {
              throw new Error2(CORE_ERROR_TEXT);
            }
            return baseIsNative(value);
          }
          function isNull(value) {
            return value === null;
          }
          function isNil(value) {
            return value == null;
          }
          function isNumber(value) {
            return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
          }
          function isPlainObject(value) {
            if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
              return false;
            }
            var proto = getPrototype(value);
            if (proto === null) {
              return true;
            }
            var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
            return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
          }
          var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
          function isSafeInteger(value) {
            return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
          }
          var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
          function isString(value) {
            return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
          }
          function isSymbol(value) {
            return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
          }
          var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
          function isUndefined(value) {
            return value === undefined2;
          }
          function isWeakMap(value) {
            return isObjectLike(value) && getTag(value) == weakMapTag;
          }
          function isWeakSet(value) {
            return isObjectLike(value) && baseGetTag(value) == weakSetTag;
          }
          var lt = createRelationalOperation(baseLt);
          var lte = createRelationalOperation(function(value, other) {
            return value <= other;
          });
          function toArray(value) {
            if (!value) {
              return [];
            }
            if (isArrayLike(value)) {
              return isString(value) ? stringToArray(value) : copyArray(value);
            }
            if (symIterator && value[symIterator]) {
              return iteratorToArray(value[symIterator]());
            }
            var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
            return func(value);
          }
          function toFinite(value) {
            if (!value) {
              return value === 0 ? value : 0;
            }
            value = toNumber(value);
            if (value === INFINITY || value === -INFINITY) {
              var sign = value < 0 ? -1 : 1;
              return sign * MAX_INTEGER;
            }
            return value === value ? value : 0;
          }
          function toInteger(value) {
            var result2 = toFinite(value), remainder = result2 % 1;
            return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
          }
          function toLength(value) {
            return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
          }
          function toNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            if (isObject(value)) {
              var other = typeof value.valueOf == "function" ? value.valueOf() : value;
              value = isObject(other) ? other + "" : other;
            }
            if (typeof value != "string") {
              return value === 0 ? value : +value;
            }
            value = baseTrim(value);
            var isBinary = reIsBinary.test(value);
            return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
          }
          function toPlainObject(value) {
            return copyObject(value, keysIn(value));
          }
          function toSafeInteger(value) {
            return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
          }
          function toString(value) {
            return value == null ? "" : baseToString(value);
          }
          var assign = createAssigner(function(object, source) {
            if (isPrototype(source) || isArrayLike(source)) {
              copyObject(source, keys(source), object);
              return;
            }
            for (var key in source) {
              if (hasOwnProperty.call(source, key)) {
                assignValue(object, key, source[key]);
              }
            }
          });
          var assignIn = createAssigner(function(object, source) {
            copyObject(source, keysIn(source), object);
          });
          var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
            copyObject(source, keysIn(source), object, customizer);
          });
          var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
            copyObject(source, keys(source), object, customizer);
          });
          var at = flatRest(baseAt);
          function create(prototype, properties) {
            var result2 = baseCreate(prototype);
            return properties == null ? result2 : baseAssign(result2, properties);
          }
          var defaults = baseRest(function(object, sources) {
            object = Object2(object);
            var index = -1;
            var length = sources.length;
            var guard = length > 2 ? sources[2] : undefined2;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              length = 1;
            }
            while (++index < length) {
              var source = sources[index];
              var props = keysIn(source);
              var propsIndex = -1;
              var propsLength = props.length;
              while (++propsIndex < propsLength) {
                var key = props[propsIndex];
                var value = object[key];
                if (value === undefined2 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
                  object[key] = source[key];
                }
              }
            }
            return object;
          });
          var defaultsDeep = baseRest(function(args) {
            args.push(undefined2, customDefaultsMerge);
            return apply(mergeWith, undefined2, args);
          });
          function findKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
          }
          function findLastKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
          }
          function forIn(object, iteratee2) {
            return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
          }
          function forInRight(object, iteratee2) {
            return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
          }
          function forOwn(object, iteratee2) {
            return object && baseForOwn(object, getIteratee(iteratee2, 3));
          }
          function forOwnRight(object, iteratee2) {
            return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
          }
          function functions(object) {
            return object == null ? [] : baseFunctions(object, keys(object));
          }
          function functionsIn(object) {
            return object == null ? [] : baseFunctions(object, keysIn(object));
          }
          function get(object, path, defaultValue) {
            var result2 = object == null ? undefined2 : baseGet(object, path);
            return result2 === undefined2 ? defaultValue : result2;
          }
          function has(object, path) {
            return object != null && hasPath(object, path, baseHas);
          }
          function hasIn(object, path) {
            return object != null && hasPath(object, path, baseHasIn);
          }
          var invert = createInverter(function(result2, value, key) {
            if (value != null && typeof value.toString != "function") {
              value = nativeObjectToString.call(value);
            }
            result2[value] = key;
          }, constant(identity));
          var invertBy = createInverter(function(result2, value, key) {
            if (value != null && typeof value.toString != "function") {
              value = nativeObjectToString.call(value);
            }
            if (hasOwnProperty.call(result2, value)) {
              result2[value].push(key);
            } else {
              result2[value] = [key];
            }
          }, getIteratee);
          var invoke = baseRest(baseInvoke);
          function keys(object) {
            return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
          }
          function keysIn(object) {
            return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
          }
          function mapKeys(object, iteratee2) {
            var result2 = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function(value, key, object2) {
              baseAssignValue(result2, iteratee2(value, key, object2), value);
            });
            return result2;
          }
          function mapValues(object, iteratee2) {
            var result2 = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function(value, key, object2) {
              baseAssignValue(result2, key, iteratee2(value, key, object2));
            });
            return result2;
          }
          var merge = createAssigner(function(object, source, srcIndex) {
            baseMerge(object, source, srcIndex);
          });
          var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
            baseMerge(object, source, srcIndex, customizer);
          });
          var omit = flatRest(function(object, paths) {
            var result2 = {};
            if (object == null) {
              return result2;
            }
            var isDeep = false;
            paths = arrayMap(paths, function(path) {
              path = castPath(path, object);
              isDeep || (isDeep = path.length > 1);
              return path;
            });
            copyObject(object, getAllKeysIn(object), result2);
            if (isDeep) {
              result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
            }
            var length = paths.length;
            while (length--) {
              baseUnset(result2, paths[length]);
            }
            return result2;
          });
          function omitBy(object, predicate) {
            return pickBy(object, negate(getIteratee(predicate)));
          }
          var pick = flatRest(function(object, paths) {
            return object == null ? {} : basePick(object, paths);
          });
          function pickBy(object, predicate) {
            if (object == null) {
              return {};
            }
            var props = arrayMap(getAllKeysIn(object), function(prop) {
              return [prop];
            });
            predicate = getIteratee(predicate);
            return basePickBy(object, props, function(value, path) {
              return predicate(value, path[0]);
            });
          }
          function result(object, path, defaultValue) {
            path = castPath(path, object);
            var index = -1, length = path.length;
            if (!length) {
              length = 1;
              object = undefined2;
            }
            while (++index < length) {
              var value = object == null ? undefined2 : object[toKey(path[index])];
              if (value === undefined2) {
                index = length;
                value = defaultValue;
              }
              object = isFunction(value) ? value.call(object) : value;
            }
            return object;
          }
          function set(object, path, value) {
            return object == null ? object : baseSet(object, path, value);
          }
          function setWith(object, path, value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return object == null ? object : baseSet(object, path, value, customizer);
          }
          var toPairs = createToPairs(keys);
          var toPairsIn = createToPairs(keysIn);
          function transform(object, iteratee2, accumulator) {
            var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
            iteratee2 = getIteratee(iteratee2, 4);
            if (accumulator == null) {
              var Ctor = object && object.constructor;
              if (isArrLike) {
                accumulator = isArr ? new Ctor() : [];
              } else if (isObject(object)) {
                accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
              } else {
                accumulator = {};
              }
            }
            (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
              return iteratee2(accumulator, value, index, object2);
            });
            return accumulator;
          }
          function unset(object, path) {
            return object == null ? true : baseUnset(object, path);
          }
          function update(object, path, updater) {
            return object == null ? object : baseUpdate(object, path, castFunction(updater));
          }
          function updateWith(object, path, updater, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
          }
          function values(object) {
            return object == null ? [] : baseValues(object, keys(object));
          }
          function valuesIn(object) {
            return object == null ? [] : baseValues(object, keysIn(object));
          }
          function clamp(number, lower, upper) {
            if (upper === undefined2) {
              upper = lower;
              lower = undefined2;
            }
            if (upper !== undefined2) {
              upper = toNumber(upper);
              upper = upper === upper ? upper : 0;
            }
            if (lower !== undefined2) {
              lower = toNumber(lower);
              lower = lower === lower ? lower : 0;
            }
            return baseClamp(toNumber(number), lower, upper);
          }
          function inRange(number, start, end) {
            start = toFinite(start);
            if (end === undefined2) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            number = toNumber(number);
            return baseInRange(number, start, end);
          }
          function random(lower, upper, floating) {
            if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
              upper = floating = undefined2;
            }
            if (floating === undefined2) {
              if (typeof upper == "boolean") {
                floating = upper;
                upper = undefined2;
              } else if (typeof lower == "boolean") {
                floating = lower;
                lower = undefined2;
              }
            }
            if (lower === undefined2 && upper === undefined2) {
              lower = 0;
              upper = 1;
            } else {
              lower = toFinite(lower);
              if (upper === undefined2) {
                upper = lower;
                lower = 0;
              } else {
                upper = toFinite(upper);
              }
            }
            if (lower > upper) {
              var temp = lower;
              lower = upper;
              upper = temp;
            }
            if (floating || lower % 1 || upper % 1) {
              var rand = nativeRandom();
              return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
            }
            return baseRandom(lower, upper);
          }
          var camelCase = createCompounder(function(result2, word, index) {
            word = word.toLowerCase();
            return result2 + (index ? capitalize(word) : word);
          });
          function capitalize(string) {
            return upperFirst(toString(string).toLowerCase());
          }
          function deburr(string) {
            string = toString(string);
            return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
          }
          function endsWith(string, target, position) {
            string = toString(string);
            target = baseToString(target);
            var length = string.length;
            position = position === undefined2 ? length : baseClamp(toInteger(position), 0, length);
            var end = position;
            position -= target.length;
            return position >= 0 && string.slice(position, end) == target;
          }
          function escape(string) {
            string = toString(string);
            return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
          }
          function escapeRegExp(string) {
            string = toString(string);
            return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
          }
          var kebabCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? "-" : "") + word.toLowerCase();
          });
          var lowerCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + word.toLowerCase();
          });
          var lowerFirst = createCaseFirst("toLowerCase");
          function pad(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            if (!length || strLength >= length) {
              return string;
            }
            var mid = (length - strLength) / 2;
            return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
          }
          function padEnd(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
          }
          function padStart(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
          }
          function parseInt2(string, radix, guard) {
            if (guard || radix == null) {
              radix = 0;
            } else if (radix) {
              radix = +radix;
            }
            return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
          }
          function repeat(string, n, guard) {
            if (guard ? isIterateeCall(string, n, guard) : n === undefined2) {
              n = 1;
            } else {
              n = toInteger(n);
            }
            return baseRepeat(toString(string), n);
          }
          function replace() {
            var args = arguments, string = toString(args[0]);
            return args.length < 3 ? string : string.replace(args[1], args[2]);
          }
          var snakeCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? "_" : "") + word.toLowerCase();
          });
          function split(string, separator, limit) {
            if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
              separator = limit = undefined2;
            }
            limit = limit === undefined2 ? MAX_ARRAY_LENGTH : limit >>> 0;
            if (!limit) {
              return [];
            }
            string = toString(string);
            if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
              separator = baseToString(separator);
              if (!separator && hasUnicode(string)) {
                return castSlice(stringToArray(string), 0, limit);
              }
            }
            return string.split(separator, limit);
          }
          var startCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + upperFirst(word);
          });
          function startsWith(string, target, position) {
            string = toString(string);
            position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
            target = baseToString(target);
            return string.slice(position, position + target.length) == target;
          }
          function template(string, options2, guard) {
            var settings = lodash.templateSettings;
            if (guard && isIterateeCall(string, options2, guard)) {
              options2 = undefined2;
            }
            string = toString(string);
            options2 = assignInWith({}, options2, settings, customDefaultsAssignIn);
            var imports = assignInWith({}, options2.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
            var isEscaping, isEvaluating, index = 0, interpolate = options2.interpolate || reNoMatch, source = "__p += '";
            var reDelimiters = RegExp2(
              (options2.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options2.evaluate || reNoMatch).source + "|$",
              "g"
            );
            var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options2, "sourceURL") ? (options2.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
            string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
              interpolateValue || (interpolateValue = esTemplateValue);
              source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
              if (escapeValue) {
                isEscaping = true;
                source += "' +\n__e(" + escapeValue + ") +\n'";
              }
              if (evaluateValue) {
                isEvaluating = true;
                source += "';\n" + evaluateValue + ";\n__p += '";
              }
              if (interpolateValue) {
                source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
              }
              index = offset + match.length;
              return match;
            });
            source += "';\n";
            var variable = hasOwnProperty.call(options2, "variable") && options2.variable;
            if (!variable) {
              source = "with (obj) {\n" + source + "\n}\n";
            } else if (reForbiddenIdentifierChars.test(variable)) {
              throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
            }
            source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
            source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
            var result2 = attempt(function() {
              return Function2(importsKeys, sourceURL + "return " + source).apply(undefined2, importsValues);
            });
            result2.source = source;
            if (isError(result2)) {
              throw result2;
            }
            return result2;
          }
          function toLower(value) {
            return toString(value).toLowerCase();
          }
          function toUpper(value) {
            return toString(value).toUpperCase();
          }
          function trim(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined2)) {
              return baseTrim(string);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
            return castSlice(strSymbols, start, end).join("");
          }
          function trimEnd(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined2)) {
              return string.slice(0, trimmedEndIndex(string) + 1);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
            return castSlice(strSymbols, 0, end).join("");
          }
          function trimStart(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined2)) {
              return string.replace(reTrimStart, "");
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
            return castSlice(strSymbols, start).join("");
          }
          function truncate(string, options2) {
            var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
            if (isObject(options2)) {
              var separator = "separator" in options2 ? options2.separator : separator;
              length = "length" in options2 ? toInteger(options2.length) : length;
              omission = "omission" in options2 ? baseToString(options2.omission) : omission;
            }
            string = toString(string);
            var strLength = string.length;
            if (hasUnicode(string)) {
              var strSymbols = stringToArray(string);
              strLength = strSymbols.length;
            }
            if (length >= strLength) {
              return string;
            }
            var end = length - stringSize(omission);
            if (end < 1) {
              return omission;
            }
            var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
            if (separator === undefined2) {
              return result2 + omission;
            }
            if (strSymbols) {
              end += result2.length - end;
            }
            if (isRegExp(separator)) {
              if (string.slice(end).search(separator)) {
                var match, substring = result2;
                if (!separator.global) {
                  separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
                }
                separator.lastIndex = 0;
                while (match = separator.exec(substring)) {
                  var newEnd = match.index;
                }
                result2 = result2.slice(0, newEnd === undefined2 ? end : newEnd);
              }
            } else if (string.indexOf(baseToString(separator), end) != end) {
              var index = result2.lastIndexOf(separator);
              if (index > -1) {
                result2 = result2.slice(0, index);
              }
            }
            return result2 + omission;
          }
          function unescape2(string) {
            string = toString(string);
            return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
          }
          var upperCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + word.toUpperCase();
          });
          var upperFirst = createCaseFirst("toUpperCase");
          function words(string, pattern, guard) {
            string = toString(string);
            pattern = guard ? undefined2 : pattern;
            if (pattern === undefined2) {
              return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
            }
            return string.match(pattern) || [];
          }
          var attempt = baseRest(function(func, args) {
            try {
              return apply(func, undefined2, args);
            } catch (e) {
              return isError(e) ? e : new Error2(e);
            }
          });
          var bindAll = flatRest(function(object, methodNames) {
            arrayEach(methodNames, function(key) {
              key = toKey(key);
              baseAssignValue(object, key, bind(object[key], object));
            });
            return object;
          });
          function cond(pairs) {
            var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
            pairs = !length ? [] : arrayMap(pairs, function(pair) {
              if (typeof pair[1] != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              return [toIteratee(pair[0]), pair[1]];
            });
            return baseRest(function(args) {
              var index = -1;
              while (++index < length) {
                var pair = pairs[index];
                if (apply(pair[0], this, args)) {
                  return apply(pair[1], this, args);
                }
              }
            });
          }
          function conforms(source) {
            return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
          }
          function constant(value) {
            return function() {
              return value;
            };
          }
          function defaultTo(value, defaultValue) {
            return value == null || value !== value ? defaultValue : value;
          }
          var flow = createFlow();
          var flowRight = createFlow(true);
          function identity(value) {
            return value;
          }
          function iteratee(func) {
            return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
          }
          function matches(source) {
            return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
          }
          function matchesProperty(path, srcValue) {
            return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
          }
          var method = baseRest(function(path, args) {
            return function(object) {
              return baseInvoke(object, path, args);
            };
          });
          var methodOf = baseRest(function(object, args) {
            return function(path) {
              return baseInvoke(object, path, args);
            };
          });
          function mixin(object, source, options2) {
            var props = keys(source), methodNames = baseFunctions(source, props);
            if (options2 == null && !(isObject(source) && (methodNames.length || !props.length))) {
              options2 = source;
              source = object;
              object = this;
              methodNames = baseFunctions(source, keys(source));
            }
            var chain2 = !(isObject(options2) && "chain" in options2) || !!options2.chain, isFunc = isFunction(object);
            arrayEach(methodNames, function(methodName) {
              var func = source[methodName];
              object[methodName] = func;
              if (isFunc) {
                object.prototype[methodName] = function() {
                  var chainAll = this.__chain__;
                  if (chain2 || chainAll) {
                    var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                    actions.push({ "func": func, "args": arguments, "thisArg": object });
                    result2.__chain__ = chainAll;
                    return result2;
                  }
                  return func.apply(object, arrayPush([this.value()], arguments));
                };
              }
            });
            return object;
          }
          function noConflict() {
            if (root._ === this) {
              root._ = oldDash;
            }
            return this;
          }
          function noop() {
          }
          function nthArg(n) {
            n = toInteger(n);
            return baseRest(function(args) {
              return baseNth(args, n);
            });
          }
          var over = createOver(arrayMap);
          var overEvery = createOver(arrayEvery);
          var overSome = createOver(arraySome);
          function property(path) {
            return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
          }
          function propertyOf(object) {
            return function(path) {
              return object == null ? undefined2 : baseGet(object, path);
            };
          }
          var range = createRange();
          var rangeRight = createRange(true);
          function stubArray() {
            return [];
          }
          function stubFalse() {
            return false;
          }
          function stubObject() {
            return {};
          }
          function stubString() {
            return "";
          }
          function stubTrue() {
            return true;
          }
          function times(n, iteratee2) {
            n = toInteger(n);
            if (n < 1 || n > MAX_SAFE_INTEGER) {
              return [];
            }
            var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
            iteratee2 = getIteratee(iteratee2);
            n -= MAX_ARRAY_LENGTH;
            var result2 = baseTimes(length, iteratee2);
            while (++index < n) {
              iteratee2(index);
            }
            return result2;
          }
          function toPath(value) {
            if (isArray(value)) {
              return arrayMap(value, toKey);
            }
            return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
          }
          function uniqueId(prefix) {
            var id = ++idCounter;
            return toString(prefix) + id;
          }
          var add = createMathOperation(function(augend, addend) {
            return augend + addend;
          }, 0);
          var ceil = createRound("ceil");
          var divide = createMathOperation(function(dividend, divisor) {
            return dividend / divisor;
          }, 1);
          var floor = createRound("floor");
          function max(array) {
            return array && array.length ? baseExtremum(array, identity, baseGt) : undefined2;
          }
          function maxBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined2;
          }
          function mean(array) {
            return baseMean(array, identity);
          }
          function meanBy(array, iteratee2) {
            return baseMean(array, getIteratee(iteratee2, 2));
          }
          function min(array) {
            return array && array.length ? baseExtremum(array, identity, baseLt) : undefined2;
          }
          function minBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined2;
          }
          var multiply = createMathOperation(function(multiplier, multiplicand) {
            return multiplier * multiplicand;
          }, 1);
          var round = createRound("round");
          var subtract = createMathOperation(function(minuend, subtrahend) {
            return minuend - subtrahend;
          }, 0);
          function sum(array) {
            return array && array.length ? baseSum(array, identity) : 0;
          }
          function sumBy(array, iteratee2) {
            return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
          }
          lodash.after = after;
          lodash.ary = ary;
          lodash.assign = assign;
          lodash.assignIn = assignIn;
          lodash.assignInWith = assignInWith;
          lodash.assignWith = assignWith;
          lodash.at = at;
          lodash.before = before;
          lodash.bind = bind;
          lodash.bindAll = bindAll;
          lodash.bindKey = bindKey;
          lodash.castArray = castArray;
          lodash.chain = chain;
          lodash.chunk = chunk;
          lodash.compact = compact;
          lodash.concat = concat;
          lodash.cond = cond;
          lodash.conforms = conforms;
          lodash.constant = constant;
          lodash.countBy = countBy;
          lodash.create = create;
          lodash.curry = curry;
          lodash.curryRight = curryRight;
          lodash.debounce = debounce;
          lodash.defaults = defaults;
          lodash.defaultsDeep = defaultsDeep;
          lodash.defer = defer;
          lodash.delay = delay;
          lodash.difference = difference;
          lodash.differenceBy = differenceBy;
          lodash.differenceWith = differenceWith;
          lodash.drop = drop;
          lodash.dropRight = dropRight;
          lodash.dropRightWhile = dropRightWhile;
          lodash.dropWhile = dropWhile;
          lodash.fill = fill;
          lodash.filter = filter;
          lodash.flatMap = flatMap;
          lodash.flatMapDeep = flatMapDeep;
          lodash.flatMapDepth = flatMapDepth;
          lodash.flatten = flatten;
          lodash.flattenDeep = flattenDeep;
          lodash.flattenDepth = flattenDepth;
          lodash.flip = flip;
          lodash.flow = flow;
          lodash.flowRight = flowRight;
          lodash.fromPairs = fromPairs;
          lodash.functions = functions;
          lodash.functionsIn = functionsIn;
          lodash.groupBy = groupBy;
          lodash.initial = initial;
          lodash.intersection = intersection;
          lodash.intersectionBy = intersectionBy;
          lodash.intersectionWith = intersectionWith;
          lodash.invert = invert;
          lodash.invertBy = invertBy;
          lodash.invokeMap = invokeMap;
          lodash.iteratee = iteratee;
          lodash.keyBy = keyBy;
          lodash.keys = keys;
          lodash.keysIn = keysIn;
          lodash.map = map;
          lodash.mapKeys = mapKeys;
          lodash.mapValues = mapValues;
          lodash.matches = matches;
          lodash.matchesProperty = matchesProperty;
          lodash.memoize = memoize;
          lodash.merge = merge;
          lodash.mergeWith = mergeWith;
          lodash.method = method;
          lodash.methodOf = methodOf;
          lodash.mixin = mixin;
          lodash.negate = negate;
          lodash.nthArg = nthArg;
          lodash.omit = omit;
          lodash.omitBy = omitBy;
          lodash.once = once;
          lodash.orderBy = orderBy;
          lodash.over = over;
          lodash.overArgs = overArgs;
          lodash.overEvery = overEvery;
          lodash.overSome = overSome;
          lodash.partial = partial;
          lodash.partialRight = partialRight;
          lodash.partition = partition;
          lodash.pick = pick;
          lodash.pickBy = pickBy;
          lodash.property = property;
          lodash.propertyOf = propertyOf;
          lodash.pull = pull;
          lodash.pullAll = pullAll;
          lodash.pullAllBy = pullAllBy;
          lodash.pullAllWith = pullAllWith;
          lodash.pullAt = pullAt;
          lodash.range = range;
          lodash.rangeRight = rangeRight;
          lodash.rearg = rearg;
          lodash.reject = reject;
          lodash.remove = remove;
          lodash.rest = rest;
          lodash.reverse = reverse;
          lodash.sampleSize = sampleSize;
          lodash.set = set;
          lodash.setWith = setWith;
          lodash.shuffle = shuffle;
          lodash.slice = slice;
          lodash.sortBy = sortBy;
          lodash.sortedUniq = sortedUniq;
          lodash.sortedUniqBy = sortedUniqBy;
          lodash.split = split;
          lodash.spread = spread;
          lodash.tail = tail;
          lodash.take = take;
          lodash.takeRight = takeRight;
          lodash.takeRightWhile = takeRightWhile;
          lodash.takeWhile = takeWhile;
          lodash.tap = tap;
          lodash.throttle = throttle;
          lodash.thru = thru;
          lodash.toArray = toArray;
          lodash.toPairs = toPairs;
          lodash.toPairsIn = toPairsIn;
          lodash.toPath = toPath;
          lodash.toPlainObject = toPlainObject;
          lodash.transform = transform;
          lodash.unary = unary;
          lodash.union = union;
          lodash.unionBy = unionBy;
          lodash.unionWith = unionWith;
          lodash.uniq = uniq;
          lodash.uniqBy = uniqBy;
          lodash.uniqWith = uniqWith;
          lodash.unset = unset;
          lodash.unzip = unzip;
          lodash.unzipWith = unzipWith;
          lodash.update = update;
          lodash.updateWith = updateWith;
          lodash.values = values;
          lodash.valuesIn = valuesIn;
          lodash.without = without;
          lodash.words = words;
          lodash.wrap = wrap;
          lodash.xor = xor;
          lodash.xorBy = xorBy;
          lodash.xorWith = xorWith;
          lodash.zip = zip;
          lodash.zipObject = zipObject;
          lodash.zipObjectDeep = zipObjectDeep;
          lodash.zipWith = zipWith;
          lodash.entries = toPairs;
          lodash.entriesIn = toPairsIn;
          lodash.extend = assignIn;
          lodash.extendWith = assignInWith;
          mixin(lodash, lodash);
          lodash.add = add;
          lodash.attempt = attempt;
          lodash.camelCase = camelCase;
          lodash.capitalize = capitalize;
          lodash.ceil = ceil;
          lodash.clamp = clamp;
          lodash.clone = clone;
          lodash.cloneDeep = cloneDeep;
          lodash.cloneDeepWith = cloneDeepWith;
          lodash.cloneWith = cloneWith;
          lodash.conformsTo = conformsTo;
          lodash.deburr = deburr;
          lodash.defaultTo = defaultTo;
          lodash.divide = divide;
          lodash.endsWith = endsWith;
          lodash.eq = eq;
          lodash.escape = escape;
          lodash.escapeRegExp = escapeRegExp;
          lodash.every = every;
          lodash.find = find;
          lodash.findIndex = findIndex;
          lodash.findKey = findKey;
          lodash.findLast = findLast;
          lodash.findLastIndex = findLastIndex;
          lodash.findLastKey = findLastKey;
          lodash.floor = floor;
          lodash.forEach = forEach;
          lodash.forEachRight = forEachRight;
          lodash.forIn = forIn;
          lodash.forInRight = forInRight;
          lodash.forOwn = forOwn;
          lodash.forOwnRight = forOwnRight;
          lodash.get = get;
          lodash.gt = gt;
          lodash.gte = gte;
          lodash.has = has;
          lodash.hasIn = hasIn;
          lodash.head = head;
          lodash.identity = identity;
          lodash.includes = includes;
          lodash.indexOf = indexOf;
          lodash.inRange = inRange;
          lodash.invoke = invoke;
          lodash.isArguments = isArguments;
          lodash.isArray = isArray;
          lodash.isArrayBuffer = isArrayBuffer;
          lodash.isArrayLike = isArrayLike;
          lodash.isArrayLikeObject = isArrayLikeObject;
          lodash.isBoolean = isBoolean;
          lodash.isBuffer = isBuffer;
          lodash.isDate = isDate;
          lodash.isElement = isElement;
          lodash.isEmpty = isEmpty;
          lodash.isEqual = isEqual;
          lodash.isEqualWith = isEqualWith;
          lodash.isError = isError;
          lodash.isFinite = isFinite2;
          lodash.isFunction = isFunction;
          lodash.isInteger = isInteger;
          lodash.isLength = isLength;
          lodash.isMap = isMap;
          lodash.isMatch = isMatch;
          lodash.isMatchWith = isMatchWith;
          lodash.isNaN = isNaN2;
          lodash.isNative = isNative;
          lodash.isNil = isNil;
          lodash.isNull = isNull;
          lodash.isNumber = isNumber;
          lodash.isObject = isObject;
          lodash.isObjectLike = isObjectLike;
          lodash.isPlainObject = isPlainObject;
          lodash.isRegExp = isRegExp;
          lodash.isSafeInteger = isSafeInteger;
          lodash.isSet = isSet;
          lodash.isString = isString;
          lodash.isSymbol = isSymbol;
          lodash.isTypedArray = isTypedArray;
          lodash.isUndefined = isUndefined;
          lodash.isWeakMap = isWeakMap;
          lodash.isWeakSet = isWeakSet;
          lodash.join = join;
          lodash.kebabCase = kebabCase;
          lodash.last = last;
          lodash.lastIndexOf = lastIndexOf;
          lodash.lowerCase = lowerCase;
          lodash.lowerFirst = lowerFirst;
          lodash.lt = lt;
          lodash.lte = lte;
          lodash.max = max;
          lodash.maxBy = maxBy;
          lodash.mean = mean;
          lodash.meanBy = meanBy;
          lodash.min = min;
          lodash.minBy = minBy;
          lodash.stubArray = stubArray;
          lodash.stubFalse = stubFalse;
          lodash.stubObject = stubObject;
          lodash.stubString = stubString;
          lodash.stubTrue = stubTrue;
          lodash.multiply = multiply;
          lodash.nth = nth;
          lodash.noConflict = noConflict;
          lodash.noop = noop;
          lodash.now = now;
          lodash.pad = pad;
          lodash.padEnd = padEnd;
          lodash.padStart = padStart;
          lodash.parseInt = parseInt2;
          lodash.random = random;
          lodash.reduce = reduce;
          lodash.reduceRight = reduceRight;
          lodash.repeat = repeat;
          lodash.replace = replace;
          lodash.result = result;
          lodash.round = round;
          lodash.runInContext = runInContext2;
          lodash.sample = sample;
          lodash.size = size;
          lodash.snakeCase = snakeCase;
          lodash.some = some;
          lodash.sortedIndex = sortedIndex;
          lodash.sortedIndexBy = sortedIndexBy;
          lodash.sortedIndexOf = sortedIndexOf;
          lodash.sortedLastIndex = sortedLastIndex;
          lodash.sortedLastIndexBy = sortedLastIndexBy;
          lodash.sortedLastIndexOf = sortedLastIndexOf;
          lodash.startCase = startCase;
          lodash.startsWith = startsWith;
          lodash.subtract = subtract;
          lodash.sum = sum;
          lodash.sumBy = sumBy;
          lodash.template = template;
          lodash.times = times;
          lodash.toFinite = toFinite;
          lodash.toInteger = toInteger;
          lodash.toLength = toLength;
          lodash.toLower = toLower;
          lodash.toNumber = toNumber;
          lodash.toSafeInteger = toSafeInteger;
          lodash.toString = toString;
          lodash.toUpper = toUpper;
          lodash.trim = trim;
          lodash.trimEnd = trimEnd;
          lodash.trimStart = trimStart;
          lodash.truncate = truncate;
          lodash.unescape = unescape2;
          lodash.uniqueId = uniqueId;
          lodash.upperCase = upperCase;
          lodash.upperFirst = upperFirst;
          lodash.each = forEach;
          lodash.eachRight = forEachRight;
          lodash.first = head;
          mixin(lodash, function() {
            var source = {};
            baseForOwn(lodash, function(func, methodName) {
              if (!hasOwnProperty.call(lodash.prototype, methodName)) {
                source[methodName] = func;
              }
            });
            return source;
          }(), { "chain": false });
          lodash.VERSION = VERSION;
          arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
            lodash[methodName].placeholder = lodash;
          });
          arrayEach(["drop", "take"], function(methodName, index) {
            LazyWrapper.prototype[methodName] = function(n) {
              n = n === undefined2 ? 1 : nativeMax(toInteger(n), 0);
              var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
              if (result2.__filtered__) {
                result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
              } else {
                result2.__views__.push({
                  "size": nativeMin(n, MAX_ARRAY_LENGTH),
                  "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
                });
              }
              return result2;
            };
            LazyWrapper.prototype[methodName + "Right"] = function(n) {
              return this.reverse()[methodName](n).reverse();
            };
          });
          arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
            var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
            LazyWrapper.prototype[methodName] = function(iteratee2) {
              var result2 = this.clone();
              result2.__iteratees__.push({
                "iteratee": getIteratee(iteratee2, 3),
                "type": type
              });
              result2.__filtered__ = result2.__filtered__ || isFilter;
              return result2;
            };
          });
          arrayEach(["head", "last"], function(methodName, index) {
            var takeName = "take" + (index ? "Right" : "");
            LazyWrapper.prototype[methodName] = function() {
              return this[takeName](1).value()[0];
            };
          });
          arrayEach(["initial", "tail"], function(methodName, index) {
            var dropName = "drop" + (index ? "" : "Right");
            LazyWrapper.prototype[methodName] = function() {
              return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
            };
          });
          LazyWrapper.prototype.compact = function() {
            return this.filter(identity);
          };
          LazyWrapper.prototype.find = function(predicate) {
            return this.filter(predicate).head();
          };
          LazyWrapper.prototype.findLast = function(predicate) {
            return this.reverse().find(predicate);
          };
          LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
            if (typeof path == "function") {
              return new LazyWrapper(this);
            }
            return this.map(function(value) {
              return baseInvoke(value, path, args);
            });
          });
          LazyWrapper.prototype.reject = function(predicate) {
            return this.filter(negate(getIteratee(predicate)));
          };
          LazyWrapper.prototype.slice = function(start, end) {
            start = toInteger(start);
            var result2 = this;
            if (result2.__filtered__ && (start > 0 || end < 0)) {
              return new LazyWrapper(result2);
            }
            if (start < 0) {
              result2 = result2.takeRight(-start);
            } else if (start) {
              result2 = result2.drop(start);
            }
            if (end !== undefined2) {
              end = toInteger(end);
              result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
            }
            return result2;
          };
          LazyWrapper.prototype.takeRightWhile = function(predicate) {
            return this.reverse().takeWhile(predicate).reverse();
          };
          LazyWrapper.prototype.toArray = function() {
            return this.take(MAX_ARRAY_LENGTH);
          };
          baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
            if (!lodashFunc) {
              return;
            }
            lodash.prototype[methodName] = function() {
              var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
              var interceptor = function(value2) {
                var result3 = lodashFunc.apply(lodash, arrayPush([value2], args));
                return isTaker && chainAll ? result3[0] : result3;
              };
              if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
                isLazy = useLazy = false;
              }
              var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
              if (!retUnwrapped && useLazy) {
                value = onlyLazy ? value : new LazyWrapper(this);
                var result2 = func.apply(value, args);
                result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined2 });
                return new LodashWrapper(result2, chainAll);
              }
              if (isUnwrapped && onlyLazy) {
                return func.apply(this, args);
              }
              result2 = this.thru(interceptor);
              return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
            };
          });
          arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
            var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
            lodash.prototype[methodName] = function() {
              var args = arguments;
              if (retUnwrapped && !this.__chain__) {
                var value = this.value();
                return func.apply(isArray(value) ? value : [], args);
              }
              return this[chainName](function(value2) {
                return func.apply(isArray(value2) ? value2 : [], args);
              });
            };
          });
          baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var lodashFunc = lodash[methodName];
            if (lodashFunc) {
              var key = lodashFunc.name + "";
              if (!hasOwnProperty.call(realNames, key)) {
                realNames[key] = [];
              }
              realNames[key].push({ "name": methodName, "func": lodashFunc });
            }
          });
          realNames[createHybrid(undefined2, WRAP_BIND_KEY_FLAG).name] = [{
            "name": "wrapper",
            "func": undefined2
          }];
          LazyWrapper.prototype.clone = lazyClone;
          LazyWrapper.prototype.reverse = lazyReverse;
          LazyWrapper.prototype.value = lazyValue;
          lodash.prototype.at = wrapperAt;
          lodash.prototype.chain = wrapperChain;
          lodash.prototype.commit = wrapperCommit;
          lodash.prototype.next = wrapperNext;
          lodash.prototype.plant = wrapperPlant;
          lodash.prototype.reverse = wrapperReverse;
          lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
          lodash.prototype.first = lodash.prototype.head;
          if (symIterator) {
            lodash.prototype[symIterator] = wrapperToIterator;
          }
          return lodash;
        };
        var _ = runInContext();
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
          root._ = _;
          define(function() {
            return _;
          });
        } else if (freeModule) {
          (freeModule.exports = _)._ = _;
          freeExports._ = _;
        } else {
          root._ = _;
        }
      }).call(exports2);
    }
  });

  // node_modules/bottleneck/lib/parser.js
  var require_parser = __commonJS({
    "node_modules/bottleneck/lib/parser.js"(exports2) {
      "use strict";
      exports2.load = function(received, defaults, onto = {}) {
        var k, ref, v;
        for (k in defaults) {
          v = defaults[k];
          onto[k] = (ref = received[k]) != null ? ref : v;
        }
        return onto;
      };
      exports2.overwrite = function(received, defaults, onto = {}) {
        var k, v;
        for (k in received) {
          v = received[k];
          if (defaults[k] !== void 0) {
            onto[k] = v;
          }
        }
        return onto;
      };
    }
  });

  // node_modules/bottleneck/lib/DLList.js
  var require_DLList = __commonJS({
    "node_modules/bottleneck/lib/DLList.js"(exports2, module2) {
      "use strict";
      var DLList;
      DLList = class DLList {
        constructor(incr, decr) {
          this.incr = incr;
          this.decr = decr;
          this._first = null;
          this._last = null;
          this.length = 0;
        }
        push(value) {
          var node;
          this.length++;
          if (typeof this.incr === "function") {
            this.incr();
          }
          node = {
            value,
            prev: this._last,
            next: null
          };
          if (this._last != null) {
            this._last.next = node;
            this._last = node;
          } else {
            this._first = this._last = node;
          }
          return void 0;
        }
        shift() {
          var value;
          if (this._first == null) {
            return;
          } else {
            this.length--;
            if (typeof this.decr === "function") {
              this.decr();
            }
          }
          value = this._first.value;
          if ((this._first = this._first.next) != null) {
            this._first.prev = null;
          } else {
            this._last = null;
          }
          return value;
        }
        first() {
          if (this._first != null) {
            return this._first.value;
          }
        }
        getArray() {
          var node, ref, results;
          node = this._first;
          results = [];
          while (node != null) {
            results.push((ref = node, node = node.next, ref.value));
          }
          return results;
        }
        forEachShift(cb) {
          var node;
          node = this.shift();
          while (node != null) {
            cb(node), node = this.shift();
          }
          return void 0;
        }
        debug() {
          var node, ref, ref1, ref2, results;
          node = this._first;
          results = [];
          while (node != null) {
            results.push((ref = node, node = node.next, {
              value: ref.value,
              prev: (ref1 = ref.prev) != null ? ref1.value : void 0,
              next: (ref2 = ref.next) != null ? ref2.value : void 0
            }));
          }
          return results;
        }
      };
      module2.exports = DLList;
    }
  });

  // node_modules/bottleneck/lib/Events.js
  var require_Events = __commonJS({
    "node_modules/bottleneck/lib/Events.js"(exports2, module2) {
      "use strict";
      function asyncGeneratorStep2(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }
      function _asyncToGenerator2(fn) {
        return function() {
          var self2 = this, args = arguments;
          return new Promise(function(resolve, reject) {
            var gen = fn.apply(self2, args);
            function _next(value) {
              asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          });
        };
      }
      var Events2;
      Events2 = class Events {
        constructor(instance) {
          this.instance = instance;
          this._events = {};
          if (this.instance.on != null || this.instance.once != null || this.instance.removeAllListeners != null) {
            throw new Error("An Emitter already exists for this object");
          }
          this.instance.on = (name, cb) => {
            return this._addListener(name, "many", cb);
          };
          this.instance.once = (name, cb) => {
            return this._addListener(name, "once", cb);
          };
          this.instance.removeAllListeners = (name = null) => {
            if (name != null) {
              return delete this._events[name];
            } else {
              return this._events = {};
            }
          };
        }
        _addListener(name, status, cb) {
          var base;
          if ((base = this._events)[name] == null) {
            base[name] = [];
          }
          this._events[name].push({
            cb,
            status
          });
          return this.instance;
        }
        listenerCount(name) {
          if (this._events[name] != null) {
            return this._events[name].length;
          } else {
            return 0;
          }
        }
        trigger(name, ...args) {
          var _this = this;
          return _asyncToGenerator2(function* () {
            var e, promises;
            try {
              if (name !== "debug") {
                _this.trigger("debug", `Event triggered: ${name}`, args);
              }
              if (_this._events[name] == null) {
                return;
              }
              _this._events[name] = _this._events[name].filter(function(listener) {
                return listener.status !== "none";
              });
              promises = _this._events[name].map(
                /* @__PURE__ */ function() {
                  var _ref = _asyncToGenerator2(function* (listener) {
                    var e2, returned;
                    if (listener.status === "none") {
                      return;
                    }
                    if (listener.status === "once") {
                      listener.status = "none";
                    }
                    try {
                      returned = typeof listener.cb === "function" ? listener.cb(...args) : void 0;
                      if (typeof (returned != null ? returned.then : void 0) === "function") {
                        return yield returned;
                      } else {
                        return returned;
                      }
                    } catch (error) {
                      e2 = error;
                      if (true) {
                        _this.trigger("error", e2);
                      }
                      return null;
                    }
                  });
                  return function(_x) {
                    return _ref.apply(this, arguments);
                  };
                }()
              );
              return (yield Promise.all(promises)).find(function(x) {
                return x != null;
              });
            } catch (error) {
              e = error;
              if (true) {
                _this.trigger("error", e);
              }
              return null;
            }
          })();
        }
      };
      module2.exports = Events2;
    }
  });

  // node_modules/bottleneck/lib/Queues.js
  var require_Queues = __commonJS({
    "node_modules/bottleneck/lib/Queues.js"(exports2, module2) {
      "use strict";
      var DLList;
      var Events2;
      var Queues;
      DLList = require_DLList();
      Events2 = require_Events();
      Queues = class Queues {
        constructor(num_priorities) {
          var i;
          this.Events = new Events2(this);
          this._length = 0;
          this._lists = function() {
            var j, ref, results;
            results = [];
            for (i = j = 1, ref = num_priorities; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
              results.push(new DLList(() => {
                return this.incr();
              }, () => {
                return this.decr();
              }));
            }
            return results;
          }.call(this);
        }
        incr() {
          if (this._length++ === 0) {
            return this.Events.trigger("leftzero");
          }
        }
        decr() {
          if (--this._length === 0) {
            return this.Events.trigger("zero");
          }
        }
        push(job) {
          return this._lists[job.options.priority].push(job);
        }
        queued(priority) {
          if (priority != null) {
            return this._lists[priority].length;
          } else {
            return this._length;
          }
        }
        shiftAll(fn) {
          return this._lists.forEach(function(list) {
            return list.forEachShift(fn);
          });
        }
        getFirst(arr = this._lists) {
          var j, len, list;
          for (j = 0, len = arr.length; j < len; j++) {
            list = arr[j];
            if (list.length > 0) {
              return list;
            }
          }
          return [];
        }
        shiftLastFrom(priority) {
          return this.getFirst(this._lists.slice(priority).reverse()).shift();
        }
      };
      module2.exports = Queues;
    }
  });

  // node_modules/bottleneck/lib/BottleneckError.js
  var require_BottleneckError = __commonJS({
    "node_modules/bottleneck/lib/BottleneckError.js"(exports2, module2) {
      "use strict";
      var BottleneckError;
      BottleneckError = class BottleneckError extends Error {
      };
      module2.exports = BottleneckError;
    }
  });

  // node_modules/bottleneck/lib/Job.js
  var require_Job = __commonJS({
    "node_modules/bottleneck/lib/Job.js"(exports2, module2) {
      "use strict";
      function asyncGeneratorStep2(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }
      function _asyncToGenerator2(fn) {
        return function() {
          var self2 = this, args = arguments;
          return new Promise(function(resolve, reject) {
            var gen = fn.apply(self2, args);
            function _next(value) {
              asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          });
        };
      }
      var BottleneckError;
      var DEFAULT_PRIORITY;
      var Job;
      var NUM_PRIORITIES;
      var parser2;
      NUM_PRIORITIES = 10;
      DEFAULT_PRIORITY = 5;
      parser2 = require_parser();
      BottleneckError = require_BottleneckError();
      Job = class Job {
        constructor(task, args, options2, jobDefaults, rejectOnDrop, Events2, _states, Promise2) {
          this.task = task;
          this.args = args;
          this.rejectOnDrop = rejectOnDrop;
          this.Events = Events2;
          this._states = _states;
          this.Promise = Promise2;
          this.options = parser2.load(options2, jobDefaults);
          this.options.priority = this._sanitizePriority(this.options.priority);
          if (this.options.id === jobDefaults.id) {
            this.options.id = `${this.options.id}-${this._randomIndex()}`;
          }
          this.promise = new this.Promise((_resolve, _reject) => {
            this._resolve = _resolve;
            this._reject = _reject;
          });
          this.retryCount = 0;
        }
        _sanitizePriority(priority) {
          var sProperty;
          sProperty = ~~priority !== priority ? DEFAULT_PRIORITY : priority;
          if (sProperty < 0) {
            return 0;
          } else if (sProperty > NUM_PRIORITIES - 1) {
            return NUM_PRIORITIES - 1;
          } else {
            return sProperty;
          }
        }
        _randomIndex() {
          return Math.random().toString(36).slice(2);
        }
        doDrop({
          error,
          message = "This job has been dropped by Bottleneck"
        } = {}) {
          if (this._states.remove(this.options.id)) {
            if (this.rejectOnDrop) {
              this._reject(error != null ? error : new BottleneckError(message));
            }
            this.Events.trigger("dropped", {
              args: this.args,
              options: this.options,
              task: this.task,
              promise: this.promise
            });
            return true;
          } else {
            return false;
          }
        }
        _assertStatus(expected) {
          var status;
          status = this._states.jobStatus(this.options.id);
          if (!(status === expected || expected === "DONE" && status === null)) {
            throw new BottleneckError(`Invalid job status ${status}, expected ${expected}. Please open an issue at https://github.com/SGrondin/bottleneck/issues`);
          }
        }
        doReceive() {
          this._states.start(this.options.id);
          return this.Events.trigger("received", {
            args: this.args,
            options: this.options
          });
        }
        doQueue(reachedHWM, blocked) {
          this._assertStatus("RECEIVED");
          this._states.next(this.options.id);
          return this.Events.trigger("queued", {
            args: this.args,
            options: this.options,
            reachedHWM,
            blocked
          });
        }
        doRun() {
          if (this.retryCount === 0) {
            this._assertStatus("QUEUED");
            this._states.next(this.options.id);
          } else {
            this._assertStatus("EXECUTING");
          }
          return this.Events.trigger("scheduled", {
            args: this.args,
            options: this.options
          });
        }
        doExecute(chained, clearGlobalState, run, free) {
          var _this = this;
          return _asyncToGenerator2(function* () {
            var error, eventInfo, passed;
            if (_this.retryCount === 0) {
              _this._assertStatus("RUNNING");
              _this._states.next(_this.options.id);
            } else {
              _this._assertStatus("EXECUTING");
            }
            eventInfo = {
              args: _this.args,
              options: _this.options,
              retryCount: _this.retryCount
            };
            _this.Events.trigger("executing", eventInfo);
            try {
              passed = yield chained != null ? chained.schedule(_this.options, _this.task, ..._this.args) : _this.task(..._this.args);
              if (clearGlobalState()) {
                _this.doDone(eventInfo);
                yield free(_this.options, eventInfo);
                _this._assertStatus("DONE");
                return _this._resolve(passed);
              }
            } catch (error1) {
              error = error1;
              return _this._onFailure(error, eventInfo, clearGlobalState, run, free);
            }
          })();
        }
        doExpire(clearGlobalState, run, free) {
          var error, eventInfo;
          if (this._states.jobStatus(this.options.id === "RUNNING")) {
            this._states.next(this.options.id);
          }
          this._assertStatus("EXECUTING");
          eventInfo = {
            args: this.args,
            options: this.options,
            retryCount: this.retryCount
          };
          error = new BottleneckError(`This job timed out after ${this.options.expiration} ms.`);
          return this._onFailure(error, eventInfo, clearGlobalState, run, free);
        }
        _onFailure(error, eventInfo, clearGlobalState, run, free) {
          var _this2 = this;
          return _asyncToGenerator2(function* () {
            var retry, retryAfter;
            if (clearGlobalState()) {
              retry = yield _this2.Events.trigger("failed", error, eventInfo);
              if (retry != null) {
                retryAfter = ~~retry;
                _this2.Events.trigger("retry", `Retrying ${_this2.options.id} after ${retryAfter} ms`, eventInfo);
                _this2.retryCount++;
                return run(retryAfter);
              } else {
                _this2.doDone(eventInfo);
                yield free(_this2.options, eventInfo);
                _this2._assertStatus("DONE");
                return _this2._reject(error);
              }
            }
          })();
        }
        doDone(eventInfo) {
          this._assertStatus("EXECUTING");
          this._states.next(this.options.id);
          return this.Events.trigger("done", eventInfo);
        }
      };
      module2.exports = Job;
    }
  });

  // node_modules/bottleneck/lib/LocalDatastore.js
  var require_LocalDatastore = __commonJS({
    "node_modules/bottleneck/lib/LocalDatastore.js"(exports2, module2) {
      "use strict";
      function asyncGeneratorStep2(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }
      function _asyncToGenerator2(fn) {
        return function() {
          var self2 = this, args = arguments;
          return new Promise(function(resolve, reject) {
            var gen = fn.apply(self2, args);
            function _next(value) {
              asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          });
        };
      }
      var BottleneckError;
      var LocalDatastore;
      var parser2;
      parser2 = require_parser();
      BottleneckError = require_BottleneckError();
      LocalDatastore = class LocalDatastore {
        constructor(instance, storeOptions, storeInstanceOptions) {
          this.instance = instance;
          this.storeOptions = storeOptions;
          this.clientId = this.instance._randomIndex();
          parser2.load(storeInstanceOptions, storeInstanceOptions, this);
          this._nextRequest = this._lastReservoirRefresh = this._lastReservoirIncrease = Date.now();
          this._running = 0;
          this._done = 0;
          this._unblockTime = 0;
          this.ready = this.Promise.resolve();
          this.clients = {};
          this._startHeartbeat();
        }
        _startHeartbeat() {
          var base;
          if (this.heartbeat == null && (this.storeOptions.reservoirRefreshInterval != null && this.storeOptions.reservoirRefreshAmount != null || this.storeOptions.reservoirIncreaseInterval != null && this.storeOptions.reservoirIncreaseAmount != null)) {
            return typeof (base = this.heartbeat = setInterval(() => {
              var amount, incr, maximum, now, reservoir;
              now = Date.now();
              if (this.storeOptions.reservoirRefreshInterval != null && now >= this._lastReservoirRefresh + this.storeOptions.reservoirRefreshInterval) {
                this._lastReservoirRefresh = now;
                this.storeOptions.reservoir = this.storeOptions.reservoirRefreshAmount;
                this.instance._drainAll(this.computeCapacity());
              }
              if (this.storeOptions.reservoirIncreaseInterval != null && now >= this._lastReservoirIncrease + this.storeOptions.reservoirIncreaseInterval) {
                var _this$storeOptions = this.storeOptions;
                amount = _this$storeOptions.reservoirIncreaseAmount;
                maximum = _this$storeOptions.reservoirIncreaseMaximum;
                reservoir = _this$storeOptions.reservoir;
                this._lastReservoirIncrease = now;
                incr = maximum != null ? Math.min(amount, maximum - reservoir) : amount;
                if (incr > 0) {
                  this.storeOptions.reservoir += incr;
                  return this.instance._drainAll(this.computeCapacity());
                }
              }
            }, this.heartbeatInterval)).unref === "function" ? base.unref() : void 0;
          } else {
            return clearInterval(this.heartbeat);
          }
        }
        __publish__(message) {
          var _this = this;
          return _asyncToGenerator2(function* () {
            yield _this.yieldLoop();
            return _this.instance.Events.trigger("message", message.toString());
          })();
        }
        __disconnect__(flush) {
          var _this2 = this;
          return _asyncToGenerator2(function* () {
            yield _this2.yieldLoop();
            clearInterval(_this2.heartbeat);
            return _this2.Promise.resolve();
          })();
        }
        yieldLoop(t = 0) {
          return new this.Promise(function(resolve, reject) {
            return setTimeout(resolve, t);
          });
        }
        computePenalty() {
          var ref;
          return (ref = this.storeOptions.penalty) != null ? ref : 15 * this.storeOptions.minTime || 5e3;
        }
        __updateSettings__(options2) {
          var _this3 = this;
          return _asyncToGenerator2(function* () {
            yield _this3.yieldLoop();
            parser2.overwrite(options2, options2, _this3.storeOptions);
            _this3._startHeartbeat();
            _this3.instance._drainAll(_this3.computeCapacity());
            return true;
          })();
        }
        __running__() {
          var _this4 = this;
          return _asyncToGenerator2(function* () {
            yield _this4.yieldLoop();
            return _this4._running;
          })();
        }
        __queued__() {
          var _this5 = this;
          return _asyncToGenerator2(function* () {
            yield _this5.yieldLoop();
            return _this5.instance.queued();
          })();
        }
        __done__() {
          var _this6 = this;
          return _asyncToGenerator2(function* () {
            yield _this6.yieldLoop();
            return _this6._done;
          })();
        }
        __groupCheck__(time) {
          var _this7 = this;
          return _asyncToGenerator2(function* () {
            yield _this7.yieldLoop();
            return _this7._nextRequest + _this7.timeout < time;
          })();
        }
        computeCapacity() {
          var maxConcurrent, reservoir;
          var _this$storeOptions2 = this.storeOptions;
          maxConcurrent = _this$storeOptions2.maxConcurrent;
          reservoir = _this$storeOptions2.reservoir;
          if (maxConcurrent != null && reservoir != null) {
            return Math.min(maxConcurrent - this._running, reservoir);
          } else if (maxConcurrent != null) {
            return maxConcurrent - this._running;
          } else if (reservoir != null) {
            return reservoir;
          } else {
            return null;
          }
        }
        conditionsCheck(weight) {
          var capacity;
          capacity = this.computeCapacity();
          return capacity == null || weight <= capacity;
        }
        __incrementReservoir__(incr) {
          var _this8 = this;
          return _asyncToGenerator2(function* () {
            var reservoir;
            yield _this8.yieldLoop();
            reservoir = _this8.storeOptions.reservoir += incr;
            _this8.instance._drainAll(_this8.computeCapacity());
            return reservoir;
          })();
        }
        __currentReservoir__() {
          var _this9 = this;
          return _asyncToGenerator2(function* () {
            yield _this9.yieldLoop();
            return _this9.storeOptions.reservoir;
          })();
        }
        isBlocked(now) {
          return this._unblockTime >= now;
        }
        check(weight, now) {
          return this.conditionsCheck(weight) && this._nextRequest - now <= 0;
        }
        __check__(weight) {
          var _this10 = this;
          return _asyncToGenerator2(function* () {
            var now;
            yield _this10.yieldLoop();
            now = Date.now();
            return _this10.check(weight, now);
          })();
        }
        __register__(index, weight, expiration) {
          var _this11 = this;
          return _asyncToGenerator2(function* () {
            var now, wait;
            yield _this11.yieldLoop();
            now = Date.now();
            if (_this11.conditionsCheck(weight)) {
              _this11._running += weight;
              if (_this11.storeOptions.reservoir != null) {
                _this11.storeOptions.reservoir -= weight;
              }
              wait = Math.max(_this11._nextRequest - now, 0);
              _this11._nextRequest = now + wait + _this11.storeOptions.minTime;
              return {
                success: true,
                wait,
                reservoir: _this11.storeOptions.reservoir
              };
            } else {
              return {
                success: false
              };
            }
          })();
        }
        strategyIsBlock() {
          return this.storeOptions.strategy === 3;
        }
        __submit__(queueLength, weight) {
          var _this12 = this;
          return _asyncToGenerator2(function* () {
            var blocked, now, reachedHWM;
            yield _this12.yieldLoop();
            if (_this12.storeOptions.maxConcurrent != null && weight > _this12.storeOptions.maxConcurrent) {
              throw new BottleneckError(`Impossible to add a job having a weight of ${weight} to a limiter having a maxConcurrent setting of ${_this12.storeOptions.maxConcurrent}`);
            }
            now = Date.now();
            reachedHWM = _this12.storeOptions.highWater != null && queueLength === _this12.storeOptions.highWater && !_this12.check(weight, now);
            blocked = _this12.strategyIsBlock() && (reachedHWM || _this12.isBlocked(now));
            if (blocked) {
              _this12._unblockTime = now + _this12.computePenalty();
              _this12._nextRequest = _this12._unblockTime + _this12.storeOptions.minTime;
              _this12.instance._dropAllQueued();
            }
            return {
              reachedHWM,
              blocked,
              strategy: _this12.storeOptions.strategy
            };
          })();
        }
        __free__(index, weight) {
          var _this13 = this;
          return _asyncToGenerator2(function* () {
            yield _this13.yieldLoop();
            _this13._running -= weight;
            _this13._done += weight;
            _this13.instance._drainAll(_this13.computeCapacity());
            return {
              running: _this13._running
            };
          })();
        }
      };
      module2.exports = LocalDatastore;
    }
  });

  // node_modules/bottleneck/lib/lua.json
  var require_lua = __commonJS({
    "node_modules/bottleneck/lib/lua.json"(exports2, module2) {
      module2.exports = {
        "blacklist_client.lua": "local blacklist = ARGV[num_static_argv + 1]\n\nif redis.call('zscore', client_last_seen_key, blacklist) then\n  redis.call('zadd', client_last_seen_key, 0, blacklist)\nend\n\n\nreturn {}\n",
        "check.lua": "local weight = tonumber(ARGV[num_static_argv + 1])\n\nlocal capacity = process_tick(now, false)['capacity']\nlocal nextRequest = tonumber(redis.call('hget', settings_key, 'nextRequest'))\n\nreturn conditions_check(capacity, weight) and nextRequest - now <= 0\n",
        "conditions_check.lua": "local conditions_check = function (capacity, weight)\n  return capacity == nil or weight <= capacity\nend\n",
        "current_reservoir.lua": "return process_tick(now, false)['reservoir']\n",
        "done.lua": "process_tick(now, false)\n\nreturn tonumber(redis.call('hget', settings_key, 'done'))\n",
        "free.lua": "local index = ARGV[num_static_argv + 1]\n\nredis.call('zadd', job_expirations_key, 0, index)\n\nreturn process_tick(now, false)['running']\n",
        "get_time.lua": "redis.replicate_commands()\n\nlocal get_time = function ()\n  local time = redis.call('time')\n\n  return tonumber(time[1]..string.sub(time[2], 1, 3))\nend\n",
        "group_check.lua": "return not (redis.call('exists', settings_key) == 1)\n",
        "heartbeat.lua": "process_tick(now, true)\n",
        "increment_reservoir.lua": "local incr = tonumber(ARGV[num_static_argv + 1])\n\nredis.call('hincrby', settings_key, 'reservoir', incr)\n\nlocal reservoir = process_tick(now, true)['reservoir']\n\nlocal groupTimeout = tonumber(redis.call('hget', settings_key, 'groupTimeout'))\nrefresh_expiration(0, 0, groupTimeout)\n\nreturn reservoir\n",
        "init.lua": `local clear = tonumber(ARGV[num_static_argv + 1])
local limiter_version = ARGV[num_static_argv + 2]
local num_local_argv = num_static_argv + 2

if clear == 1 then
  redis.call('del', unpack(KEYS))
end

if redis.call('exists', settings_key) == 0 then
  -- Create
  local args = {'hmset', settings_key}

  for i = num_local_argv + 1, #ARGV do
    table.insert(args, ARGV[i])
  end

  redis.call(unpack(args))
  redis.call('hmset', settings_key,
    'nextRequest', now,
    'lastReservoirRefresh', now,
    'lastReservoirIncrease', now,
    'running', 0,
    'done', 0,
    'unblockTime', 0,
    'capacityPriorityCounter', 0
  )

else
  -- Apply migrations
  local settings = redis.call('hmget', settings_key,
    'id',
    'version'
  )
  local id = settings[1]
  local current_version = settings[2]

  if current_version ~= limiter_version then
    local version_digits = {}
    for k, v in string.gmatch(current_version, "([^.]+)") do
      table.insert(version_digits, tonumber(k))
    end

    -- 2.10.0
    if version_digits[2] < 10 then
      redis.call('hsetnx', settings_key, 'reservoirRefreshInterval', '')
      redis.call('hsetnx', settings_key, 'reservoirRefreshAmount', '')
      redis.call('hsetnx', settings_key, 'lastReservoirRefresh', '')
      redis.call('hsetnx', settings_key, 'done', 0)
      redis.call('hset', settings_key, 'version', '2.10.0')
    end

    -- 2.11.1
    if version_digits[2] < 11 or (version_digits[2] == 11 and version_digits[3] < 1) then
      if redis.call('hstrlen', settings_key, 'lastReservoirRefresh') == 0 then
        redis.call('hmset', settings_key,
          'lastReservoirRefresh', now,
          'version', '2.11.1'
        )
      end
    end

    -- 2.14.0
    if version_digits[2] < 14 then
      local old_running_key = 'b_'..id..'_running'
      local old_executing_key = 'b_'..id..'_executing'

      if redis.call('exists', old_running_key) == 1 then
        redis.call('rename', old_running_key, job_weights_key)
      end
      if redis.call('exists', old_executing_key) == 1 then
        redis.call('rename', old_executing_key, job_expirations_key)
      end
      redis.call('hset', settings_key, 'version', '2.14.0')
    end

    -- 2.15.2
    if version_digits[2] < 15 or (version_digits[2] == 15 and version_digits[3] < 2) then
      redis.call('hsetnx', settings_key, 'capacityPriorityCounter', 0)
      redis.call('hset', settings_key, 'version', '2.15.2')
    end

    -- 2.17.0
    if version_digits[2] < 17 then
      redis.call('hsetnx', settings_key, 'clientTimeout', 10000)
      redis.call('hset', settings_key, 'version', '2.17.0')
    end

    -- 2.18.0
    if version_digits[2] < 18 then
      redis.call('hsetnx', settings_key, 'reservoirIncreaseInterval', '')
      redis.call('hsetnx', settings_key, 'reservoirIncreaseAmount', '')
      redis.call('hsetnx', settings_key, 'reservoirIncreaseMaximum', '')
      redis.call('hsetnx', settings_key, 'lastReservoirIncrease', now)
      redis.call('hset', settings_key, 'version', '2.18.0')
    end

  end

  process_tick(now, false)
end

local groupTimeout = tonumber(redis.call('hget', settings_key, 'groupTimeout'))
refresh_expiration(0, 0, groupTimeout)

return {}
`,
        "process_tick.lua": "local process_tick = function (now, always_publish)\n\n  local compute_capacity = function (maxConcurrent, running, reservoir)\n    if maxConcurrent ~= nil and reservoir ~= nil then\n      return math.min((maxConcurrent - running), reservoir)\n    elseif maxConcurrent ~= nil then\n      return maxConcurrent - running\n    elseif reservoir ~= nil then\n      return reservoir\n    else\n      return nil\n    end\n  end\n\n  local settings = redis.call('hmget', settings_key,\n    'id',\n    'maxConcurrent',\n    'running',\n    'reservoir',\n    'reservoirRefreshInterval',\n    'reservoirRefreshAmount',\n    'lastReservoirRefresh',\n    'reservoirIncreaseInterval',\n    'reservoirIncreaseAmount',\n    'reservoirIncreaseMaximum',\n    'lastReservoirIncrease',\n    'capacityPriorityCounter',\n    'clientTimeout'\n  )\n  local id = settings[1]\n  local maxConcurrent = tonumber(settings[2])\n  local running = tonumber(settings[3])\n  local reservoir = tonumber(settings[4])\n  local reservoirRefreshInterval = tonumber(settings[5])\n  local reservoirRefreshAmount = tonumber(settings[6])\n  local lastReservoirRefresh = tonumber(settings[7])\n  local reservoirIncreaseInterval = tonumber(settings[8])\n  local reservoirIncreaseAmount = tonumber(settings[9])\n  local reservoirIncreaseMaximum = tonumber(settings[10])\n  local lastReservoirIncrease = tonumber(settings[11])\n  local capacityPriorityCounter = tonumber(settings[12])\n  local clientTimeout = tonumber(settings[13])\n\n  local initial_capacity = compute_capacity(maxConcurrent, running, reservoir)\n\n  --\n  -- Process 'running' changes\n  --\n  local expired = redis.call('zrangebyscore', job_expirations_key, '-inf', '('..now)\n\n  if #expired > 0 then\n    redis.call('zremrangebyscore', job_expirations_key, '-inf', '('..now)\n\n    local flush_batch = function (batch, acc)\n      local weights = redis.call('hmget', job_weights_key, unpack(batch))\n                      redis.call('hdel',  job_weights_key, unpack(batch))\n      local clients = redis.call('hmget', job_clients_key, unpack(batch))\n                      redis.call('hdel',  job_clients_key, unpack(batch))\n\n      -- Calculate sum of removed weights\n      for i = 1, #weights do\n        acc['total'] = acc['total'] + (tonumber(weights[i]) or 0)\n      end\n\n      -- Calculate sum of removed weights by client\n      local client_weights = {}\n      for i = 1, #clients do\n        local removed = tonumber(weights[i]) or 0\n        if removed > 0 then\n          acc['client_weights'][clients[i]] = (acc['client_weights'][clients[i]] or 0) + removed\n        end\n      end\n    end\n\n    local acc = {\n      ['total'] = 0,\n      ['client_weights'] = {}\n    }\n    local batch_size = 1000\n\n    -- Compute changes to Zsets and apply changes to Hashes\n    for i = 1, #expired, batch_size do\n      local batch = {}\n      for j = i, math.min(i + batch_size - 1, #expired) do\n        table.insert(batch, expired[j])\n      end\n\n      flush_batch(batch, acc)\n    end\n\n    -- Apply changes to Zsets\n    if acc['total'] > 0 then\n      redis.call('hincrby', settings_key, 'done', acc['total'])\n      running = tonumber(redis.call('hincrby', settings_key, 'running', -acc['total']))\n    end\n\n    for client, weight in pairs(acc['client_weights']) do\n      redis.call('zincrby', client_running_key, -weight, client)\n    end\n  end\n\n  --\n  -- Process 'reservoir' changes\n  --\n  local reservoirRefreshActive = reservoirRefreshInterval ~= nil and reservoirRefreshAmount ~= nil\n  if reservoirRefreshActive and now >= lastReservoirRefresh + reservoirRefreshInterval then\n    reservoir = reservoirRefreshAmount\n    redis.call('hmset', settings_key,\n      'reservoir', reservoir,\n      'lastReservoirRefresh', now\n    )\n  end\n\n  local reservoirIncreaseActive = reservoirIncreaseInterval ~= nil and reservoirIncreaseAmount ~= nil\n  if reservoirIncreaseActive and now >= lastReservoirIncrease + reservoirIncreaseInterval then\n    local num_intervals = math.floor((now - lastReservoirIncrease) / reservoirIncreaseInterval)\n    local incr = reservoirIncreaseAmount * num_intervals\n    if reservoirIncreaseMaximum ~= nil then\n      incr = math.min(incr, reservoirIncreaseMaximum - (reservoir or 0))\n    end\n    if incr > 0 then\n      reservoir = (reservoir or 0) + incr\n    end\n    redis.call('hmset', settings_key,\n      'reservoir', reservoir,\n      'lastReservoirIncrease', lastReservoirIncrease + (num_intervals * reservoirIncreaseInterval)\n    )\n  end\n\n  --\n  -- Clear unresponsive clients\n  --\n  local unresponsive = redis.call('zrangebyscore', client_last_seen_key, '-inf', (now - clientTimeout))\n  local unresponsive_lookup = {}\n  local terminated_clients = {}\n  for i = 1, #unresponsive do\n    unresponsive_lookup[unresponsive[i]] = true\n    if tonumber(redis.call('zscore', client_running_key, unresponsive[i])) == 0 then\n      table.insert(terminated_clients, unresponsive[i])\n    end\n  end\n  if #terminated_clients > 0 then\n    redis.call('zrem', client_running_key,         unpack(terminated_clients))\n    redis.call('hdel', client_num_queued_key,      unpack(terminated_clients))\n    redis.call('zrem', client_last_registered_key, unpack(terminated_clients))\n    redis.call('zrem', client_last_seen_key,       unpack(terminated_clients))\n  end\n\n  --\n  -- Broadcast capacity changes\n  --\n  local final_capacity = compute_capacity(maxConcurrent, running, reservoir)\n\n  if always_publish or (initial_capacity ~= nil and final_capacity == nil) then\n    -- always_publish or was not unlimited, now unlimited\n    redis.call('publish', 'b_'..id, 'capacity:'..(final_capacity or ''))\n\n  elseif initial_capacity ~= nil and final_capacity ~= nil and final_capacity > initial_capacity then\n    -- capacity was increased\n    -- send the capacity message to the limiter having the lowest number of running jobs\n    -- the tiebreaker is the limiter having not registered a job in the longest time\n\n    local lowest_concurrency_value = nil\n    local lowest_concurrency_clients = {}\n    local lowest_concurrency_last_registered = {}\n    local client_concurrencies = redis.call('zrange', client_running_key, 0, -1, 'withscores')\n\n    for i = 1, #client_concurrencies, 2 do\n      local client = client_concurrencies[i]\n      local concurrency = tonumber(client_concurrencies[i+1])\n\n      if (\n        lowest_concurrency_value == nil or lowest_concurrency_value == concurrency\n      ) and (\n        not unresponsive_lookup[client]\n      ) and (\n        tonumber(redis.call('hget', client_num_queued_key, client)) > 0\n      ) then\n        lowest_concurrency_value = concurrency\n        table.insert(lowest_concurrency_clients, client)\n        local last_registered = tonumber(redis.call('zscore', client_last_registered_key, client))\n        table.insert(lowest_concurrency_last_registered, last_registered)\n      end\n    end\n\n    if #lowest_concurrency_clients > 0 then\n      local position = 1\n      local earliest = lowest_concurrency_last_registered[1]\n\n      for i,v in ipairs(lowest_concurrency_last_registered) do\n        if v < earliest then\n          position = i\n          earliest = v\n        end\n      end\n\n      local next_client = lowest_concurrency_clients[position]\n      redis.call('publish', 'b_'..id,\n        'capacity-priority:'..(final_capacity or '')..\n        ':'..next_client..\n        ':'..capacityPriorityCounter\n      )\n      redis.call('hincrby', settings_key, 'capacityPriorityCounter', '1')\n    else\n      redis.call('publish', 'b_'..id, 'capacity:'..(final_capacity or ''))\n    end\n  end\n\n  return {\n    ['capacity'] = final_capacity,\n    ['running'] = running,\n    ['reservoir'] = reservoir\n  }\nend\n",
        "queued.lua": "local clientTimeout = tonumber(redis.call('hget', settings_key, 'clientTimeout'))\nlocal valid_clients = redis.call('zrangebyscore', client_last_seen_key, (now - clientTimeout), 'inf')\nlocal client_queued = redis.call('hmget', client_num_queued_key, unpack(valid_clients))\n\nlocal sum = 0\nfor i = 1, #client_queued do\n  sum = sum + tonumber(client_queued[i])\nend\n\nreturn sum\n",
        "refresh_expiration.lua": "local refresh_expiration = function (now, nextRequest, groupTimeout)\n\n  if groupTimeout ~= nil then\n    local ttl = (nextRequest + groupTimeout) - now\n\n    for i = 1, #KEYS do\n      redis.call('pexpire', KEYS[i], ttl)\n    end\n  end\n\nend\n",
        "refs.lua": "local settings_key = KEYS[1]\nlocal job_weights_key = KEYS[2]\nlocal job_expirations_key = KEYS[3]\nlocal job_clients_key = KEYS[4]\nlocal client_running_key = KEYS[5]\nlocal client_num_queued_key = KEYS[6]\nlocal client_last_registered_key = KEYS[7]\nlocal client_last_seen_key = KEYS[8]\n\nlocal now = tonumber(ARGV[1])\nlocal client = ARGV[2]\n\nlocal num_static_argv = 2\n",
        "register.lua": "local index = ARGV[num_static_argv + 1]\nlocal weight = tonumber(ARGV[num_static_argv + 2])\nlocal expiration = tonumber(ARGV[num_static_argv + 3])\n\nlocal state = process_tick(now, false)\nlocal capacity = state['capacity']\nlocal reservoir = state['reservoir']\n\nlocal settings = redis.call('hmget', settings_key,\n  'nextRequest',\n  'minTime',\n  'groupTimeout'\n)\nlocal nextRequest = tonumber(settings[1])\nlocal minTime = tonumber(settings[2])\nlocal groupTimeout = tonumber(settings[3])\n\nif conditions_check(capacity, weight) then\n\n  redis.call('hincrby', settings_key, 'running', weight)\n  redis.call('hset', job_weights_key, index, weight)\n  if expiration ~= nil then\n    redis.call('zadd', job_expirations_key, now + expiration, index)\n  end\n  redis.call('hset', job_clients_key, index, client)\n  redis.call('zincrby', client_running_key, weight, client)\n  redis.call('hincrby', client_num_queued_key, client, -1)\n  redis.call('zadd', client_last_registered_key, now, client)\n\n  local wait = math.max(nextRequest - now, 0)\n  local newNextRequest = now + wait + minTime\n\n  if reservoir == nil then\n    redis.call('hset', settings_key,\n      'nextRequest', newNextRequest\n    )\n  else\n    reservoir = reservoir - weight\n    redis.call('hmset', settings_key,\n      'reservoir', reservoir,\n      'nextRequest', newNextRequest\n    )\n  end\n\n  refresh_expiration(now, newNextRequest, groupTimeout)\n\n  return {true, wait, reservoir}\n\nelse\n  return {false}\nend\n",
        "register_client.lua": "local queued = tonumber(ARGV[num_static_argv + 1])\n\n-- Could have been re-registered concurrently\nif not redis.call('zscore', client_last_seen_key, client) then\n  redis.call('zadd', client_running_key, 0, client)\n  redis.call('hset', client_num_queued_key, client, queued)\n  redis.call('zadd', client_last_registered_key, 0, client)\nend\n\nredis.call('zadd', client_last_seen_key, now, client)\n\nreturn {}\n",
        "running.lua": "return process_tick(now, false)['running']\n",
        "submit.lua": "local queueLength = tonumber(ARGV[num_static_argv + 1])\nlocal weight = tonumber(ARGV[num_static_argv + 2])\n\nlocal capacity = process_tick(now, false)['capacity']\n\nlocal settings = redis.call('hmget', settings_key,\n  'id',\n  'maxConcurrent',\n  'highWater',\n  'nextRequest',\n  'strategy',\n  'unblockTime',\n  'penalty',\n  'minTime',\n  'groupTimeout'\n)\nlocal id = settings[1]\nlocal maxConcurrent = tonumber(settings[2])\nlocal highWater = tonumber(settings[3])\nlocal nextRequest = tonumber(settings[4])\nlocal strategy = tonumber(settings[5])\nlocal unblockTime = tonumber(settings[6])\nlocal penalty = tonumber(settings[7])\nlocal minTime = tonumber(settings[8])\nlocal groupTimeout = tonumber(settings[9])\n\nif maxConcurrent ~= nil and weight > maxConcurrent then\n  return redis.error_reply('OVERWEIGHT:'..weight..':'..maxConcurrent)\nend\n\nlocal reachedHWM = (highWater ~= nil and queueLength == highWater\n  and not (\n    conditions_check(capacity, weight)\n    and nextRequest - now <= 0\n  )\n)\n\nlocal blocked = strategy == 3 and (reachedHWM or unblockTime >= now)\n\nif blocked then\n  local computedPenalty = penalty\n  if computedPenalty == nil then\n    if minTime == 0 then\n      computedPenalty = 5000\n    else\n      computedPenalty = 15 * minTime\n    end\n  end\n\n  local newNextRequest = now + computedPenalty + minTime\n\n  redis.call('hmset', settings_key,\n    'unblockTime', now + computedPenalty,\n    'nextRequest', newNextRequest\n  )\n\n  local clients_queued_reset = redis.call('hkeys', client_num_queued_key)\n  local queued_reset = {}\n  for i = 1, #clients_queued_reset do\n    table.insert(queued_reset, clients_queued_reset[i])\n    table.insert(queued_reset, 0)\n  end\n  redis.call('hmset', client_num_queued_key, unpack(queued_reset))\n\n  redis.call('publish', 'b_'..id, 'blocked:')\n\n  refresh_expiration(now, newNextRequest, groupTimeout)\nend\n\nif not blocked and not reachedHWM then\n  redis.call('hincrby', client_num_queued_key, client, 1)\nend\n\nreturn {reachedHWM, blocked, strategy}\n",
        "update_settings.lua": "local args = {'hmset', settings_key}\n\nfor i = num_static_argv + 1, #ARGV do\n  table.insert(args, ARGV[i])\nend\n\nredis.call(unpack(args))\n\nprocess_tick(now, true)\n\nlocal groupTimeout = tonumber(redis.call('hget', settings_key, 'groupTimeout'))\nrefresh_expiration(0, 0, groupTimeout)\n\nreturn {}\n",
        "validate_client.lua": "if not redis.call('zscore', client_last_seen_key, client) then\n  return redis.error_reply('UNKNOWN_CLIENT')\nend\n\nredis.call('zadd', client_last_seen_key, now, client)\n",
        "validate_keys.lua": "if not (redis.call('exists', settings_key) == 1) then\n  return redis.error_reply('SETTINGS_KEY_NOT_FOUND')\nend\n"
      };
    }
  });

  // node_modules/bottleneck/lib/Scripts.js
  var require_Scripts = __commonJS({
    "node_modules/bottleneck/lib/Scripts.js"(exports2) {
      "use strict";
      var headers;
      var lua;
      var templates;
      lua = require_lua();
      headers = {
        refs: lua["refs.lua"],
        validate_keys: lua["validate_keys.lua"],
        validate_client: lua["validate_client.lua"],
        refresh_expiration: lua["refresh_expiration.lua"],
        process_tick: lua["process_tick.lua"],
        conditions_check: lua["conditions_check.lua"],
        get_time: lua["get_time.lua"]
      };
      exports2.allKeys = function(id) {
        return [
          /*
          HASH
          */
          `b_${id}_settings`,
          /*
          HASH
          job index -> weight
          */
          `b_${id}_job_weights`,
          /*
          ZSET
          job index -> expiration
          */
          `b_${id}_job_expirations`,
          /*
          HASH
          job index -> client
          */
          `b_${id}_job_clients`,
          /*
          ZSET
          client -> sum running
          */
          `b_${id}_client_running`,
          /*
          HASH
          client -> num queued
          */
          `b_${id}_client_num_queued`,
          /*
          ZSET
          client -> last job registered
          */
          `b_${id}_client_last_registered`,
          /*
          ZSET
          client -> last seen
          */
          `b_${id}_client_last_seen`
        ];
      };
      templates = {
        init: {
          keys: exports2.allKeys,
          headers: ["process_tick"],
          refresh_expiration: true,
          code: lua["init.lua"]
        },
        group_check: {
          keys: exports2.allKeys,
          headers: [],
          refresh_expiration: false,
          code: lua["group_check.lua"]
        },
        register_client: {
          keys: exports2.allKeys,
          headers: ["validate_keys"],
          refresh_expiration: false,
          code: lua["register_client.lua"]
        },
        blacklist_client: {
          keys: exports2.allKeys,
          headers: ["validate_keys", "validate_client"],
          refresh_expiration: false,
          code: lua["blacklist_client.lua"]
        },
        heartbeat: {
          keys: exports2.allKeys,
          headers: ["validate_keys", "validate_client", "process_tick"],
          refresh_expiration: false,
          code: lua["heartbeat.lua"]
        },
        update_settings: {
          keys: exports2.allKeys,
          headers: ["validate_keys", "validate_client", "process_tick"],
          refresh_expiration: true,
          code: lua["update_settings.lua"]
        },
        running: {
          keys: exports2.allKeys,
          headers: ["validate_keys", "validate_client", "process_tick"],
          refresh_expiration: false,
          code: lua["running.lua"]
        },
        queued: {
          keys: exports2.allKeys,
          headers: ["validate_keys", "validate_client"],
          refresh_expiration: false,
          code: lua["queued.lua"]
        },
        done: {
          keys: exports2.allKeys,
          headers: ["validate_keys", "validate_client", "process_tick"],
          refresh_expiration: false,
          code: lua["done.lua"]
        },
        check: {
          keys: exports2.allKeys,
          headers: ["validate_keys", "validate_client", "process_tick", "conditions_check"],
          refresh_expiration: false,
          code: lua["check.lua"]
        },
        submit: {
          keys: exports2.allKeys,
          headers: ["validate_keys", "validate_client", "process_tick", "conditions_check"],
          refresh_expiration: true,
          code: lua["submit.lua"]
        },
        register: {
          keys: exports2.allKeys,
          headers: ["validate_keys", "validate_client", "process_tick", "conditions_check"],
          refresh_expiration: true,
          code: lua["register.lua"]
        },
        free: {
          keys: exports2.allKeys,
          headers: ["validate_keys", "validate_client", "process_tick"],
          refresh_expiration: true,
          code: lua["free.lua"]
        },
        current_reservoir: {
          keys: exports2.allKeys,
          headers: ["validate_keys", "validate_client", "process_tick"],
          refresh_expiration: false,
          code: lua["current_reservoir.lua"]
        },
        increment_reservoir: {
          keys: exports2.allKeys,
          headers: ["validate_keys", "validate_client", "process_tick"],
          refresh_expiration: true,
          code: lua["increment_reservoir.lua"]
        }
      };
      exports2.names = Object.keys(templates);
      exports2.keys = function(name, id) {
        return templates[name].keys(id);
      };
      exports2.payload = function(name) {
        var template;
        template = templates[name];
        return Array.prototype.concat(headers.refs, template.headers.map(function(h) {
          return headers[h];
        }), template.refresh_expiration ? headers.refresh_expiration : "", template.code).join("\n");
      };
    }
  });

  // node_modules/bottleneck/lib/RedisConnection.js
  var require_RedisConnection = __commonJS({
    "node_modules/bottleneck/lib/RedisConnection.js"(exports, module) {
      "use strict";
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }
      function _asyncToGenerator(fn) {
        return function() {
          var self2 = this, args = arguments;
          return new Promise(function(resolve, reject) {
            var gen = fn.apply(self2, args);
            function _next(value) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          });
        };
      }
      var Events;
      var RedisConnection;
      var Scripts;
      var parser;
      parser = require_parser();
      Events = require_Events();
      Scripts = require_Scripts();
      RedisConnection = function() {
        class RedisConnection {
          constructor(options = {}) {
            parser.load(options, this.defaults, this);
            if (this.Redis == null) {
              this.Redis = eval("require")("redis");
            }
            if (this.Events == null) {
              this.Events = new Events(this);
            }
            this.terminated = false;
            if (this.client == null) {
              this.client = this.Redis.createClient(this.clientOptions);
            }
            this.subscriber = this.client.duplicate();
            this.limiters = {};
            this.shas = {};
            this.ready = this.Promise.all([this._setup(this.client, false), this._setup(this.subscriber, true)]).then(() => {
              return this._loadScripts();
            }).then(() => {
              return {
                client: this.client,
                subscriber: this.subscriber
              };
            });
          }
          _setup(client, sub) {
            client.setMaxListeners(0);
            return new this.Promise((resolve, reject) => {
              client.on("error", (e) => {
                return this.Events.trigger("error", e);
              });
              if (sub) {
                client.on("message", (channel, message) => {
                  var ref;
                  return (ref = this.limiters[channel]) != null ? ref._store.onMessage(channel, message) : void 0;
                });
              }
              if (client.ready) {
                return resolve();
              } else {
                return client.once("ready", resolve);
              }
            });
          }
          _loadScript(name) {
            return new this.Promise((resolve, reject) => {
              var payload;
              payload = Scripts.payload(name);
              return this.client.multi([["script", "load", payload]]).exec((err, replies) => {
                if (err != null) {
                  return reject(err);
                }
                this.shas[name] = replies[0];
                return resolve(replies[0]);
              });
            });
          }
          _loadScripts() {
            return this.Promise.all(Scripts.names.map((k) => {
              return this._loadScript(k);
            }));
          }
          __runCommand__(cmd) {
            var _this = this;
            return _asyncToGenerator(function* () {
              yield _this.ready;
              return new _this.Promise((resolve, reject) => {
                return _this.client.multi([cmd]).exec_atomic(function(err, replies) {
                  if (err != null) {
                    return reject(err);
                  } else {
                    return resolve(replies[0]);
                  }
                });
              });
            })();
          }
          __addLimiter__(instance) {
            return this.Promise.all([instance.channel(), instance.channel_client()].map((channel) => {
              return new this.Promise((resolve, reject) => {
                var handler;
                handler = (chan) => {
                  if (chan === channel) {
                    this.subscriber.removeListener("subscribe", handler);
                    this.limiters[channel] = instance;
                    return resolve();
                  }
                };
                this.subscriber.on("subscribe", handler);
                return this.subscriber.subscribe(channel);
              });
            }));
          }
          __removeLimiter__(instance) {
            var _this2 = this;
            return this.Promise.all([instance.channel(), instance.channel_client()].map(
              /* @__PURE__ */ function() {
                var _ref = _asyncToGenerator(function* (channel) {
                  if (!_this2.terminated) {
                    yield new _this2.Promise((resolve, reject) => {
                      return _this2.subscriber.unsubscribe(channel, function(err, chan) {
                        if (err != null) {
                          return reject(err);
                        }
                        if (chan === channel) {
                          return resolve();
                        }
                      });
                    });
                  }
                  return delete _this2.limiters[channel];
                });
                return function(_x) {
                  return _ref.apply(this, arguments);
                };
              }()
            ));
          }
          __scriptArgs__(name, id, args, cb) {
            var keys;
            keys = Scripts.keys(name, id);
            return [this.shas[name], keys.length].concat(keys, args, cb);
          }
          __scriptFn__(name) {
            return this.client.evalsha.bind(this.client);
          }
          disconnect(flush = true) {
            var i, k, len, ref;
            ref = Object.keys(this.limiters);
            for (i = 0, len = ref.length; i < len; i++) {
              k = ref[i];
              clearInterval(this.limiters[k]._store.heartbeat);
            }
            this.limiters = {};
            this.terminated = true;
            this.client.end(flush);
            this.subscriber.end(flush);
            return this.Promise.resolve();
          }
        }
        ;
        RedisConnection.prototype.datastore = "redis";
        RedisConnection.prototype.defaults = {
          Redis: null,
          clientOptions: {},
          client: null,
          Promise,
          Events: null
        };
        return RedisConnection;
      }.call(void 0);
      module.exports = RedisConnection;
    }
  });

  // node_modules/bottleneck/lib/IORedisConnection.js
  var require_IORedisConnection = __commonJS({
    "node_modules/bottleneck/lib/IORedisConnection.js"(exports, module) {
      "use strict";
      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
      function _iterableToArrayLimit(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }
        return _arr;
      }
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
      }
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }
      function _asyncToGenerator(fn) {
        return function() {
          var self2 = this, args = arguments;
          return new Promise(function(resolve, reject) {
            var gen = fn.apply(self2, args);
            function _next(value) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          });
        };
      }
      var Events;
      var IORedisConnection;
      var Scripts;
      var parser;
      parser = require_parser();
      Events = require_Events();
      Scripts = require_Scripts();
      IORedisConnection = function() {
        class IORedisConnection {
          constructor(options = {}) {
            parser.load(options, this.defaults, this);
            if (this.Redis == null) {
              this.Redis = eval("require")("ioredis");
            }
            if (this.Events == null) {
              this.Events = new Events(this);
            }
            this.terminated = false;
            if (this.clusterNodes != null) {
              this.client = new this.Redis.Cluster(this.clusterNodes, this.clientOptions);
              this.subscriber = new this.Redis.Cluster(this.clusterNodes, this.clientOptions);
            } else if (this.client != null && this.client.duplicate == null) {
              this.subscriber = new this.Redis.Cluster(this.client.startupNodes, this.client.options);
            } else {
              if (this.client == null) {
                this.client = new this.Redis(this.clientOptions);
              }
              this.subscriber = this.client.duplicate();
            }
            this.limiters = {};
            this.ready = this.Promise.all([this._setup(this.client, false), this._setup(this.subscriber, true)]).then(() => {
              this._loadScripts();
              return {
                client: this.client,
                subscriber: this.subscriber
              };
            });
          }
          _setup(client, sub) {
            client.setMaxListeners(0);
            return new this.Promise((resolve, reject) => {
              client.on("error", (e) => {
                return this.Events.trigger("error", e);
              });
              if (sub) {
                client.on("message", (channel, message) => {
                  var ref;
                  return (ref = this.limiters[channel]) != null ? ref._store.onMessage(channel, message) : void 0;
                });
              }
              if (client.status === "ready") {
                return resolve();
              } else {
                return client.once("ready", resolve);
              }
            });
          }
          _loadScripts() {
            return Scripts.names.forEach((name) => {
              return this.client.defineCommand(name, {
                lua: Scripts.payload(name)
              });
            });
          }
          __runCommand__(cmd) {
            var _this = this;
            return _asyncToGenerator(function* () {
              var _, deleted;
              yield _this.ready;
              var _ref = yield _this.client.pipeline([cmd]).exec();
              var _ref2 = _slicedToArray(_ref, 1);
              var _ref2$ = _slicedToArray(_ref2[0], 2);
              _ = _ref2$[0];
              deleted = _ref2$[1];
              return deleted;
            })();
          }
          __addLimiter__(instance) {
            return this.Promise.all([instance.channel(), instance.channel_client()].map((channel) => {
              return new this.Promise((resolve, reject) => {
                return this.subscriber.subscribe(channel, () => {
                  this.limiters[channel] = instance;
                  return resolve();
                });
              });
            }));
          }
          __removeLimiter__(instance) {
            var _this2 = this;
            return [instance.channel(), instance.channel_client()].forEach(
              /* @__PURE__ */ function() {
                var _ref3 = _asyncToGenerator(function* (channel) {
                  if (!_this2.terminated) {
                    yield _this2.subscriber.unsubscribe(channel);
                  }
                  return delete _this2.limiters[channel];
                });
                return function(_x) {
                  return _ref3.apply(this, arguments);
                };
              }()
            );
          }
          __scriptArgs__(name, id, args, cb) {
            var keys;
            keys = Scripts.keys(name, id);
            return [keys.length].concat(keys, args, cb);
          }
          __scriptFn__(name) {
            return this.client[name].bind(this.client);
          }
          disconnect(flush = true) {
            var i, k, len, ref;
            ref = Object.keys(this.limiters);
            for (i = 0, len = ref.length; i < len; i++) {
              k = ref[i];
              clearInterval(this.limiters[k]._store.heartbeat);
            }
            this.limiters = {};
            this.terminated = true;
            if (flush) {
              return this.Promise.all([this.client.quit(), this.subscriber.quit()]);
            } else {
              this.client.disconnect();
              this.subscriber.disconnect();
              return this.Promise.resolve();
            }
          }
        }
        ;
        IORedisConnection.prototype.datastore = "ioredis";
        IORedisConnection.prototype.defaults = {
          Redis: null,
          clientOptions: {},
          clusterNodes: null,
          client: null,
          Promise,
          Events: null
        };
        return IORedisConnection;
      }.call(void 0);
      module.exports = IORedisConnection;
    }
  });

  // node_modules/bottleneck/lib/RedisDatastore.js
  var require_RedisDatastore = __commonJS({
    "node_modules/bottleneck/lib/RedisDatastore.js"(exports2, module2) {
      "use strict";
      function _slicedToArray2(arr, i) {
        return _arrayWithHoles2(arr) || _iterableToArrayLimit2(arr, i) || _nonIterableRest2();
      }
      function _nonIterableRest2() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
      function _iterableToArrayLimit2(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }
        return _arr;
      }
      function _arrayWithHoles2(arr) {
        if (Array.isArray(arr)) return arr;
      }
      function asyncGeneratorStep2(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }
      function _asyncToGenerator2(fn) {
        return function() {
          var self2 = this, args = arguments;
          return new Promise(function(resolve, reject) {
            var gen = fn.apply(self2, args);
            function _next(value) {
              asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          });
        };
      }
      var BottleneckError;
      var IORedisConnection2;
      var RedisConnection2;
      var RedisDatastore;
      var parser2;
      parser2 = require_parser();
      BottleneckError = require_BottleneckError();
      RedisConnection2 = require_RedisConnection();
      IORedisConnection2 = require_IORedisConnection();
      RedisDatastore = class RedisDatastore {
        constructor(instance, storeOptions, storeInstanceOptions) {
          this.instance = instance;
          this.storeOptions = storeOptions;
          this.originalId = this.instance.id;
          this.clientId = this.instance._randomIndex();
          parser2.load(storeInstanceOptions, storeInstanceOptions, this);
          this.clients = {};
          this.capacityPriorityCounters = {};
          this.sharedConnection = this.connection != null;
          if (this.connection == null) {
            this.connection = this.instance.datastore === "redis" ? new RedisConnection2({
              Redis: this.Redis,
              clientOptions: this.clientOptions,
              Promise: this.Promise,
              Events: this.instance.Events
            }) : this.instance.datastore === "ioredis" ? new IORedisConnection2({
              Redis: this.Redis,
              clientOptions: this.clientOptions,
              clusterNodes: this.clusterNodes,
              Promise: this.Promise,
              Events: this.instance.Events
            }) : void 0;
          }
          this.instance.connection = this.connection;
          this.instance.datastore = this.connection.datastore;
          this.ready = this.connection.ready.then((clients) => {
            this.clients = clients;
            return this.runScript("init", this.prepareInitSettings(this.clearDatastore));
          }).then(() => {
            return this.connection.__addLimiter__(this.instance);
          }).then(() => {
            return this.runScript("register_client", [this.instance.queued()]);
          }).then(() => {
            var base;
            if (typeof (base = this.heartbeat = setInterval(() => {
              return this.runScript("heartbeat", []).catch((e) => {
                return this.instance.Events.trigger("error", e);
              });
            }, this.heartbeatInterval)).unref === "function") {
              base.unref();
            }
            return this.clients;
          });
        }
        __publish__(message) {
          var _this = this;
          return _asyncToGenerator2(function* () {
            var client;
            var _ref = yield _this.ready;
            client = _ref.client;
            return client.publish(_this.instance.channel(), `message:${message.toString()}`);
          })();
        }
        onMessage(channel, message) {
          var _this2 = this;
          return _asyncToGenerator2(function* () {
            var capacity, counter, data, drained, e, newCapacity, pos, priorityClient, rawCapacity, type;
            try {
              pos = message.indexOf(":");
              var _ref2 = [message.slice(0, pos), message.slice(pos + 1)];
              type = _ref2[0];
              data = _ref2[1];
              if (type === "capacity") {
                return yield _this2.instance._drainAll(data.length > 0 ? ~~data : void 0);
              } else if (type === "capacity-priority") {
                var _data$split = data.split(":");
                var _data$split2 = _slicedToArray2(_data$split, 3);
                rawCapacity = _data$split2[0];
                priorityClient = _data$split2[1];
                counter = _data$split2[2];
                capacity = rawCapacity.length > 0 ? ~~rawCapacity : void 0;
                if (priorityClient === _this2.clientId) {
                  drained = yield _this2.instance._drainAll(capacity);
                  newCapacity = capacity != null ? capacity - (drained || 0) : "";
                  return yield _this2.clients.client.publish(_this2.instance.channel(), `capacity-priority:${newCapacity}::${counter}`);
                } else if (priorityClient === "") {
                  clearTimeout(_this2.capacityPriorityCounters[counter]);
                  delete _this2.capacityPriorityCounters[counter];
                  return _this2.instance._drainAll(capacity);
                } else {
                  return _this2.capacityPriorityCounters[counter] = setTimeout(
                    /* @__PURE__ */ _asyncToGenerator2(function* () {
                      var e2;
                      try {
                        delete _this2.capacityPriorityCounters[counter];
                        yield _this2.runScript("blacklist_client", [priorityClient]);
                        return yield _this2.instance._drainAll(capacity);
                      } catch (error) {
                        e2 = error;
                        return _this2.instance.Events.trigger("error", e2);
                      }
                    }),
                    1e3
                  );
                }
              } else if (type === "message") {
                return _this2.instance.Events.trigger("message", data);
              } else if (type === "blocked") {
                return yield _this2.instance._dropAllQueued();
              }
            } catch (error) {
              e = error;
              return _this2.instance.Events.trigger("error", e);
            }
          })();
        }
        __disconnect__(flush) {
          clearInterval(this.heartbeat);
          if (this.sharedConnection) {
            return this.connection.__removeLimiter__(this.instance);
          } else {
            return this.connection.disconnect(flush);
          }
        }
        runScript(name, args) {
          var _this3 = this;
          return _asyncToGenerator2(function* () {
            if (!(name === "init" || name === "register_client")) {
              yield _this3.ready;
            }
            return new _this3.Promise((resolve, reject) => {
              var all_args, arr;
              all_args = [Date.now(), _this3.clientId].concat(args);
              _this3.instance.Events.trigger("debug", `Calling Redis script: ${name}.lua`, all_args);
              arr = _this3.connection.__scriptArgs__(name, _this3.originalId, all_args, function(err, replies) {
                if (err != null) {
                  return reject(err);
                }
                return resolve(replies);
              });
              return _this3.connection.__scriptFn__(name)(...arr);
            }).catch((e) => {
              if (e.message === "SETTINGS_KEY_NOT_FOUND") {
                if (name === "heartbeat") {
                  return _this3.Promise.resolve();
                } else {
                  return _this3.runScript("init", _this3.prepareInitSettings(false)).then(() => {
                    return _this3.runScript(name, args);
                  });
                }
              } else if (e.message === "UNKNOWN_CLIENT") {
                return _this3.runScript("register_client", [_this3.instance.queued()]).then(() => {
                  return _this3.runScript(name, args);
                });
              } else {
                return _this3.Promise.reject(e);
              }
            });
          })();
        }
        prepareArray(arr) {
          var i, len, results, x;
          results = [];
          for (i = 0, len = arr.length; i < len; i++) {
            x = arr[i];
            results.push(x != null ? x.toString() : "");
          }
          return results;
        }
        prepareObject(obj) {
          var arr, k, v;
          arr = [];
          for (k in obj) {
            v = obj[k];
            arr.push(k, v != null ? v.toString() : "");
          }
          return arr;
        }
        prepareInitSettings(clear) {
          var args;
          args = this.prepareObject(Object.assign({}, this.storeOptions, {
            id: this.originalId,
            version: this.instance.version,
            groupTimeout: this.timeout,
            clientTimeout: this.clientTimeout
          }));
          args.unshift(clear ? 1 : 0, this.instance.version);
          return args;
        }
        convertBool(b) {
          return !!b;
        }
        __updateSettings__(options2) {
          var _this4 = this;
          return _asyncToGenerator2(function* () {
            yield _this4.runScript("update_settings", _this4.prepareObject(options2));
            return parser2.overwrite(options2, options2, _this4.storeOptions);
          })();
        }
        __running__() {
          return this.runScript("running", []);
        }
        __queued__() {
          return this.runScript("queued", []);
        }
        __done__() {
          return this.runScript("done", []);
        }
        __groupCheck__() {
          var _this5 = this;
          return _asyncToGenerator2(function* () {
            return _this5.convertBool(yield _this5.runScript("group_check", []));
          })();
        }
        __incrementReservoir__(incr) {
          return this.runScript("increment_reservoir", [incr]);
        }
        __currentReservoir__() {
          return this.runScript("current_reservoir", []);
        }
        __check__(weight) {
          var _this6 = this;
          return _asyncToGenerator2(function* () {
            return _this6.convertBool(yield _this6.runScript("check", _this6.prepareArray([weight])));
          })();
        }
        __register__(index, weight, expiration) {
          var _this7 = this;
          return _asyncToGenerator2(function* () {
            var reservoir, success, wait;
            var _ref4 = yield _this7.runScript("register", _this7.prepareArray([index, weight, expiration]));
            var _ref5 = _slicedToArray2(_ref4, 3);
            success = _ref5[0];
            wait = _ref5[1];
            reservoir = _ref5[2];
            return {
              success: _this7.convertBool(success),
              wait,
              reservoir
            };
          })();
        }
        __submit__(queueLength, weight) {
          var _this8 = this;
          return _asyncToGenerator2(function* () {
            var blocked, e, maxConcurrent, overweight, reachedHWM, strategy;
            try {
              var _ref6 = yield _this8.runScript("submit", _this8.prepareArray([queueLength, weight]));
              var _ref7 = _slicedToArray2(_ref6, 3);
              reachedHWM = _ref7[0];
              blocked = _ref7[1];
              strategy = _ref7[2];
              return {
                reachedHWM: _this8.convertBool(reachedHWM),
                blocked: _this8.convertBool(blocked),
                strategy
              };
            } catch (error) {
              e = error;
              if (e.message.indexOf("OVERWEIGHT") === 0) {
                var _e$message$split = e.message.split(":");
                var _e$message$split2 = _slicedToArray2(_e$message$split, 3);
                overweight = _e$message$split2[0];
                weight = _e$message$split2[1];
                maxConcurrent = _e$message$split2[2];
                throw new BottleneckError(`Impossible to add a job having a weight of ${weight} to a limiter having a maxConcurrent setting of ${maxConcurrent}`);
              } else {
                throw e;
              }
            }
          })();
        }
        __free__(index, weight) {
          var _this9 = this;
          return _asyncToGenerator2(function* () {
            var running;
            running = yield _this9.runScript("free", _this9.prepareArray([index]));
            return {
              running
            };
          })();
        }
      };
      module2.exports = RedisDatastore;
    }
  });

  // node_modules/bottleneck/lib/States.js
  var require_States = __commonJS({
    "node_modules/bottleneck/lib/States.js"(exports2, module2) {
      "use strict";
      var BottleneckError;
      var States;
      BottleneckError = require_BottleneckError();
      States = class States {
        constructor(status1) {
          this.status = status1;
          this._jobs = {};
          this.counts = this.status.map(function() {
            return 0;
          });
        }
        next(id) {
          var current, next;
          current = this._jobs[id];
          next = current + 1;
          if (current != null && next < this.status.length) {
            this.counts[current]--;
            this.counts[next]++;
            return this._jobs[id]++;
          } else if (current != null) {
            this.counts[current]--;
            return delete this._jobs[id];
          }
        }
        start(id) {
          var initial;
          initial = 0;
          this._jobs[id] = initial;
          return this.counts[initial]++;
        }
        remove(id) {
          var current;
          current = this._jobs[id];
          if (current != null) {
            this.counts[current]--;
            delete this._jobs[id];
          }
          return current != null;
        }
        jobStatus(id) {
          var ref;
          return (ref = this.status[this._jobs[id]]) != null ? ref : null;
        }
        statusJobs(status) {
          var k, pos, ref, results, v;
          if (status != null) {
            pos = this.status.indexOf(status);
            if (pos < 0) {
              throw new BottleneckError(`status must be one of ${this.status.join(", ")}`);
            }
            ref = this._jobs;
            results = [];
            for (k in ref) {
              v = ref[k];
              if (v === pos) {
                results.push(k);
              }
            }
            return results;
          } else {
            return Object.keys(this._jobs);
          }
        }
        statusCounts() {
          return this.counts.reduce((acc, v, i) => {
            acc[this.status[i]] = v;
            return acc;
          }, {});
        }
      };
      module2.exports = States;
    }
  });

  // node_modules/bottleneck/lib/Sync.js
  var require_Sync = __commonJS({
    "node_modules/bottleneck/lib/Sync.js"(exports2, module2) {
      "use strict";
      function asyncGeneratorStep2(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }
      function _asyncToGenerator2(fn) {
        return function() {
          var self2 = this, args = arguments;
          return new Promise(function(resolve, reject) {
            var gen = fn.apply(self2, args);
            function _next(value) {
              asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          });
        };
      }
      var DLList;
      var Sync;
      DLList = require_DLList();
      Sync = class Sync {
        constructor(name, Promise2) {
          this.schedule = this.schedule.bind(this);
          this.name = name;
          this.Promise = Promise2;
          this._running = 0;
          this._queue = new DLList();
        }
        isEmpty() {
          return this._queue.length === 0;
        }
        _tryToRun() {
          var _this = this;
          return _asyncToGenerator2(function* () {
            var args, cb, error, reject, resolve, returned, task;
            if (_this._running < 1 && _this._queue.length > 0) {
              _this._running++;
              var _this$_queue$shift = _this._queue.shift();
              task = _this$_queue$shift.task;
              args = _this$_queue$shift.args;
              resolve = _this$_queue$shift.resolve;
              reject = _this$_queue$shift.reject;
              cb = yield _asyncToGenerator2(function* () {
                try {
                  returned = yield task(...args);
                  return function() {
                    return resolve(returned);
                  };
                } catch (error1) {
                  error = error1;
                  return function() {
                    return reject(error);
                  };
                }
              })();
              _this._running--;
              _this._tryToRun();
              return cb();
            }
          })();
        }
        schedule(task, ...args) {
          var promise, reject, resolve;
          resolve = reject = null;
          promise = new this.Promise(function(_resolve, _reject) {
            resolve = _resolve;
            return reject = _reject;
          });
          this._queue.push({
            task,
            args,
            resolve,
            reject
          });
          this._tryToRun();
          return promise;
        }
      };
      module2.exports = Sync;
    }
  });

  // node_modules/bottleneck/lib/version.json
  var require_version = __commonJS({
    "node_modules/bottleneck/lib/version.json"(exports2, module2) {
      module2.exports = { version: "2.19.5" };
    }
  });

  // node_modules/bottleneck/lib/Group.js
  var require_Group = __commonJS({
    "node_modules/bottleneck/lib/Group.js"(exports2, module2) {
      "use strict";
      function _slicedToArray2(arr, i) {
        return _arrayWithHoles2(arr) || _iterableToArrayLimit2(arr, i) || _nonIterableRest2();
      }
      function _nonIterableRest2() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
      function _iterableToArrayLimit2(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }
        return _arr;
      }
      function _arrayWithHoles2(arr) {
        if (Array.isArray(arr)) return arr;
      }
      function asyncGeneratorStep2(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }
      function _asyncToGenerator2(fn) {
        return function() {
          var self2 = this, args = arguments;
          return new Promise(function(resolve, reject) {
            var gen = fn.apply(self2, args);
            function _next(value) {
              asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          });
        };
      }
      var Events2;
      var Group;
      var IORedisConnection2;
      var RedisConnection2;
      var Scripts2;
      var parser2;
      parser2 = require_parser();
      Events2 = require_Events();
      RedisConnection2 = require_RedisConnection();
      IORedisConnection2 = require_IORedisConnection();
      Scripts2 = require_Scripts();
      Group = function() {
        class Group2 {
          constructor(limiterOptions = {}) {
            this.deleteKey = this.deleteKey.bind(this);
            this.limiterOptions = limiterOptions;
            parser2.load(this.limiterOptions, this.defaults, this);
            this.Events = new Events2(this);
            this.instances = {};
            this.Bottleneck = require_Bottleneck();
            this._startAutoCleanup();
            this.sharedConnection = this.connection != null;
            if (this.connection == null) {
              if (this.limiterOptions.datastore === "redis") {
                this.connection = new RedisConnection2(Object.assign({}, this.limiterOptions, {
                  Events: this.Events
                }));
              } else if (this.limiterOptions.datastore === "ioredis") {
                this.connection = new IORedisConnection2(Object.assign({}, this.limiterOptions, {
                  Events: this.Events
                }));
              }
            }
          }
          key(key = "") {
            var ref;
            return (ref = this.instances[key]) != null ? ref : (() => {
              var limiter;
              limiter = this.instances[key] = new this.Bottleneck(Object.assign(this.limiterOptions, {
                id: `${this.id}-${key}`,
                timeout: this.timeout,
                connection: this.connection
              }));
              this.Events.trigger("created", limiter, key);
              return limiter;
            })();
          }
          deleteKey(key = "") {
            var _this = this;
            return _asyncToGenerator2(function* () {
              var deleted, instance;
              instance = _this.instances[key];
              if (_this.connection) {
                deleted = yield _this.connection.__runCommand__(["del", ...Scripts2.allKeys(`${_this.id}-${key}`)]);
              }
              if (instance != null) {
                delete _this.instances[key];
                yield instance.disconnect();
              }
              return instance != null || deleted > 0;
            })();
          }
          limiters() {
            var k, ref, results, v;
            ref = this.instances;
            results = [];
            for (k in ref) {
              v = ref[k];
              results.push({
                key: k,
                limiter: v
              });
            }
            return results;
          }
          keys() {
            return Object.keys(this.instances);
          }
          clusterKeys() {
            var _this2 = this;
            return _asyncToGenerator2(function* () {
              var cursor, end, found, i, k, keys, len, next, start;
              if (_this2.connection == null) {
                return _this2.Promise.resolve(_this2.keys());
              }
              keys = [];
              cursor = null;
              start = `b_${_this2.id}-`.length;
              end = "_settings".length;
              while (cursor !== 0) {
                var _ref = yield _this2.connection.__runCommand__(["scan", cursor != null ? cursor : 0, "match", `b_${_this2.id}-*_settings`, "count", 1e4]);
                var _ref2 = _slicedToArray2(_ref, 2);
                next = _ref2[0];
                found = _ref2[1];
                cursor = ~~next;
                for (i = 0, len = found.length; i < len; i++) {
                  k = found[i];
                  keys.push(k.slice(start, -end));
                }
              }
              return keys;
            })();
          }
          _startAutoCleanup() {
            var _this3 = this;
            var base;
            clearInterval(this.interval);
            return typeof (base = this.interval = setInterval(
              /* @__PURE__ */ _asyncToGenerator2(function* () {
                var e, k, ref, results, time, v;
                time = Date.now();
                ref = _this3.instances;
                results = [];
                for (k in ref) {
                  v = ref[k];
                  try {
                    if (yield v._store.__groupCheck__(time)) {
                      results.push(_this3.deleteKey(k));
                    } else {
                      results.push(void 0);
                    }
                  } catch (error) {
                    e = error;
                    results.push(v.Events.trigger("error", e));
                  }
                }
                return results;
              }),
              this.timeout / 2
            )).unref === "function" ? base.unref() : void 0;
          }
          updateSettings(options2 = {}) {
            parser2.overwrite(options2, this.defaults, this);
            parser2.overwrite(options2, options2, this.limiterOptions);
            if (options2.timeout != null) {
              return this._startAutoCleanup();
            }
          }
          disconnect(flush = true) {
            var ref;
            if (!this.sharedConnection) {
              return (ref = this.connection) != null ? ref.disconnect(flush) : void 0;
            }
          }
        }
        ;
        Group2.prototype.defaults = {
          timeout: 1e3 * 60 * 5,
          connection: null,
          Promise,
          id: "group-key"
        };
        return Group2;
      }.call(void 0);
      module2.exports = Group;
    }
  });

  // node_modules/bottleneck/lib/Batcher.js
  var require_Batcher = __commonJS({
    "node_modules/bottleneck/lib/Batcher.js"(exports2, module2) {
      "use strict";
      var Batcher;
      var Events2;
      var parser2;
      parser2 = require_parser();
      Events2 = require_Events();
      Batcher = function() {
        class Batcher2 {
          constructor(options2 = {}) {
            this.options = options2;
            parser2.load(this.options, this.defaults, this);
            this.Events = new Events2(this);
            this._arr = [];
            this._resetPromise();
            this._lastFlush = Date.now();
          }
          _resetPromise() {
            return this._promise = new this.Promise((res, rej) => {
              return this._resolve = res;
            });
          }
          _flush() {
            clearTimeout(this._timeout);
            this._lastFlush = Date.now();
            this._resolve();
            this.Events.trigger("batch", this._arr);
            this._arr = [];
            return this._resetPromise();
          }
          add(data) {
            var ret;
            this._arr.push(data);
            ret = this._promise;
            if (this._arr.length === this.maxSize) {
              this._flush();
            } else if (this.maxTime != null && this._arr.length === 1) {
              this._timeout = setTimeout(() => {
                return this._flush();
              }, this.maxTime);
            }
            return ret;
          }
        }
        ;
        Batcher2.prototype.defaults = {
          maxTime: null,
          maxSize: null,
          Promise
        };
        return Batcher2;
      }.call(void 0);
      module2.exports = Batcher;
    }
  });

  // node_modules/bottleneck/lib/Bottleneck.js
  var require_Bottleneck = __commonJS({
    "node_modules/bottleneck/lib/Bottleneck.js"(exports2, module2) {
      "use strict";
      function _slicedToArray2(arr, i) {
        return _arrayWithHoles2(arr) || _iterableToArrayLimit2(arr, i) || _nonIterableRest2();
      }
      function _iterableToArrayLimit2(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }
        return _arr;
      }
      function _toArray(arr) {
        return _arrayWithHoles2(arr) || _iterableToArray(arr) || _nonIterableRest2();
      }
      function _nonIterableRest2() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
      function _iterableToArray(iter) {
        if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
      }
      function _arrayWithHoles2(arr) {
        if (Array.isArray(arr)) return arr;
      }
      function asyncGeneratorStep2(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }
      function _asyncToGenerator2(fn) {
        return function() {
          var self2 = this, args = arguments;
          return new Promise(function(resolve, reject) {
            var gen = fn.apply(self2, args);
            function _next(value) {
              asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          });
        };
      }
      var Bottleneck;
      var DEFAULT_PRIORITY;
      var Events2;
      var Job;
      var LocalDatastore;
      var NUM_PRIORITIES;
      var Queues;
      var RedisDatastore;
      var States;
      var Sync;
      var parser2;
      var splice = [].splice;
      NUM_PRIORITIES = 10;
      DEFAULT_PRIORITY = 5;
      parser2 = require_parser();
      Queues = require_Queues();
      Job = require_Job();
      LocalDatastore = require_LocalDatastore();
      RedisDatastore = require_RedisDatastore();
      Events2 = require_Events();
      States = require_States();
      Sync = require_Sync();
      Bottleneck = function() {
        class Bottleneck2 {
          constructor(options2 = {}, ...invalid) {
            var storeInstanceOptions, storeOptions;
            this._addToQueue = this._addToQueue.bind(this);
            this._validateOptions(options2, invalid);
            parser2.load(options2, this.instanceDefaults, this);
            this._queues = new Queues(NUM_PRIORITIES);
            this._scheduled = {};
            this._states = new States(["RECEIVED", "QUEUED", "RUNNING", "EXECUTING"].concat(this.trackDoneStatus ? ["DONE"] : []));
            this._limiter = null;
            this.Events = new Events2(this);
            this._submitLock = new Sync("submit", this.Promise);
            this._registerLock = new Sync("register", this.Promise);
            storeOptions = parser2.load(options2, this.storeDefaults, {});
            this._store = function() {
              if (this.datastore === "redis" || this.datastore === "ioredis" || this.connection != null) {
                storeInstanceOptions = parser2.load(options2, this.redisStoreDefaults, {});
                return new RedisDatastore(this, storeOptions, storeInstanceOptions);
              } else if (this.datastore === "local") {
                storeInstanceOptions = parser2.load(options2, this.localStoreDefaults, {});
                return new LocalDatastore(this, storeOptions, storeInstanceOptions);
              } else {
                throw new Bottleneck2.prototype.BottleneckError(`Invalid datastore type: ${this.datastore}`);
              }
            }.call(this);
            this._queues.on("leftzero", () => {
              var ref;
              return (ref = this._store.heartbeat) != null ? typeof ref.ref === "function" ? ref.ref() : void 0 : void 0;
            });
            this._queues.on("zero", () => {
              var ref;
              return (ref = this._store.heartbeat) != null ? typeof ref.unref === "function" ? ref.unref() : void 0 : void 0;
            });
          }
          _validateOptions(options2, invalid) {
            if (!(options2 != null && typeof options2 === "object" && invalid.length === 0)) {
              throw new Bottleneck2.prototype.BottleneckError("Bottleneck v2 takes a single object argument. Refer to https://github.com/SGrondin/bottleneck#upgrading-to-v2 if you're upgrading from Bottleneck v1.");
            }
          }
          ready() {
            return this._store.ready;
          }
          clients() {
            return this._store.clients;
          }
          channel() {
            return `b_${this.id}`;
          }
          channel_client() {
            return `b_${this.id}_${this._store.clientId}`;
          }
          publish(message) {
            return this._store.__publish__(message);
          }
          disconnect(flush = true) {
            return this._store.__disconnect__(flush);
          }
          chain(_limiter) {
            this._limiter = _limiter;
            return this;
          }
          queued(priority) {
            return this._queues.queued(priority);
          }
          clusterQueued() {
            return this._store.__queued__();
          }
          empty() {
            return this.queued() === 0 && this._submitLock.isEmpty();
          }
          running() {
            return this._store.__running__();
          }
          done() {
            return this._store.__done__();
          }
          jobStatus(id) {
            return this._states.jobStatus(id);
          }
          jobs(status) {
            return this._states.statusJobs(status);
          }
          counts() {
            return this._states.statusCounts();
          }
          _randomIndex() {
            return Math.random().toString(36).slice(2);
          }
          check(weight = 1) {
            return this._store.__check__(weight);
          }
          _clearGlobalState(index) {
            if (this._scheduled[index] != null) {
              clearTimeout(this._scheduled[index].expiration);
              delete this._scheduled[index];
              return true;
            } else {
              return false;
            }
          }
          _free(index, job, options2, eventInfo) {
            var _this = this;
            return _asyncToGenerator2(function* () {
              var e, running;
              try {
                var _ref = yield _this._store.__free__(index, options2.weight);
                running = _ref.running;
                _this.Events.trigger("debug", `Freed ${options2.id}`, eventInfo);
                if (running === 0 && _this.empty()) {
                  return _this.Events.trigger("idle");
                }
              } catch (error1) {
                e = error1;
                return _this.Events.trigger("error", e);
              }
            })();
          }
          _run(index, job, wait) {
            var clearGlobalState, free, run;
            job.doRun();
            clearGlobalState = this._clearGlobalState.bind(this, index);
            run = this._run.bind(this, index, job);
            free = this._free.bind(this, index, job);
            return this._scheduled[index] = {
              timeout: setTimeout(() => {
                return job.doExecute(this._limiter, clearGlobalState, run, free);
              }, wait),
              expiration: job.options.expiration != null ? setTimeout(function() {
                return job.doExpire(clearGlobalState, run, free);
              }, wait + job.options.expiration) : void 0,
              job
            };
          }
          _drainOne(capacity) {
            return this._registerLock.schedule(() => {
              var args, index, next, options2, queue;
              if (this.queued() === 0) {
                return this.Promise.resolve(null);
              }
              queue = this._queues.getFirst();
              var _next2 = next = queue.first();
              options2 = _next2.options;
              args = _next2.args;
              if (capacity != null && options2.weight > capacity) {
                return this.Promise.resolve(null);
              }
              this.Events.trigger("debug", `Draining ${options2.id}`, {
                args,
                options: options2
              });
              index = this._randomIndex();
              return this._store.__register__(index, options2.weight, options2.expiration).then(({
                success,
                wait,
                reservoir
              }) => {
                var empty;
                this.Events.trigger("debug", `Drained ${options2.id}`, {
                  success,
                  args,
                  options: options2
                });
                if (success) {
                  queue.shift();
                  empty = this.empty();
                  if (empty) {
                    this.Events.trigger("empty");
                  }
                  if (reservoir === 0) {
                    this.Events.trigger("depleted", empty);
                  }
                  this._run(index, next, wait);
                  return this.Promise.resolve(options2.weight);
                } else {
                  return this.Promise.resolve(null);
                }
              });
            });
          }
          _drainAll(capacity, total = 0) {
            return this._drainOne(capacity).then((drained) => {
              var newCapacity;
              if (drained != null) {
                newCapacity = capacity != null ? capacity - drained : capacity;
                return this._drainAll(newCapacity, total + drained);
              } else {
                return this.Promise.resolve(total);
              }
            }).catch((e) => {
              return this.Events.trigger("error", e);
            });
          }
          _dropAllQueued(message) {
            return this._queues.shiftAll(function(job) {
              return job.doDrop({
                message
              });
            });
          }
          stop(options2 = {}) {
            var done, waitForExecuting;
            options2 = parser2.load(options2, this.stopDefaults);
            waitForExecuting = (at) => {
              var finished;
              finished = () => {
                var counts;
                counts = this._states.counts;
                return counts[0] + counts[1] + counts[2] + counts[3] === at;
              };
              return new this.Promise((resolve, reject) => {
                if (finished()) {
                  return resolve();
                } else {
                  return this.on("done", () => {
                    if (finished()) {
                      this.removeAllListeners("done");
                      return resolve();
                    }
                  });
                }
              });
            };
            done = options2.dropWaitingJobs ? (this._run = function(index, next) {
              return next.doDrop({
                message: options2.dropErrorMessage
              });
            }, this._drainOne = () => {
              return this.Promise.resolve(null);
            }, this._registerLock.schedule(() => {
              return this._submitLock.schedule(() => {
                var k, ref, v;
                ref = this._scheduled;
                for (k in ref) {
                  v = ref[k];
                  if (this.jobStatus(v.job.options.id) === "RUNNING") {
                    clearTimeout(v.timeout);
                    clearTimeout(v.expiration);
                    v.job.doDrop({
                      message: options2.dropErrorMessage
                    });
                  }
                }
                this._dropAllQueued(options2.dropErrorMessage);
                return waitForExecuting(0);
              });
            })) : this.schedule({
              priority: NUM_PRIORITIES - 1,
              weight: 0
            }, () => {
              return waitForExecuting(1);
            });
            this._receive = function(job) {
              return job._reject(new Bottleneck2.prototype.BottleneckError(options2.enqueueErrorMessage));
            };
            this.stop = () => {
              return this.Promise.reject(new Bottleneck2.prototype.BottleneckError("stop() has already been called"));
            };
            return done;
          }
          _addToQueue(job) {
            var _this2 = this;
            return _asyncToGenerator2(function* () {
              var args, blocked, error, options2, reachedHWM, shifted, strategy;
              args = job.args;
              options2 = job.options;
              try {
                var _ref2 = yield _this2._store.__submit__(_this2.queued(), options2.weight);
                reachedHWM = _ref2.reachedHWM;
                blocked = _ref2.blocked;
                strategy = _ref2.strategy;
              } catch (error1) {
                error = error1;
                _this2.Events.trigger("debug", `Could not queue ${options2.id}`, {
                  args,
                  options: options2,
                  error
                });
                job.doDrop({
                  error
                });
                return false;
              }
              if (blocked) {
                job.doDrop();
                return true;
              } else if (reachedHWM) {
                shifted = strategy === Bottleneck2.prototype.strategy.LEAK ? _this2._queues.shiftLastFrom(options2.priority) : strategy === Bottleneck2.prototype.strategy.OVERFLOW_PRIORITY ? _this2._queues.shiftLastFrom(options2.priority + 1) : strategy === Bottleneck2.prototype.strategy.OVERFLOW ? job : void 0;
                if (shifted != null) {
                  shifted.doDrop();
                }
                if (shifted == null || strategy === Bottleneck2.prototype.strategy.OVERFLOW) {
                  if (shifted == null) {
                    job.doDrop();
                  }
                  return reachedHWM;
                }
              }
              job.doQueue(reachedHWM, blocked);
              _this2._queues.push(job);
              yield _this2._drainAll();
              return reachedHWM;
            })();
          }
          _receive(job) {
            if (this._states.jobStatus(job.options.id) != null) {
              job._reject(new Bottleneck2.prototype.BottleneckError(`A job with the same id already exists (id=${job.options.id})`));
              return false;
            } else {
              job.doReceive();
              return this._submitLock.schedule(this._addToQueue, job);
            }
          }
          submit(...args) {
            var cb, fn, job, options2, ref, ref1, task;
            if (typeof args[0] === "function") {
              var _ref3, _ref4, _splice$call, _splice$call2;
              ref = args, _ref3 = ref, _ref4 = _toArray(_ref3), fn = _ref4[0], args = _ref4.slice(1), _ref3, _splice$call = splice.call(args, -1), _splice$call2 = _slicedToArray2(_splice$call, 1), cb = _splice$call2[0], _splice$call;
              options2 = parser2.load({}, this.jobDefaults);
            } else {
              var _ref5, _ref6, _splice$call3, _splice$call4;
              ref1 = args, _ref5 = ref1, _ref6 = _toArray(_ref5), options2 = _ref6[0], fn = _ref6[1], args = _ref6.slice(2), _ref5, _splice$call3 = splice.call(args, -1), _splice$call4 = _slicedToArray2(_splice$call3, 1), cb = _splice$call4[0], _splice$call3;
              options2 = parser2.load(options2, this.jobDefaults);
            }
            task = (...args2) => {
              return new this.Promise(function(resolve, reject) {
                return fn(...args2, function(...args3) {
                  return (args3[0] != null ? reject : resolve)(args3);
                });
              });
            };
            job = new Job(task, args, options2, this.jobDefaults, this.rejectOnDrop, this.Events, this._states, this.Promise);
            job.promise.then(function(args2) {
              return typeof cb === "function" ? cb(...args2) : void 0;
            }).catch(function(args2) {
              if (Array.isArray(args2)) {
                return typeof cb === "function" ? cb(...args2) : void 0;
              } else {
                return typeof cb === "function" ? cb(args2) : void 0;
              }
            });
            return this._receive(job);
          }
          schedule(...args) {
            var job, options2, task;
            if (typeof args[0] === "function") {
              var _args = args;
              var _args2 = _toArray(_args);
              task = _args2[0];
              args = _args2.slice(1);
              options2 = {};
            } else {
              var _args3 = args;
              var _args4 = _toArray(_args3);
              options2 = _args4[0];
              task = _args4[1];
              args = _args4.slice(2);
            }
            job = new Job(task, args, options2, this.jobDefaults, this.rejectOnDrop, this.Events, this._states, this.Promise);
            this._receive(job);
            return job.promise;
          }
          wrap(fn) {
            var schedule, wrapped;
            schedule = this.schedule.bind(this);
            wrapped = function wrapped2(...args) {
              return schedule(fn.bind(this), ...args);
            };
            wrapped.withOptions = function(options2, ...args) {
              return schedule(options2, fn, ...args);
            };
            return wrapped;
          }
          updateSettings(options2 = {}) {
            var _this3 = this;
            return _asyncToGenerator2(function* () {
              yield _this3._store.__updateSettings__(parser2.overwrite(options2, _this3.storeDefaults));
              parser2.overwrite(options2, _this3.instanceDefaults, _this3);
              return _this3;
            })();
          }
          currentReservoir() {
            return this._store.__currentReservoir__();
          }
          incrementReservoir(incr = 0) {
            return this._store.__incrementReservoir__(incr);
          }
        }
        ;
        Bottleneck2.default = Bottleneck2;
        Bottleneck2.Events = Events2;
        Bottleneck2.version = Bottleneck2.prototype.version = require_version().version;
        Bottleneck2.strategy = Bottleneck2.prototype.strategy = {
          LEAK: 1,
          OVERFLOW: 2,
          OVERFLOW_PRIORITY: 4,
          BLOCK: 3
        };
        Bottleneck2.BottleneckError = Bottleneck2.prototype.BottleneckError = require_BottleneckError();
        Bottleneck2.Group = Bottleneck2.prototype.Group = require_Group();
        Bottleneck2.RedisConnection = Bottleneck2.prototype.RedisConnection = require_RedisConnection();
        Bottleneck2.IORedisConnection = Bottleneck2.prototype.IORedisConnection = require_IORedisConnection();
        Bottleneck2.Batcher = Bottleneck2.prototype.Batcher = require_Batcher();
        Bottleneck2.prototype.jobDefaults = {
          priority: DEFAULT_PRIORITY,
          weight: 1,
          expiration: null,
          id: "<no-id>"
        };
        Bottleneck2.prototype.storeDefaults = {
          maxConcurrent: null,
          minTime: 0,
          highWater: null,
          strategy: Bottleneck2.prototype.strategy.LEAK,
          penalty: null,
          reservoir: null,
          reservoirRefreshInterval: null,
          reservoirRefreshAmount: null,
          reservoirIncreaseInterval: null,
          reservoirIncreaseAmount: null,
          reservoirIncreaseMaximum: null
        };
        Bottleneck2.prototype.localStoreDefaults = {
          Promise,
          timeout: null,
          heartbeatInterval: 250
        };
        Bottleneck2.prototype.redisStoreDefaults = {
          Promise,
          timeout: null,
          heartbeatInterval: 5e3,
          clientTimeout: 1e4,
          Redis: null,
          clientOptions: {},
          clusterNodes: null,
          clearDatastore: false,
          connection: null
        };
        Bottleneck2.prototype.instanceDefaults = {
          datastore: "local",
          connection: null,
          id: "<no-id>",
          rejectOnDrop: true,
          trackDoneStatus: false,
          Promise
        };
        Bottleneck2.prototype.stopDefaults = {
          enqueueErrorMessage: "This limiter has been stopped and cannot accept new jobs.",
          dropWaitingJobs: true,
          dropErrorMessage: "This limiter has been stopped."
        };
        return Bottleneck2;
      }.call(void 0);
      module2.exports = Bottleneck;
    }
  });

  // node_modules/bottleneck/lib/index.js
  var require_lib = __commonJS({
    "node_modules/bottleneck/lib/index.js"(exports2, module2) {
      "use strict";
      module2.exports = require_Bottleneck();
    }
  });

  // node_modules/@nevuamarkets/poly-websockets/dist/types/PolymarketWebSocket.js
  var require_PolymarketWebSocket = __commonJS({
    "node_modules/@nevuamarkets/poly-websockets/dist/types/PolymarketWebSocket.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.isBookEvent = isBookEvent;
      exports2.isLastTradePriceEvent = isLastTradePriceEvent;
      exports2.isPriceChangeEvent = isPriceChangeEvent;
      exports2.isTickSizeChangeEvent = isTickSizeChangeEvent;
      function isBookEvent(event) {
        return (event === null || event === void 0 ? void 0 : event.event_type) === "book";
      }
      function isLastTradePriceEvent(event) {
        return (event === null || event === void 0 ? void 0 : event.event_type) === "last_trade_price";
      }
      function isPriceChangeEvent(event) {
        return (event === null || event === void 0 ? void 0 : event.event_type) === "price_change";
      }
      function isTickSizeChangeEvent(event) {
        return (event === null || event === void 0 ? void 0 : event.event_type) === "tick_size_change";
      }
    }
  });

  // node_modules/tslib/tslib.es6.mjs
  var tslib_es6_exports = {};
  __export(tslib_es6_exports, {
    __addDisposableResource: () => __addDisposableResource,
    __assign: () => __assign,
    __asyncDelegator: () => __asyncDelegator,
    __asyncGenerator: () => __asyncGenerator,
    __asyncValues: () => __asyncValues,
    __await: () => __await,
    __awaiter: () => __awaiter,
    __classPrivateFieldGet: () => __classPrivateFieldGet,
    __classPrivateFieldIn: () => __classPrivateFieldIn,
    __classPrivateFieldSet: () => __classPrivateFieldSet,
    __createBinding: () => __createBinding,
    __decorate: () => __decorate,
    __disposeResources: () => __disposeResources,
    __esDecorate: () => __esDecorate,
    __exportStar: () => __exportStar,
    __extends: () => __extends,
    __generator: () => __generator,
    __importDefault: () => __importDefault,
    __importStar: () => __importStar,
    __makeTemplateObject: () => __makeTemplateObject,
    __metadata: () => __metadata,
    __param: () => __param,
    __propKey: () => __propKey,
    __read: () => __read,
    __rest: () => __rest,
    __rewriteRelativeImportExtension: () => __rewriteRelativeImportExtension,
    __runInitializers: () => __runInitializers,
    __setFunctionName: () => __setFunctionName,
    __spread: () => __spread,
    __spreadArray: () => __spreadArray,
    __spreadArrays: () => __spreadArrays,
    __values: () => __values,
    default: () => tslib_es6_default
  });
  function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  }
  function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  }
  function __param(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  }
  function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
      if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
      return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function(f) {
        if (done) throw new TypeError("Cannot add initializers after decoration has completed");
        extraInitializers.push(accept(f || null));
      };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
        if (result === void 0) continue;
        if (result === null || typeof result !== "object") throw new TypeError("Object expected");
        if (_ = accept(result.get)) descriptor.get = _;
        if (_ = accept(result.set)) descriptor.set = _;
        if (_ = accept(result.init)) initializers.unshift(_);
      } else if (_ = accept(result)) {
        if (kind === "field") initializers.unshift(_);
        else descriptor[key] = _;
      }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
  }
  function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
  }
  function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
  }
  function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
  }
  function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
  }
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
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
  }
  function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1) throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
  }
  function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function() {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  }
  function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
    return ar;
  }
  function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  }
  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  }
  function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  }
  function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
      return this;
    }, i;
    function awaitReturn(f) {
      return function(v) {
        return Promise.resolve(v).then(f, reject);
      };
    }
    function verb(n, f) {
      if (g[n]) {
        i[n] = function(v) {
          return new Promise(function(a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
        if (f) i[n] = f(i[n]);
      }
    }
    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }
    function step(r) {
      r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle(f, v) {
      if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
  }
  function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
      throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
      return this;
    }, i;
    function verb(n, f) {
      i[n] = o[n] ? function(v) {
        return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
      } : f;
    }
  }
  function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i);
    function verb(n) {
      i[n] = o[n] && function(v) {
        return new Promise(function(resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }
    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function(v2) {
        resolve({ value: v2, done: d });
      }, reject);
    }
  }
  function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  }
  function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
      for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
    }
    __setModuleDefault(result, mod);
    return result;
  }
  function __importDefault(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  }
  function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  }
  function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  }
  function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
  }
  function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
      if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
      var dispose, inner;
      if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
      }
      if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
        if (async) inner = dispose;
      }
      if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
      if (inner) dispose = function() {
        try {
          inner.call(this);
        } catch (e) {
          return Promise.reject(e);
        }
      };
      env.stack.push({ value, dispose, async });
    } else if (async) {
      env.stack.push({ async: true });
    }
    return value;
  }
  function __disposeResources(env) {
    function fail(e) {
      env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  }
  function __rewriteRelativeImportExtension(path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
      return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
        return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
      });
    }
    return path;
  }
  var extendStatics, __assign, __createBinding, __setModuleDefault, ownKeys, _SuppressedError, tslib_es6_default;
  var init_tslib_es6 = __esm({
    "node_modules/tslib/tslib.es6.mjs"() {
      extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      __assign = function() {
        __assign = Object.assign || function __assign2(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      __createBinding = Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      };
      __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      };
      ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
      };
      tslib_es6_default = {
        __extends,
        __assign,
        __rest,
        __decorate,
        __param,
        __esDecorate,
        __runInitializers,
        __propKey,
        __setFunctionName,
        __metadata,
        __awaiter,
        __generator,
        __createBinding,
        __exportStar,
        __values,
        __read,
        __spread,
        __spreadArrays,
        __spreadArray,
        __await,
        __asyncGenerator,
        __asyncDelegator,
        __asyncValues,
        __makeTemplateObject,
        __importStar,
        __importDefault,
        __classPrivateFieldGet,
        __classPrivateFieldSet,
        __classPrivateFieldIn,
        __addDisposableResource,
        __disposeResources,
        __rewriteRelativeImportExtension
      };
    }
  });

  // node_modules/async-mutex/lib/errors.js
  var require_errors = __commonJS({
    "node_modules/async-mutex/lib/errors.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.E_CANCELED = exports2.E_ALREADY_LOCKED = exports2.E_TIMEOUT = void 0;
      exports2.E_TIMEOUT = new Error("timeout while waiting for mutex to become available");
      exports2.E_ALREADY_LOCKED = new Error("mutex already locked");
      exports2.E_CANCELED = new Error("request for lock canceled");
    }
  });

  // node_modules/async-mutex/lib/Semaphore.js
  var require_Semaphore = __commonJS({
    "node_modules/async-mutex/lib/Semaphore.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      var errors_1 = require_errors();
      var Semaphore = (
        /** @class */
        function() {
          function Semaphore2(_value, _cancelError) {
            if (_cancelError === void 0) {
              _cancelError = errors_1.E_CANCELED;
            }
            this._value = _value;
            this._cancelError = _cancelError;
            this._queue = [];
            this._weightedWaiters = [];
          }
          Semaphore2.prototype.acquire = function(weight, priority) {
            var _this = this;
            if (weight === void 0) {
              weight = 1;
            }
            if (priority === void 0) {
              priority = 0;
            }
            if (weight <= 0)
              throw new Error("invalid weight ".concat(weight, ": must be positive"));
            return new Promise(function(resolve, reject) {
              var task = { resolve, reject, weight, priority };
              var i = findIndexFromEnd(_this._queue, function(other) {
                return priority <= other.priority;
              });
              if (i === -1 && weight <= _this._value) {
                _this._dispatchItem(task);
              } else {
                _this._queue.splice(i + 1, 0, task);
              }
            });
          };
          Semaphore2.prototype.runExclusive = function(callback_1) {
            return tslib_1.__awaiter(this, arguments, void 0, function(callback, weight, priority) {
              var _a, value, release;
              if (weight === void 0) {
                weight = 1;
              }
              if (priority === void 0) {
                priority = 0;
              }
              return tslib_1.__generator(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    return [4, this.acquire(weight, priority)];
                  case 1:
                    _a = _b.sent(), value = _a[0], release = _a[1];
                    _b.label = 2;
                  case 2:
                    _b.trys.push([2, , 4, 5]);
                    return [4, callback(value)];
                  case 3:
                    return [2, _b.sent()];
                  case 4:
                    release();
                    return [
                      7
                      /*endfinally*/
                    ];
                  case 5:
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          };
          Semaphore2.prototype.waitForUnlock = function(weight, priority) {
            var _this = this;
            if (weight === void 0) {
              weight = 1;
            }
            if (priority === void 0) {
              priority = 0;
            }
            if (weight <= 0)
              throw new Error("invalid weight ".concat(weight, ": must be positive"));
            if (this._couldLockImmediately(weight, priority)) {
              return Promise.resolve();
            } else {
              return new Promise(function(resolve) {
                if (!_this._weightedWaiters[weight - 1])
                  _this._weightedWaiters[weight - 1] = [];
                insertSorted(_this._weightedWaiters[weight - 1], { resolve, priority });
              });
            }
          };
          Semaphore2.prototype.isLocked = function() {
            return this._value <= 0;
          };
          Semaphore2.prototype.getValue = function() {
            return this._value;
          };
          Semaphore2.prototype.setValue = function(value) {
            this._value = value;
            this._dispatchQueue();
          };
          Semaphore2.prototype.release = function(weight) {
            if (weight === void 0) {
              weight = 1;
            }
            if (weight <= 0)
              throw new Error("invalid weight ".concat(weight, ": must be positive"));
            this._value += weight;
            this._dispatchQueue();
          };
          Semaphore2.prototype.cancel = function() {
            var _this = this;
            this._queue.forEach(function(entry) {
              return entry.reject(_this._cancelError);
            });
            this._queue = [];
          };
          Semaphore2.prototype._dispatchQueue = function() {
            this._drainUnlockWaiters();
            while (this._queue.length > 0 && this._queue[0].weight <= this._value) {
              this._dispatchItem(this._queue.shift());
              this._drainUnlockWaiters();
            }
          };
          Semaphore2.prototype._dispatchItem = function(item) {
            var previousValue = this._value;
            this._value -= item.weight;
            item.resolve([previousValue, this._newReleaser(item.weight)]);
          };
          Semaphore2.prototype._newReleaser = function(weight) {
            var _this = this;
            var called = false;
            return function() {
              if (called)
                return;
              called = true;
              _this.release(weight);
            };
          };
          Semaphore2.prototype._drainUnlockWaiters = function() {
            if (this._queue.length === 0) {
              for (var weight = this._value; weight > 0; weight--) {
                var waiters = this._weightedWaiters[weight - 1];
                if (!waiters)
                  continue;
                waiters.forEach(function(waiter) {
                  return waiter.resolve();
                });
                this._weightedWaiters[weight - 1] = [];
              }
            } else {
              var queuedPriority_1 = this._queue[0].priority;
              for (var weight = this._value; weight > 0; weight--) {
                var waiters = this._weightedWaiters[weight - 1];
                if (!waiters)
                  continue;
                var i = waiters.findIndex(function(waiter) {
                  return waiter.priority <= queuedPriority_1;
                });
                (i === -1 ? waiters : waiters.splice(0, i)).forEach(function(waiter) {
                  return waiter.resolve();
                });
              }
            }
          };
          Semaphore2.prototype._couldLockImmediately = function(weight, priority) {
            return (this._queue.length === 0 || this._queue[0].priority < priority) && weight <= this._value;
          };
          return Semaphore2;
        }()
      );
      function insertSorted(a, v) {
        var i = findIndexFromEnd(a, function(other) {
          return v.priority <= other.priority;
        });
        a.splice(i + 1, 0, v);
      }
      function findIndexFromEnd(a, predicate) {
        for (var i = a.length - 1; i >= 0; i--) {
          if (predicate(a[i])) {
            return i;
          }
        }
        return -1;
      }
      exports2.default = Semaphore;
    }
  });

  // node_modules/async-mutex/lib/Mutex.js
  var require_Mutex = __commonJS({
    "node_modules/async-mutex/lib/Mutex.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      var Semaphore_1 = require_Semaphore();
      var Mutex = (
        /** @class */
        function() {
          function Mutex2(cancelError) {
            this._semaphore = new Semaphore_1.default(1, cancelError);
          }
          Mutex2.prototype.acquire = function() {
            return tslib_1.__awaiter(this, arguments, void 0, function(priority) {
              var _a, releaser;
              if (priority === void 0) {
                priority = 0;
              }
              return tslib_1.__generator(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    return [4, this._semaphore.acquire(1, priority)];
                  case 1:
                    _a = _b.sent(), releaser = _a[1];
                    return [2, releaser];
                }
              });
            });
          };
          Mutex2.prototype.runExclusive = function(callback, priority) {
            if (priority === void 0) {
              priority = 0;
            }
            return this._semaphore.runExclusive(function() {
              return callback();
            }, 1, priority);
          };
          Mutex2.prototype.isLocked = function() {
            return this._semaphore.isLocked();
          };
          Mutex2.prototype.waitForUnlock = function(priority) {
            if (priority === void 0) {
              priority = 0;
            }
            return this._semaphore.waitForUnlock(1, priority);
          };
          Mutex2.prototype.release = function() {
            if (this._semaphore.isLocked())
              this._semaphore.release();
          };
          Mutex2.prototype.cancel = function() {
            return this._semaphore.cancel();
          };
          return Mutex2;
        }()
      );
      exports2.default = Mutex;
    }
  });

  // node_modules/async-mutex/lib/withTimeout.js
  var require_withTimeout = __commonJS({
    "node_modules/async-mutex/lib/withTimeout.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.withTimeout = void 0;
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      var errors_1 = require_errors();
      function withTimeout(sync, timeout, timeoutError) {
        var _this = this;
        if (timeoutError === void 0) {
          timeoutError = errors_1.E_TIMEOUT;
        }
        return {
          acquire: function(weightOrPriority, priority) {
            var weight;
            if (isSemaphore(sync)) {
              weight = weightOrPriority;
            } else {
              weight = void 0;
              priority = weightOrPriority;
            }
            if (weight !== void 0 && weight <= 0) {
              throw new Error("invalid weight ".concat(weight, ": must be positive"));
            }
            return new Promise(function(resolve, reject) {
              return tslib_1.__awaiter(_this, void 0, void 0, function() {
                var isTimeout, handle, ticket, release, e_1;
                return tslib_1.__generator(this, function(_a) {
                  switch (_a.label) {
                    case 0:
                      isTimeout = false;
                      handle = setTimeout(function() {
                        isTimeout = true;
                        reject(timeoutError);
                      }, timeout);
                      _a.label = 1;
                    case 1:
                      _a.trys.push([1, 3, , 4]);
                      return [4, isSemaphore(sync) ? sync.acquire(weight, priority) : sync.acquire(priority)];
                    case 2:
                      ticket = _a.sent();
                      if (isTimeout) {
                        release = Array.isArray(ticket) ? ticket[1] : ticket;
                        release();
                      } else {
                        clearTimeout(handle);
                        resolve(ticket);
                      }
                      return [3, 4];
                    case 3:
                      e_1 = _a.sent();
                      if (!isTimeout) {
                        clearTimeout(handle);
                        reject(e_1);
                      }
                      return [3, 4];
                    case 4:
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            });
          },
          runExclusive: function(callback, weight, priority) {
            return tslib_1.__awaiter(this, void 0, void 0, function() {
              var release, ticket;
              return tslib_1.__generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    release = function() {
                      return void 0;
                    };
                    _a.label = 1;
                  case 1:
                    _a.trys.push([1, , 7, 8]);
                    return [4, this.acquire(weight, priority)];
                  case 2:
                    ticket = _a.sent();
                    if (!Array.isArray(ticket)) return [3, 4];
                    release = ticket[1];
                    return [4, callback(ticket[0])];
                  case 3:
                    return [2, _a.sent()];
                  case 4:
                    release = ticket;
                    return [4, callback()];
                  case 5:
                    return [2, _a.sent()];
                  case 6:
                    return [3, 8];
                  case 7:
                    release();
                    return [
                      7
                      /*endfinally*/
                    ];
                  case 8:
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          },
          release: function(weight) {
            sync.release(weight);
          },
          cancel: function() {
            return sync.cancel();
          },
          waitForUnlock: function(weightOrPriority, priority) {
            var weight;
            if (isSemaphore(sync)) {
              weight = weightOrPriority;
            } else {
              weight = void 0;
              priority = weightOrPriority;
            }
            if (weight !== void 0 && weight <= 0) {
              throw new Error("invalid weight ".concat(weight, ": must be positive"));
            }
            return new Promise(function(resolve, reject) {
              var handle = setTimeout(function() {
                return reject(timeoutError);
              }, timeout);
              (isSemaphore(sync) ? sync.waitForUnlock(weight, priority) : sync.waitForUnlock(priority)).then(function() {
                clearTimeout(handle);
                resolve();
              });
            });
          },
          isLocked: function() {
            return sync.isLocked();
          },
          getValue: function() {
            return sync.getValue();
          },
          setValue: function(value) {
            return sync.setValue(value);
          }
        };
      }
      exports2.withTimeout = withTimeout;
      function isSemaphore(sync) {
        return sync.getValue !== void 0;
      }
    }
  });

  // node_modules/async-mutex/lib/tryAcquire.js
  var require_tryAcquire = __commonJS({
    "node_modules/async-mutex/lib/tryAcquire.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.tryAcquire = void 0;
      var errors_1 = require_errors();
      var withTimeout_1 = require_withTimeout();
      function tryAcquire(sync, alreadyAcquiredError) {
        if (alreadyAcquiredError === void 0) {
          alreadyAcquiredError = errors_1.E_ALREADY_LOCKED;
        }
        return (0, withTimeout_1.withTimeout)(sync, 0, alreadyAcquiredError);
      }
      exports2.tryAcquire = tryAcquire;
    }
  });

  // node_modules/async-mutex/lib/index.js
  var require_lib2 = __commonJS({
    "node_modules/async-mutex/lib/index.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.tryAcquire = exports2.withTimeout = exports2.Semaphore = exports2.Mutex = void 0;
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      var Mutex_1 = require_Mutex();
      Object.defineProperty(exports2, "Mutex", { enumerable: true, get: function() {
        return Mutex_1.default;
      } });
      var Semaphore_1 = require_Semaphore();
      Object.defineProperty(exports2, "Semaphore", { enumerable: true, get: function() {
        return Semaphore_1.default;
      } });
      var withTimeout_1 = require_withTimeout();
      Object.defineProperty(exports2, "withTimeout", { enumerable: true, get: function() {
        return withTimeout_1.withTimeout;
      } });
      var tryAcquire_1 = require_tryAcquire();
      Object.defineProperty(exports2, "tryAcquire", { enumerable: true, get: function() {
        return tryAcquire_1.tryAcquire;
      } });
      tslib_1.__exportStar(require_errors(), exports2);
    }
  });

  // node_modules/uuid/dist/cjs-browser/max.js
  var require_max = __commonJS({
    "node_modules/uuid/dist/cjs-browser/max.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.default = "ffffffff-ffff-ffff-ffff-ffffffffffff";
    }
  });

  // node_modules/uuid/dist/cjs-browser/nil.js
  var require_nil = __commonJS({
    "node_modules/uuid/dist/cjs-browser/nil.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.default = "00000000-0000-0000-0000-000000000000";
    }
  });

  // node_modules/uuid/dist/cjs-browser/regex.js
  var require_regex = __commonJS({
    "node_modules/uuid/dist/cjs-browser/regex.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
    }
  });

  // node_modules/uuid/dist/cjs-browser/validate.js
  var require_validate = __commonJS({
    "node_modules/uuid/dist/cjs-browser/validate.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var regex_js_1 = require_regex();
      function validate(uuid) {
        return typeof uuid === "string" && regex_js_1.default.test(uuid);
      }
      exports2.default = validate;
    }
  });

  // node_modules/uuid/dist/cjs-browser/parse.js
  var require_parse = __commonJS({
    "node_modules/uuid/dist/cjs-browser/parse.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var validate_js_1 = require_validate();
      function parse(uuid) {
        if (!(0, validate_js_1.default)(uuid)) {
          throw TypeError("Invalid UUID");
        }
        let v;
        return Uint8Array.of((v = parseInt(uuid.slice(0, 8), 16)) >>> 24, v >>> 16 & 255, v >>> 8 & 255, v & 255, (v = parseInt(uuid.slice(9, 13), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(14, 18), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(19, 23), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255, v / 4294967296 & 255, v >>> 24 & 255, v >>> 16 & 255, v >>> 8 & 255, v & 255);
      }
      exports2.default = parse;
    }
  });

  // node_modules/uuid/dist/cjs-browser/stringify.js
  var require_stringify = __commonJS({
    "node_modules/uuid/dist/cjs-browser/stringify.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.unsafeStringify = void 0;
      var validate_js_1 = require_validate();
      var byteToHex = [];
      for (let i = 0; i < 256; ++i) {
        byteToHex.push((i + 256).toString(16).slice(1));
      }
      function unsafeStringify(arr, offset = 0) {
        return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
      }
      exports2.unsafeStringify = unsafeStringify;
      function stringify(arr, offset = 0) {
        const uuid = unsafeStringify(arr, offset);
        if (!(0, validate_js_1.default)(uuid)) {
          throw TypeError("Stringified UUID is invalid");
        }
        return uuid;
      }
      exports2.default = stringify;
    }
  });

  // node_modules/uuid/dist/cjs-browser/rng.js
  var require_rng = __commonJS({
    "node_modules/uuid/dist/cjs-browser/rng.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var getRandomValues;
      var rnds8 = new Uint8Array(16);
      function rng() {
        if (!getRandomValues) {
          if (typeof crypto === "undefined" || !crypto.getRandomValues) {
            throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
          }
          getRandomValues = crypto.getRandomValues.bind(crypto);
        }
        return getRandomValues(rnds8);
      }
      exports2.default = rng;
    }
  });

  // node_modules/uuid/dist/cjs-browser/v1.js
  var require_v1 = __commonJS({
    "node_modules/uuid/dist/cjs-browser/v1.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.updateV1State = void 0;
      var rng_js_1 = require_rng();
      var stringify_js_1 = require_stringify();
      var _state = {};
      function v1(options2, buf, offset) {
        let bytes;
        const isV6 = options2?._v6 ?? false;
        if (options2) {
          const optionsKeys = Object.keys(options2);
          if (optionsKeys.length === 1 && optionsKeys[0] === "_v6") {
            options2 = void 0;
          }
        }
        if (options2) {
          bytes = v1Bytes(options2.random ?? options2.rng?.() ?? (0, rng_js_1.default)(), options2.msecs, options2.nsecs, options2.clockseq, options2.node, buf, offset);
        } else {
          const now = Date.now();
          const rnds = (0, rng_js_1.default)();
          updateV1State(_state, now, rnds);
          bytes = v1Bytes(rnds, _state.msecs, _state.nsecs, isV6 ? void 0 : _state.clockseq, isV6 ? void 0 : _state.node, buf, offset);
        }
        return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
      }
      function updateV1State(state, now, rnds) {
        state.msecs ??= -Infinity;
        state.nsecs ??= 0;
        if (now === state.msecs) {
          state.nsecs++;
          if (state.nsecs >= 1e4) {
            state.node = void 0;
            state.nsecs = 0;
          }
        } else if (now > state.msecs) {
          state.nsecs = 0;
        } else if (now < state.msecs) {
          state.node = void 0;
        }
        if (!state.node) {
          state.node = rnds.slice(10, 16);
          state.node[0] |= 1;
          state.clockseq = (rnds[8] << 8 | rnds[9]) & 16383;
        }
        state.msecs = now;
        return state;
      }
      exports2.updateV1State = updateV1State;
      function v1Bytes(rnds, msecs, nsecs, clockseq, node, buf, offset = 0) {
        if (rnds.length < 16) {
          throw new Error("Random bytes length must be >= 16");
        }
        if (!buf) {
          buf = new Uint8Array(16);
          offset = 0;
        } else {
          if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
          }
        }
        msecs ??= Date.now();
        nsecs ??= 0;
        clockseq ??= (rnds[8] << 8 | rnds[9]) & 16383;
        node ??= rnds.slice(10, 16);
        msecs += 122192928e5;
        const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
        buf[offset++] = tl >>> 24 & 255;
        buf[offset++] = tl >>> 16 & 255;
        buf[offset++] = tl >>> 8 & 255;
        buf[offset++] = tl & 255;
        const tmh = msecs / 4294967296 * 1e4 & 268435455;
        buf[offset++] = tmh >>> 8 & 255;
        buf[offset++] = tmh & 255;
        buf[offset++] = tmh >>> 24 & 15 | 16;
        buf[offset++] = tmh >>> 16 & 255;
        buf[offset++] = clockseq >>> 8 | 128;
        buf[offset++] = clockseq & 255;
        for (let n = 0; n < 6; ++n) {
          buf[offset++] = node[n];
        }
        return buf;
      }
      exports2.default = v1;
    }
  });

  // node_modules/uuid/dist/cjs-browser/v1ToV6.js
  var require_v1ToV6 = __commonJS({
    "node_modules/uuid/dist/cjs-browser/v1ToV6.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var parse_js_1 = require_parse();
      var stringify_js_1 = require_stringify();
      function v1ToV6(uuid) {
        const v1Bytes = typeof uuid === "string" ? (0, parse_js_1.default)(uuid) : uuid;
        const v6Bytes = _v1ToV6(v1Bytes);
        return typeof uuid === "string" ? (0, stringify_js_1.unsafeStringify)(v6Bytes) : v6Bytes;
      }
      exports2.default = v1ToV6;
      function _v1ToV6(v1Bytes) {
        return Uint8Array.of((v1Bytes[6] & 15) << 4 | v1Bytes[7] >> 4 & 15, (v1Bytes[7] & 15) << 4 | (v1Bytes[4] & 240) >> 4, (v1Bytes[4] & 15) << 4 | (v1Bytes[5] & 240) >> 4, (v1Bytes[5] & 15) << 4 | (v1Bytes[0] & 240) >> 4, (v1Bytes[0] & 15) << 4 | (v1Bytes[1] & 240) >> 4, (v1Bytes[1] & 15) << 4 | (v1Bytes[2] & 240) >> 4, 96 | v1Bytes[2] & 15, v1Bytes[3], v1Bytes[8], v1Bytes[9], v1Bytes[10], v1Bytes[11], v1Bytes[12], v1Bytes[13], v1Bytes[14], v1Bytes[15]);
      }
    }
  });

  // node_modules/uuid/dist/cjs-browser/md5.js
  var require_md5 = __commonJS({
    "node_modules/uuid/dist/cjs-browser/md5.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      function md5(bytes) {
        const words = uint8ToUint32(bytes);
        const md5Bytes = wordsToMd5(words, bytes.length * 8);
        return uint32ToUint8(md5Bytes);
      }
      function uint32ToUint8(input) {
        const bytes = new Uint8Array(input.length * 4);
        for (let i = 0; i < input.length * 4; i++) {
          bytes[i] = input[i >> 2] >>> i % 4 * 8 & 255;
        }
        return bytes;
      }
      function getOutputLength(inputLength8) {
        return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
      }
      function wordsToMd5(x, len) {
        const xpad = new Uint32Array(getOutputLength(len)).fill(0);
        xpad.set(x);
        xpad[len >> 5] |= 128 << len % 32;
        xpad[xpad.length - 1] = len;
        x = xpad;
        let a = 1732584193;
        let b = -271733879;
        let c = -1732584194;
        let d = 271733878;
        for (let i = 0; i < x.length; i += 16) {
          const olda = a;
          const oldb = b;
          const oldc = c;
          const oldd = d;
          a = md5ff(a, b, c, d, x[i], 7, -680876936);
          d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
          c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
          b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
          a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
          d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
          c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
          b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
          a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
          d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
          c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
          b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
          a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
          d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
          c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
          b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
          a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
          d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
          c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
          b = md5gg(b, c, d, a, x[i], 20, -373897302);
          a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
          d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
          c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
          b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
          a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
          d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
          c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
          b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
          a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
          d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
          c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
          b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
          a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
          d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
          c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
          b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
          a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
          d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
          c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
          b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
          a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
          d = md5hh(d, a, b, c, x[i], 11, -358537222);
          c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
          b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
          a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
          d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
          c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
          b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
          a = md5ii(a, b, c, d, x[i], 6, -198630844);
          d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
          c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
          b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
          a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
          d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
          c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
          b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
          a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
          d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
          c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
          b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
          a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
          d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
          c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
          b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
          a = safeAdd(a, olda);
          b = safeAdd(b, oldb);
          c = safeAdd(c, oldc);
          d = safeAdd(d, oldd);
        }
        return Uint32Array.of(a, b, c, d);
      }
      function uint8ToUint32(input) {
        if (input.length === 0) {
          return new Uint32Array();
        }
        const output = new Uint32Array(getOutputLength(input.length * 8)).fill(0);
        for (let i = 0; i < input.length; i++) {
          output[i >> 2] |= (input[i] & 255) << i % 4 * 8;
        }
        return output;
      }
      function safeAdd(x, y) {
        const lsw = (x & 65535) + (y & 65535);
        const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return msw << 16 | lsw & 65535;
      }
      function bitRotateLeft(num, cnt) {
        return num << cnt | num >>> 32 - cnt;
      }
      function md5cmn(q, a, b, x, s, t) {
        return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
      }
      function md5ff(a, b, c, d, x, s, t) {
        return md5cmn(b & c | ~b & d, a, b, x, s, t);
      }
      function md5gg(a, b, c, d, x, s, t) {
        return md5cmn(b & d | c & ~d, a, b, x, s, t);
      }
      function md5hh(a, b, c, d, x, s, t) {
        return md5cmn(b ^ c ^ d, a, b, x, s, t);
      }
      function md5ii(a, b, c, d, x, s, t) {
        return md5cmn(c ^ (b | ~d), a, b, x, s, t);
      }
      exports2.default = md5;
    }
  });

  // node_modules/uuid/dist/cjs-browser/v35.js
  var require_v35 = __commonJS({
    "node_modules/uuid/dist/cjs-browser/v35.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.URL = exports2.DNS = exports2.stringToBytes = void 0;
      var parse_js_1 = require_parse();
      var stringify_js_1 = require_stringify();
      function stringToBytes(str) {
        str = unescape(encodeURIComponent(str));
        const bytes = new Uint8Array(str.length);
        for (let i = 0; i < str.length; ++i) {
          bytes[i] = str.charCodeAt(i);
        }
        return bytes;
      }
      exports2.stringToBytes = stringToBytes;
      exports2.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
      exports2.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
      function v35(version, hash, value, namespace, buf, offset) {
        const valueBytes = typeof value === "string" ? stringToBytes(value) : value;
        const namespaceBytes = typeof namespace === "string" ? (0, parse_js_1.default)(namespace) : namespace;
        if (typeof namespace === "string") {
          namespace = (0, parse_js_1.default)(namespace);
        }
        if (namespace?.length !== 16) {
          throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
        }
        let bytes = new Uint8Array(16 + valueBytes.length);
        bytes.set(namespaceBytes);
        bytes.set(valueBytes, namespaceBytes.length);
        bytes = hash(bytes);
        bytes[6] = bytes[6] & 15 | version;
        bytes[8] = bytes[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
          }
          return buf;
        }
        return (0, stringify_js_1.unsafeStringify)(bytes);
      }
      exports2.default = v35;
    }
  });

  // node_modules/uuid/dist/cjs-browser/v3.js
  var require_v3 = __commonJS({
    "node_modules/uuid/dist/cjs-browser/v3.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.URL = exports2.DNS = void 0;
      var md5_js_1 = require_md5();
      var v35_js_1 = require_v35();
      var v35_js_2 = require_v35();
      Object.defineProperty(exports2, "DNS", { enumerable: true, get: function() {
        return v35_js_2.DNS;
      } });
      Object.defineProperty(exports2, "URL", { enumerable: true, get: function() {
        return v35_js_2.URL;
      } });
      function v3(value, namespace, buf, offset) {
        return (0, v35_js_1.default)(48, md5_js_1.default, value, namespace, buf, offset);
      }
      v3.DNS = v35_js_1.DNS;
      v3.URL = v35_js_1.URL;
      exports2.default = v3;
    }
  });

  // node_modules/uuid/dist/cjs-browser/native.js
  var require_native = __commonJS({
    "node_modules/uuid/dist/cjs-browser/native.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
      exports2.default = { randomUUID };
    }
  });

  // node_modules/uuid/dist/cjs-browser/v4.js
  var require_v4 = __commonJS({
    "node_modules/uuid/dist/cjs-browser/v4.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var native_js_1 = require_native();
      var rng_js_1 = require_rng();
      var stringify_js_1 = require_stringify();
      function v4(options2, buf, offset) {
        if (native_js_1.default.randomUUID && !buf && !options2) {
          return native_js_1.default.randomUUID();
        }
        options2 = options2 || {};
        const rnds = options2.random ?? options2.rng?.() ?? (0, rng_js_1.default)();
        if (rnds.length < 16) {
          throw new Error("Random bytes length must be >= 16");
        }
        rnds[6] = rnds[6] & 15 | 64;
        rnds[8] = rnds[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
          }
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = rnds[i];
          }
          return buf;
        }
        return (0, stringify_js_1.unsafeStringify)(rnds);
      }
      exports2.default = v4;
    }
  });

  // node_modules/uuid/dist/cjs-browser/sha1.js
  var require_sha1 = __commonJS({
    "node_modules/uuid/dist/cjs-browser/sha1.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      function f(s, x, y, z) {
        switch (s) {
          case 0:
            return x & y ^ ~x & z;
          case 1:
            return x ^ y ^ z;
          case 2:
            return x & y ^ x & z ^ y & z;
          case 3:
            return x ^ y ^ z;
        }
      }
      function ROTL(x, n) {
        return x << n | x >>> 32 - n;
      }
      function sha1(bytes) {
        const K = [1518500249, 1859775393, 2400959708, 3395469782];
        const H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
        const newBytes = new Uint8Array(bytes.length + 1);
        newBytes.set(bytes);
        newBytes[bytes.length] = 128;
        bytes = newBytes;
        const l = bytes.length / 4 + 2;
        const N = Math.ceil(l / 16);
        const M = new Array(N);
        for (let i = 0; i < N; ++i) {
          const arr = new Uint32Array(16);
          for (let j = 0; j < 16; ++j) {
            arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
          }
          M[i] = arr;
        }
        M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
        M[N - 1][14] = Math.floor(M[N - 1][14]);
        M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
        for (let i = 0; i < N; ++i) {
          const W = new Uint32Array(80);
          for (let t = 0; t < 16; ++t) {
            W[t] = M[i][t];
          }
          for (let t = 16; t < 80; ++t) {
            W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
          }
          let a = H[0];
          let b = H[1];
          let c = H[2];
          let d = H[3];
          let e = H[4];
          for (let t = 0; t < 80; ++t) {
            const s = Math.floor(t / 20);
            const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
            e = d;
            d = c;
            c = ROTL(b, 30) >>> 0;
            b = a;
            a = T;
          }
          H[0] = H[0] + a >>> 0;
          H[1] = H[1] + b >>> 0;
          H[2] = H[2] + c >>> 0;
          H[3] = H[3] + d >>> 0;
          H[4] = H[4] + e >>> 0;
        }
        return Uint8Array.of(H[0] >> 24, H[0] >> 16, H[0] >> 8, H[0], H[1] >> 24, H[1] >> 16, H[1] >> 8, H[1], H[2] >> 24, H[2] >> 16, H[2] >> 8, H[2], H[3] >> 24, H[3] >> 16, H[3] >> 8, H[3], H[4] >> 24, H[4] >> 16, H[4] >> 8, H[4]);
      }
      exports2.default = sha1;
    }
  });

  // node_modules/uuid/dist/cjs-browser/v5.js
  var require_v5 = __commonJS({
    "node_modules/uuid/dist/cjs-browser/v5.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.URL = exports2.DNS = void 0;
      var sha1_js_1 = require_sha1();
      var v35_js_1 = require_v35();
      var v35_js_2 = require_v35();
      Object.defineProperty(exports2, "DNS", { enumerable: true, get: function() {
        return v35_js_2.DNS;
      } });
      Object.defineProperty(exports2, "URL", { enumerable: true, get: function() {
        return v35_js_2.URL;
      } });
      function v5(value, namespace, buf, offset) {
        return (0, v35_js_1.default)(80, sha1_js_1.default, value, namespace, buf, offset);
      }
      v5.DNS = v35_js_1.DNS;
      v5.URL = v35_js_1.URL;
      exports2.default = v5;
    }
  });

  // node_modules/uuid/dist/cjs-browser/v6.js
  var require_v6 = __commonJS({
    "node_modules/uuid/dist/cjs-browser/v6.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var stringify_js_1 = require_stringify();
      var v1_js_1 = require_v1();
      var v1ToV6_js_1 = require_v1ToV6();
      function v6(options2, buf, offset) {
        options2 ??= {};
        offset ??= 0;
        let bytes = (0, v1_js_1.default)({ ...options2, _v6: true }, new Uint8Array(16));
        bytes = (0, v1ToV6_js_1.default)(bytes);
        if (buf) {
          for (let i = 0; i < 16; i++) {
            buf[offset + i] = bytes[i];
          }
          return buf;
        }
        return (0, stringify_js_1.unsafeStringify)(bytes);
      }
      exports2.default = v6;
    }
  });

  // node_modules/uuid/dist/cjs-browser/v6ToV1.js
  var require_v6ToV1 = __commonJS({
    "node_modules/uuid/dist/cjs-browser/v6ToV1.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var parse_js_1 = require_parse();
      var stringify_js_1 = require_stringify();
      function v6ToV1(uuid) {
        const v6Bytes = typeof uuid === "string" ? (0, parse_js_1.default)(uuid) : uuid;
        const v1Bytes = _v6ToV1(v6Bytes);
        return typeof uuid === "string" ? (0, stringify_js_1.unsafeStringify)(v1Bytes) : v1Bytes;
      }
      exports2.default = v6ToV1;
      function _v6ToV1(v6Bytes) {
        return Uint8Array.of((v6Bytes[3] & 15) << 4 | v6Bytes[4] >> 4 & 15, (v6Bytes[4] & 15) << 4 | (v6Bytes[5] & 240) >> 4, (v6Bytes[5] & 15) << 4 | v6Bytes[6] & 15, v6Bytes[7], (v6Bytes[1] & 15) << 4 | (v6Bytes[2] & 240) >> 4, (v6Bytes[2] & 15) << 4 | (v6Bytes[3] & 240) >> 4, 16 | (v6Bytes[0] & 240) >> 4, (v6Bytes[0] & 15) << 4 | (v6Bytes[1] & 240) >> 4, v6Bytes[8], v6Bytes[9], v6Bytes[10], v6Bytes[11], v6Bytes[12], v6Bytes[13], v6Bytes[14], v6Bytes[15]);
      }
    }
  });

  // node_modules/uuid/dist/cjs-browser/v7.js
  var require_v7 = __commonJS({
    "node_modules/uuid/dist/cjs-browser/v7.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.updateV7State = void 0;
      var rng_js_1 = require_rng();
      var stringify_js_1 = require_stringify();
      var _state = {};
      function v7(options2, buf, offset) {
        let bytes;
        if (options2) {
          bytes = v7Bytes(options2.random ?? options2.rng?.() ?? (0, rng_js_1.default)(), options2.msecs, options2.seq, buf, offset);
        } else {
          const now = Date.now();
          const rnds = (0, rng_js_1.default)();
          updateV7State(_state, now, rnds);
          bytes = v7Bytes(rnds, _state.msecs, _state.seq, buf, offset);
        }
        return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
      }
      function updateV7State(state, now, rnds) {
        state.msecs ??= -Infinity;
        state.seq ??= 0;
        if (now > state.msecs) {
          state.seq = rnds[6] << 23 | rnds[7] << 16 | rnds[8] << 8 | rnds[9];
          state.msecs = now;
        } else {
          state.seq = state.seq + 1 | 0;
          if (state.seq === 0) {
            state.msecs++;
          }
        }
        return state;
      }
      exports2.updateV7State = updateV7State;
      function v7Bytes(rnds, msecs, seq, buf, offset = 0) {
        if (rnds.length < 16) {
          throw new Error("Random bytes length must be >= 16");
        }
        if (!buf) {
          buf = new Uint8Array(16);
          offset = 0;
        } else {
          if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
          }
        }
        msecs ??= Date.now();
        seq ??= rnds[6] * 127 << 24 | rnds[7] << 16 | rnds[8] << 8 | rnds[9];
        buf[offset++] = msecs / 1099511627776 & 255;
        buf[offset++] = msecs / 4294967296 & 255;
        buf[offset++] = msecs / 16777216 & 255;
        buf[offset++] = msecs / 65536 & 255;
        buf[offset++] = msecs / 256 & 255;
        buf[offset++] = msecs & 255;
        buf[offset++] = 112 | seq >>> 28 & 15;
        buf[offset++] = seq >>> 20 & 255;
        buf[offset++] = 128 | seq >>> 14 & 63;
        buf[offset++] = seq >>> 6 & 255;
        buf[offset++] = seq << 2 & 255 | rnds[10] & 3;
        buf[offset++] = rnds[11];
        buf[offset++] = rnds[12];
        buf[offset++] = rnds[13];
        buf[offset++] = rnds[14];
        buf[offset++] = rnds[15];
        return buf;
      }
      exports2.default = v7;
    }
  });

  // node_modules/uuid/dist/cjs-browser/version.js
  var require_version2 = __commonJS({
    "node_modules/uuid/dist/cjs-browser/version.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var validate_js_1 = require_validate();
      function version(uuid) {
        if (!(0, validate_js_1.default)(uuid)) {
          throw TypeError("Invalid UUID");
        }
        return parseInt(uuid.slice(14, 15), 16);
      }
      exports2.default = version;
    }
  });

  // node_modules/uuid/dist/cjs-browser/index.js
  var require_cjs_browser = __commonJS({
    "node_modules/uuid/dist/cjs-browser/index.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.version = exports2.validate = exports2.v7 = exports2.v6ToV1 = exports2.v6 = exports2.v5 = exports2.v4 = exports2.v3 = exports2.v1ToV6 = exports2.v1 = exports2.stringify = exports2.parse = exports2.NIL = exports2.MAX = void 0;
      var max_js_1 = require_max();
      Object.defineProperty(exports2, "MAX", { enumerable: true, get: function() {
        return max_js_1.default;
      } });
      var nil_js_1 = require_nil();
      Object.defineProperty(exports2, "NIL", { enumerable: true, get: function() {
        return nil_js_1.default;
      } });
      var parse_js_1 = require_parse();
      Object.defineProperty(exports2, "parse", { enumerable: true, get: function() {
        return parse_js_1.default;
      } });
      var stringify_js_1 = require_stringify();
      Object.defineProperty(exports2, "stringify", { enumerable: true, get: function() {
        return stringify_js_1.default;
      } });
      var v1_js_1 = require_v1();
      Object.defineProperty(exports2, "v1", { enumerable: true, get: function() {
        return v1_js_1.default;
      } });
      var v1ToV6_js_1 = require_v1ToV6();
      Object.defineProperty(exports2, "v1ToV6", { enumerable: true, get: function() {
        return v1ToV6_js_1.default;
      } });
      var v3_js_1 = require_v3();
      Object.defineProperty(exports2, "v3", { enumerable: true, get: function() {
        return v3_js_1.default;
      } });
      var v4_js_1 = require_v4();
      Object.defineProperty(exports2, "v4", { enumerable: true, get: function() {
        return v4_js_1.default;
      } });
      var v5_js_1 = require_v5();
      Object.defineProperty(exports2, "v5", { enumerable: true, get: function() {
        return v5_js_1.default;
      } });
      var v6_js_1 = require_v6();
      Object.defineProperty(exports2, "v6", { enumerable: true, get: function() {
        return v6_js_1.default;
      } });
      var v6ToV1_js_1 = require_v6ToV1();
      Object.defineProperty(exports2, "v6ToV1", { enumerable: true, get: function() {
        return v6ToV1_js_1.default;
      } });
      var v7_js_1 = require_v7();
      Object.defineProperty(exports2, "v7", { enumerable: true, get: function() {
        return v7_js_1.default;
      } });
      var validate_js_1 = require_validate();
      Object.defineProperty(exports2, "validate", { enumerable: true, get: function() {
        return validate_js_1.default;
      } });
      var version_js_1 = require_version2();
      Object.defineProperty(exports2, "version", { enumerable: true, get: function() {
        return version_js_1.default;
      } });
    }
  });

  // node_modules/@nevuamarkets/poly-websockets/dist/types/WebSocketSubscriptions.js
  var require_WebSocketSubscriptions = __commonJS({
    "node_modules/@nevuamarkets/poly-websockets/dist/types/WebSocketSubscriptions.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.WebSocketStatus = void 0;
      var WebSocketStatus;
      (function(WebSocketStatus2) {
        WebSocketStatus2["PENDING"] = "pending";
        WebSocketStatus2["ALIVE"] = "alive";
        WebSocketStatus2["DEAD"] = "dead";
        WebSocketStatus2["CLEANUP"] = "cleanup";
      })(WebSocketStatus || (exports2.WebSocketStatus = WebSocketStatus = {}));
    }
  });

  // shims/winston.js
  var winston_exports = {};
  __export(winston_exports, {
    createLogger: () => createLogger,
    default: () => winston_default,
    format: () => format,
    transports: () => transports
  });
  var ConsoleTransport, transports, passthrough, dynamicFormat, format, createLogger, winston_default;
  var init_winston = __esm({
    "shims/winston.js"() {
      ConsoleTransport = class {
        constructor() {
        }
        log() {
        }
      };
      transports = { Console: ConsoleTransport };
      passthrough = () => ({ transform: (info) => info });
      dynamicFormat = new Proxy({}, {
        get: (_target, prop) => {
          if (prop === "combine") {
            return (...fns) => ({ transform: (info) => fns.reduce((acc, fn) => fn.transform ? fn.transform(acc) : acc, info) });
          }
          return (...args) => passthrough(...args);
        }
      });
      format = dynamicFormat;
      createLogger = () => ({
        info: console.log.bind(console),
        //noop later
        warn: console.log.bind(console),
        error: console.error.bind(console),
        debug: console.log.bind(console)
      });
      winston_default = { createLogger, format, transports };
    }
  });

  // node_modules/@nevuamarkets/poly-websockets/dist/logger.js
  var require_logger = __commonJS({
    "node_modules/@nevuamarkets/poly-websockets/dist/logger.js"(exports2) {
      "use strict";
      var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.logger = void 0;
      var winston_1 = __importDefault2((init_winston(), __toCommonJS(winston_exports)));
      exports2.logger = winston_1.default.createLogger({
        level: "warn",
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.errors({ stack: true }), winston_1.default.format.colorize(), winston_1.default.format.printf(({ level, message, timestamp, ...rest }) => {
          const restString = Object.keys(rest).filter((key) => key !== "service").sort().map((key) => `${key}: ${JSON.stringify(rest[key])}`).join(", ");
          return `${timestamp} ${level}: ${message}${restString ? ` (${restString})` : ""}`;
        })),
        defaultMeta: { service: "poly-websockets" },
        transports: [
          new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize({
              all: true,
              colors: {
                error: "red",
                warn: "yellow",
                info: "cyan",
                debug: "green"
              }
            }))
          })
        ]
      });
    }
  });

  // node_modules/@nevuamarkets/poly-websockets/dist/modules/GroupRegistry.js
  var require_GroupRegistry = __commonJS({
    "node_modules/@nevuamarkets/poly-websockets/dist/modules/GroupRegistry.js"(exports2) {
      "use strict";
      var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.GroupRegistry = void 0;
      var async_mutex_1 = require_lib2();
      var lodash_1 = __importDefault2(require_lodash());
      var uuid_1 = require_cjs_browser();
      var WebSocketSubscriptions_1 = require_WebSocketSubscriptions();
      var logger_1 = require_logger();
      var wsGroups = [];
      var wsGroupsMutex = new async_mutex_1.Mutex();
      var GroupRegistry = class {
        /**
         * Atomic mutate helper.
         *
         * @param fn - The function to run atomically.
         * @returns The result of the function.
         */
        async mutate(fn) {
          const release = await wsGroupsMutex.acquire();
          try {
            return await fn(wsGroups);
          } finally {
            release();
          }
        }
        /**
         * Read-only copy of the registry.
         *
         * Only to be used in test suite.
         */
        snapshot() {
          return wsGroups.map((group) => ({
            ...group,
            assetIds: new Set(group.assetIds)
          }));
        }
        /**
         * Find the first group with capacity to hold new assets.
         *
         * Returns the groupId if found, otherwise null.
         */
        findGroupWithCapacity(newAssetLen, maxPerWS) {
          for (const group of wsGroups) {
            if (group.assetIds.size === 0)
              continue;
            if (group.assetIds.size + newAssetLen <= maxPerWS)
              return group.groupId;
          }
          return null;
        }
        /**
         * Get the indices of all groups that contain the asset.
         *
         * Returns an array of indices.
         */
        getGroupIndicesForAsset(assetId) {
          var _a;
          const indices = [];
          for (let i = 0; i < wsGroups.length; i++) {
            if ((_a = wsGroups[i]) === null || _a === void 0 ? void 0 : _a.assetIds.has(assetId))
              indices.push(i);
          }
          return indices;
        }
        /**
         * Check if any group contains the asset.
         */
        hasAsset(assetId) {
          return wsGroups.some((group) => group.assetIds.has(assetId));
        }
        /**
         * Find the group by groupId.
         *
         * Returns the group if found, otherwise undefined.
         */
        findGroupById(groupId) {
          return wsGroups.find((g) => g.groupId === groupId);
        }
        /**
         * Atomically remove **all** groups from the registry and return them so the
         * caller can perform any asynchronous cleanup (closing sockets, etc.)
         * outside the lock.
         *
         * Returns the removed groups.
         */
        async clearAllGroups() {
          let removed = [];
          await this.mutate((groups) => {
            removed = [...groups];
            groups.length = 0;
          });
          return removed;
        }
        /**
         * Add new asset subscriptions.
         *
         * – Ignores assets that are already subscribed.
         * – Either reuses an existing group with capacity or creates new groups (size ≤ maxPerWS).
         * – If appending to a group:
         *  - A new group is created with the updated assetIds.
         *  - The old group is marked for cleanup.
         *  - The group is added to the list of groups to connect.
         *
         * @param assetIds - The assetIds to add.
         * @param maxPerWS - The maximum number of assets per WebSocket group.
         * @returns An array of *new* groupIds that need websocket connections.
         */
        async addAssets(assetIds, maxPerWS) {
          const groupIdsToConnect = [];
          let newAssetIds = [];
          await this.mutate((groups) => {
            newAssetIds = assetIds.filter((id) => !groups.some((g) => g.assetIds.has(id)));
            if (newAssetIds.length === 0)
              return;
            const existingGroupId = this.findGroupWithCapacity(newAssetIds.length, maxPerWS);
            if (existingGroupId === null) {
              const chunks = lodash_1.default.chunk(newAssetIds, maxPerWS);
              for (const chunk of chunks) {
                const groupId = (0, uuid_1.v4)();
                groups.push({
                  groupId,
                  assetIds: new Set(chunk),
                  wsClient: null,
                  status: WebSocketSubscriptions_1.WebSocketStatus.PENDING
                });
                groupIdsToConnect.push(groupId);
              }
            } else {
              const existingGroup = groups.find((g) => g.groupId === existingGroupId);
              if (!existingGroup) {
                throw new Error(`Group with capacity not found for ${newAssetIds.join(", ")}`);
              }
              const updatedAssetIds = /* @__PURE__ */ new Set([...existingGroup.assetIds, ...newAssetIds]);
              existingGroup.assetIds = /* @__PURE__ */ new Set();
              existingGroup.status = WebSocketSubscriptions_1.WebSocketStatus.CLEANUP;
              const groupId = (0, uuid_1.v4)();
              groups.push({
                groupId,
                assetIds: updatedAssetIds,
                wsClient: null,
                status: WebSocketSubscriptions_1.WebSocketStatus.PENDING
              });
              groupIdsToConnect.push(groupId);
            }
          });
          if (newAssetIds.length > 0) {
            logger_1.logger.info({
              message: `Added ${newAssetIds.length} new asset(s)`
            });
          }
          return groupIdsToConnect;
        }
        /**
         * Remove asset subscriptions from every group that contains the asset.
         *
         * It should be only one group that contains the asset, we search all of them
         * regardless.
         *
         * Returns the list of assetIds that were removed.
         */
        async removeAssets(assetIds, bookCache) {
          const removedAssetIds = [];
          await this.mutate((groups) => {
            groups.forEach((group) => {
              if (group.assetIds.size === 0)
                return;
              assetIds.forEach((id) => {
                if (group.assetIds.delete(id)) {
                  bookCache.clear(id);
                  removedAssetIds.push(id);
                }
              });
            });
          });
          if (removedAssetIds.length > 0) {
            logger_1.logger.info({
              message: `Removed ${removedAssetIds.length} asset(s)`
            });
          }
          return removedAssetIds;
        }
        /**
         * Disconnect a group.
         */
        disconnectGroup(group) {
          var _a;
          (_a = group.wsClient) === null || _a === void 0 ? void 0 : _a.close();
          group.wsClient = null;
          logger_1.logger.info({
            message: "Disconnected group",
            groupId: group.groupId,
            assetIds: Array.from(group.assetIds)
          });
        }
        /**
         * Check status of groups and reconnect or cleanup as needed.
         *
         * – Empty groups are removed from the global array and returned.
         * – Dead (but non-empty) groups are reset so that caller can reconnect them.
         * – Pending groups are returned so that caller can connect them.
         *
         * Returns an array of group IDs that need to be reconnected, after cleaning up empty and cleanup-marked groups.
         */
        async getGroupsToReconnectAndCleanup() {
          const reconnectIds = [];
          await this.mutate((groups) => {
            const groupsToRemove = /* @__PURE__ */ new Set();
            for (const group of groups) {
              if (group.assetIds.size === 0) {
                groupsToRemove.add(group.groupId);
                continue;
              }
              if (group.status === WebSocketSubscriptions_1.WebSocketStatus.ALIVE) {
                continue;
              }
              if (group.status === WebSocketSubscriptions_1.WebSocketStatus.DEAD) {
                this.disconnectGroup(group);
                reconnectIds.push(group.groupId);
              }
              if (group.status === WebSocketSubscriptions_1.WebSocketStatus.CLEANUP) {
                groupsToRemove.add(group.groupId);
                group.assetIds = /* @__PURE__ */ new Set();
                continue;
              }
              if (group.status === WebSocketSubscriptions_1.WebSocketStatus.PENDING) {
                reconnectIds.push(group.groupId);
              }
            }
            if (groupsToRemove.size > 0) {
              groups.forEach((group) => {
                if (groupsToRemove.has(group.groupId)) {
                  this.disconnectGroup(group);
                }
              });
              const remaining = groups.filter((group) => !groupsToRemove.has(group.groupId));
              groups.splice(0, groups.length, ...remaining);
            }
          });
          return reconnectIds;
        }
      };
      exports2.GroupRegistry = GroupRegistry;
    }
  });

  // node_modules/@nevuamarkets/poly-websockets/dist/modules/OrderBookCache.js
  var require_OrderBookCache = __commonJS({
    "node_modules/@nevuamarkets/poly-websockets/dist/modules/OrderBookCache.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.OrderBookCache = void 0;
      exports2.sortDescendingInPlace = sortDescendingInPlace;
      function sortDescendingInPlace(bookSide) {
        bookSide.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      }
      function sortAscendingInPlace(bookSide) {
        bookSide.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      }
      var OrderBookCache = class {
        constructor() {
          this.bookCache = {};
        }
        /**
         * Replace full book (after a `book` event)
         */
        replaceBook(event) {
          let lastPrice = null;
          let lastMidpoint = null;
          let lastSpread = null;
          if (this.bookCache[event.asset_id]) {
            lastPrice = this.bookCache[event.asset_id].price;
            lastMidpoint = this.bookCache[event.asset_id].midpoint;
            lastSpread = this.bookCache[event.asset_id].spread;
          }
          this.bookCache[event.asset_id] = {
            bids: [...event.bids],
            asks: [...event.asks],
            price: lastPrice,
            midpoint: lastMidpoint,
            spread: lastSpread
          };
          sortAscendingInPlace(this.bookCache[event.asset_id].bids);
          sortDescendingInPlace(this.bookCache[event.asset_id].asks);
        }
        /**
         * Update a cached book from a `price_change` event.
         *
         * Returns true if the book was updated.
         * Throws if the book is not found.
         */
        upsertPriceChange(event) {
          for (const priceChange of event.price_changes) {
            const book = this.bookCache[priceChange.asset_id];
            if (!book) {
              throw new Error(`Book not found for asset ${priceChange.asset_id}`);
            }
            const { price, size, side } = priceChange;
            if (side === "BUY") {
              const i = book.bids.findIndex((bid) => bid.price === price);
              if (i !== -1) {
                book.bids[i].size = size;
              } else {
                book.bids.push({ price, size });
                sortAscendingInPlace(book.bids);
              }
            } else {
              const i = book.asks.findIndex((ask) => ask.price === price);
              if (i !== -1) {
                book.asks[i].size = size;
              } else {
                book.asks.push({ price, size });
                sortDescendingInPlace(book.asks);
              }
            }
          }
        }
        /**
         * Return `true` if best-bid/best-ask spread exceeds `cents`.
         *
         * Side effect: updates the book's spread
         *
         * Throws if either side of the book is empty.
         */
        spreadOver(assetId, cents = 0.1) {
          const book = this.bookCache[assetId];
          if (!book)
            throw new Error(`Book for ${assetId} not cached`);
          if (book.asks.length === 0)
            throw new Error(`No asks in book for ${assetId}`);
          if (book.bids.length === 0)
            throw new Error(`No bids in book for ${assetId}`);
          const highestBid = book.bids[book.bids.length - 1].price;
          const lowestAsk = book.asks[book.asks.length - 1].price;
          const highestBidNum = parseFloat(highestBid);
          const lowestAskNum = parseFloat(lowestAsk);
          const spread = lowestAskNum - highestBidNum;
          if (isNaN(spread)) {
            throw new Error(`Spread is NaN: lowestAsk '${lowestAsk}' highestBid '${highestBid}'`);
          }
          book.spread = parseFloat(spread.toFixed(3)).toString();
          return spread > cents;
        }
        /**
         * Calculate the midpoint of the book, rounded to 3dp, no trailing zeros
         *
         * Side effect: updates the book's midpoint
         *
         * Throws if
         * - the book is not found or missing either bid or ask
         * - the midpoint is NaN.
        */
        midpoint(assetId) {
          const book = this.bookCache[assetId];
          if (!book)
            throw new Error(`Book for ${assetId} not cached`);
          if (book.asks.length === 0)
            throw new Error(`No asks in book for ${assetId}`);
          if (book.bids.length === 0)
            throw new Error(`No bids in book for ${assetId}`);
          const highestBid = book.bids[book.bids.length - 1].price;
          const lowestAsk = book.asks[book.asks.length - 1].price;
          const highestBidNum = parseFloat(highestBid);
          const lowestAskNum = parseFloat(lowestAsk);
          const midpoint = (highestBidNum + lowestAskNum) / 2;
          if (isNaN(midpoint)) {
            throw new Error(`Midpoint is NaN: lowestAsk '${lowestAsk}' highestBid '${highestBid}'`);
          }
          book.midpoint = parseFloat(midpoint.toFixed(3)).toString();
          return parseFloat(midpoint.toFixed(3)).toString();
        }
        clear(assetId) {
          if (assetId) {
            delete this.bookCache[assetId];
          } else {
            for (const k of Object.keys(this.bookCache)) {
              delete this.bookCache[k];
            }
          }
        }
        /**
         * Get a book entry by asset id.
         *
         * Return null if the book is not found.
         */
        getBookEntry(assetId) {
          if (!this.bookCache[assetId]) {
            return null;
          }
          return this.bookCache[assetId];
        }
      };
      exports2.OrderBookCache = OrderBookCache;
    }
  });

  // shims/ws.js
  var ws_exports = {};
  __export(ws_exports, {
    default: () => ws_default
  });
  var WSWrapper, ws_default;
  var init_ws = __esm({
    "shims/ws.js"() {
      WSWrapper = class {
        constructor(url) {
          this._ws = new WebSocket(url);
          this._listeners = /* @__PURE__ */ new Map();
        }
        /**
         * Node-style event emitter interface .on(event, handler)
         * Maps to browser WebSocket addEventListener.
         */
        on(event, handler) {
          if (!this._listeners.has(event)) this._listeners.set(event, /* @__PURE__ */ new Set());
          this._listeners.get(event).add(handler);
          if (event === "message") {
            const wrapped = (e) => {
              const raw = e && "data" in e ? e.data : "";
              const dataWrapper = {
                toString: () => {
                  if (typeof raw === "string") return raw;
                  if (raw instanceof ArrayBuffer) return new TextDecoder().decode(new Uint8Array(raw));
                  if (raw && raw.buffer) return new TextDecoder().decode(raw);
                  return "";
                }
              };
              handler(dataWrapper);
            };
            this._listeners.get(event).add(wrapped);
            this._ws.addEventListener("message", wrapped);
            return;
          }
          this._ws.addEventListener(event, handler);
        }
        /** remove all registered listeners (used before re-attaching) */
        removeAllListeners() {
          for (const [event, handlers] of this._listeners.entries()) {
            for (const h of handlers) {
              this._ws.removeEventListener(event, h);
            }
          }
          this._listeners.clear();
        }
        send(data) {
          this._ws.readyState === 1 ? this._ws.send(data) : null;
        }
        /** ping is a noop in browser (no TCP ping) */
        ping() {
        }
        close(code, reason) {
          this._ws.close(code, reason);
        }
      };
      ws_default = WSWrapper;
    }
  });

  // shims/crypto.js
  var crypto_exports = {};
  __export(crypto_exports, {
    default: () => crypto_default,
    randomInt: () => randomInt
  });
  function randomInt(min, max) {
    const range = max - min;
    return Math.floor(Math.random() * range) + min;
  }
  var crypto_default;
  var init_crypto = __esm({
    "shims/crypto.js"() {
      crypto_default = { randomInt };
    }
  });

  // node_modules/@nevuamarkets/poly-websockets/dist/modules/GroupSocket.js
  var require_GroupSocket = __commonJS({
    "node_modules/@nevuamarkets/poly-websockets/dist/modules/GroupSocket.js"(exports2) {
      "use strict";
      var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.GroupSocket = void 0;
      var ws_1 = __importDefault2((init_ws(), __toCommonJS(ws_exports)));
      var logger_1 = require_logger();
      var WebSocketSubscriptions_1 = require_WebSocketSubscriptions();
      var PolymarketWebSocket_1 = require_PolymarketWebSocket();
      var lodash_1 = __importDefault2(require_lodash());
      var ms_1 = __importDefault2(require_ms());
      var crypto_1 = (init_crypto(), __toCommonJS(crypto_exports));
      var CLOB_WSS_URL = "wss://ws-subscriptions-clob.polymarket.com/ws/market";
      var GroupSocket = class {
        constructor(group, limiter, bookCache, handlers) {
          this.group = group;
          this.limiter = limiter;
          this.bookCache = bookCache;
          this.handlers = handlers;
        }
        /**
         * Establish the websocket connection using the provided Bottleneck limiter.
         *
         */
        async connect() {
          if (this.group.assetIds.size === 0) {
            this.group.status = WebSocketSubscriptions_1.WebSocketStatus.CLEANUP;
            return;
          }
          try {
            logger_1.logger.info({
              message: "Connecting to CLOB WebSocket",
              groupId: this.group.groupId,
              assetIdsLength: this.group.assetIds.size
            });
            this.group.wsClient = await this.limiter.schedule({ priority: 0 }, async () => {
              const ws = new ws_1.default(CLOB_WSS_URL);
              ws.on("error", (err) => {
                logger_1.logger.warn({
                  message: "Error connecting to CLOB WebSocket",
                  error: err,
                  groupId: this.group.groupId,
                  assetIdsLength: this.group.assetIds.size
                });
              });
              return ws;
            });
          } catch (err) {
            this.group.status = WebSocketSubscriptions_1.WebSocketStatus.DEAD;
            throw err;
          }
          this.setupEventHandlers();
        }
        setupEventHandlers() {
          const group = this.group;
          const handlers = this.handlers;
          const currentWebSocket = group.wsClient;
          if (!currentWebSocket) {
            return;
          }
          const handleOpen = async () => {
            var _a;
            if (group.assetIds.size === 0) {
              group.status = WebSocketSubscriptions_1.WebSocketStatus.CLEANUP;
              return;
            }
            if (currentWebSocket !== group.wsClient) {
              logger_1.logger.warn({
                message: "handleOpen called for stale WebSocket instance",
                groupId: group.groupId
              });
              return;
            }
            if (currentWebSocket.readyState !== ws_1.default.OPEN) {
              logger_1.logger.warn({
                message: "handleOpen called but WebSocket is not in OPEN state",
                groupId: group.groupId,
                readyState: currentWebSocket.readyState
              });
              return;
            }
            group.status = WebSocketSubscriptions_1.WebSocketStatus.ALIVE;
            currentWebSocket.send(JSON.stringify({ assets_ids: Array.from(group.assetIds), type: "market" }));
            await ((_a = handlers.onWSOpen) === null || _a === void 0 ? void 0 : _a.call(handlers, group.groupId, Array.from(group.assetIds)));
            this.pingInterval = setInterval(() => {
              if (group.assetIds.size === 0) {
                clearInterval(this.pingInterval);
                group.status = WebSocketSubscriptions_1.WebSocketStatus.CLEANUP;
                return;
              }
              if (currentWebSocket !== group.wsClient) {
                clearInterval(this.pingInterval);
                return;
              }
              if (!currentWebSocket || currentWebSocket.readyState !== ws_1.default.OPEN) {
                clearInterval(this.pingInterval);
                group.status = WebSocketSubscriptions_1.WebSocketStatus.DEAD;
                return;
              }
              currentWebSocket.ping();
            }, (0, crypto_1.randomInt)((0, ms_1.default)("15s"), (0, ms_1.default)("25s")));
          };
          const handleMessage = async (data) => {
            var _a, _b;
            const messageStr = data.toString();
            if (messageStr === "PONG") {
              return;
            }
            let events = [];
            try {
              const parsedData = JSON.parse(messageStr);
              events = Array.isArray(parsedData) ? parsedData : [parsedData];
            } catch (err) {
              await ((_a = handlers.onError) === null || _a === void 0 ? void 0 : _a.call(handlers, new Error(`Not JSON: ${messageStr}`)));
              return;
            }
            events = lodash_1.default.filter(events, (event) => {
              if ((0, PolymarketWebSocket_1.isPriceChangeEvent)(event)) {
                return event.price_changes && event.price_changes.length > 0;
              }
              return lodash_1.default.size(event.asset_id) > 0;
            });
            const bookEvents = [];
            const lastTradeEvents = [];
            const tickEvents = [];
            const priceChangeEvents = [];
            for (const event of events) {
              if ((0, PolymarketWebSocket_1.isPriceChangeEvent)(event)) {
                const relevantChanges = event.price_changes.filter((price_change_item) => group.assetIds.has(price_change_item.asset_id));
                if (relevantChanges.length === 0) {
                  continue;
                }
                priceChangeEvents.push({
                  ...event,
                  price_changes: relevantChanges
                });
              } else {
                if (!group.assetIds.has(event.asset_id)) {
                  continue;
                }
                if ((0, PolymarketWebSocket_1.isBookEvent)(event)) {
                  bookEvents.push(event);
                } else if ((0, PolymarketWebSocket_1.isLastTradePriceEvent)(event)) {
                  lastTradeEvents.push(event);
                } else if ((0, PolymarketWebSocket_1.isTickSizeChangeEvent)(event)) {
                  tickEvents.push(event);
                } else {
                  await ((_b = handlers.onError) === null || _b === void 0 ? void 0 : _b.call(handlers, new Error(`Unknown event: ${JSON.stringify(event)}`)));
                }
              }
            }
            await this.handleBookEvents(bookEvents);
            await this.handleTickEvents(tickEvents);
            await this.handlePriceChangeEvents(priceChangeEvents);
            await this.handleLastTradeEvents(lastTradeEvents);
          };
          const handlePong = () => {
            group.groupId;
          };
          const handleError = (err) => {
            var _a;
            group.status = WebSocketSubscriptions_1.WebSocketStatus.DEAD;
            clearInterval(this.pingInterval);
            (_a = handlers.onError) === null || _a === void 0 ? void 0 : _a.call(handlers, new Error(`WebSocket error for group ${group.groupId}: ${err.message}`));
          };
          const handleClose = async (code, reason) => {
            var _a;
            group.status = WebSocketSubscriptions_1.WebSocketStatus.DEAD;
            clearInterval(this.pingInterval);
            await ((_a = handlers.onWSClose) === null || _a === void 0 ? void 0 : _a.call(handlers, group.groupId, code, (reason === null || reason === void 0 ? void 0 : reason.toString()) || ""));
          };
          currentWebSocket.removeAllListeners();
          currentWebSocket.on("open", handleOpen);
          currentWebSocket.on("message", handleMessage);
          currentWebSocket.on("pong", handlePong);
          currentWebSocket.on("error", handleError);
          currentWebSocket.on("close", handleClose);
          if (group.assetIds.size === 0) {
            group.status = WebSocketSubscriptions_1.WebSocketStatus.CLEANUP;
            return;
          }
        }
        async handleBookEvents(bookEvents) {
          var _a, _b;
          if (bookEvents.length) {
            for (const event of bookEvents) {
              this.bookCache.replaceBook(event);
            }
            await ((_b = (_a = this.handlers).onBook) === null || _b === void 0 ? void 0 : _b.call(_a, bookEvents));
          }
        }
        async handleTickEvents(tickEvents) {
          var _a, _b;
          if (tickEvents.length) {
            await ((_b = (_a = this.handlers).onTickSizeChange) === null || _b === void 0 ? void 0 : _b.call(_a, tickEvents));
          }
        }
        async handlePriceChangeEvents(priceChangeEvents) {
          var _a, _b, _c, _d;
          if (priceChangeEvents.length) {
            await ((_b = (_a = this.handlers).onPriceChange) === null || _b === void 0 ? void 0 : _b.call(_a, priceChangeEvents));
            for (const event of priceChangeEvents) {
              try {
                this.bookCache.upsertPriceChange(event);
              } catch (err) {
                logger_1.logger.debug({
                  message: `Skipping derived future price calculation price_change: book not found for asset`,
                  event,
                  error: err === null || err === void 0 ? void 0 : err.message
                });
                continue;
              }
              const assetIds = event.price_changes.map((price_change_item) => price_change_item.asset_id);
              for (const assetId of assetIds) {
                let spreadOver10Cents;
                try {
                  spreadOver10Cents = this.bookCache.spreadOver(assetId, 0.1);
                } catch (err) {
                  logger_1.logger.debug({
                    message: "Skipping derived future price calculation for price_change: error calculating spread",
                    asset_id: assetId,
                    event,
                    error: err === null || err === void 0 ? void 0 : err.message
                  });
                  continue;
                }
                if (!spreadOver10Cents) {
                  let newPrice;
                  try {
                    newPrice = this.bookCache.midpoint(assetId);
                  } catch (err) {
                    logger_1.logger.debug({
                      message: "Skipping derived future price calculation for price_change: error calculating midpoint",
                      asset_id: assetId,
                      event,
                      error: err === null || err === void 0 ? void 0 : err.message
                    });
                    continue;
                  }
                  const bookEntry = this.bookCache.getBookEntry(assetId);
                  if (!bookEntry) {
                    logger_1.logger.debug({
                      message: "Skipping derived future price calculation price_change: book not found for asset",
                      asset_id: assetId,
                      event
                    });
                    continue;
                  }
                  if (newPrice !== bookEntry.price) {
                    bookEntry.price = newPrice;
                    const priceUpdateEvent = {
                      asset_id: assetId,
                      event_type: "price_update",
                      triggeringEvent: event,
                      timestamp: event.timestamp,
                      book: { bids: bookEntry.bids, asks: bookEntry.asks },
                      price: newPrice,
                      midpoint: bookEntry.midpoint || "",
                      spread: bookEntry.spread || ""
                    };
                    await ((_d = (_c = this.handlers).onPolymarketPriceUpdate) === null || _d === void 0 ? void 0 : _d.call(_c, [priceUpdateEvent]));
                  }
                }
              }
            }
          }
        }
        async handleLastTradeEvents(lastTradeEvents) {
          var _a, _b, _c, _d;
          if (lastTradeEvents.length) {
            await ((_b = (_a = this.handlers).onLastTradePrice) === null || _b === void 0 ? void 0 : _b.call(_a, lastTradeEvents));
            for (const event of lastTradeEvents) {
              let spreadOver10Cents;
              try {
                spreadOver10Cents = this.bookCache.spreadOver(event.asset_id, 0.1);
              } catch (err) {
                logger_1.logger.debug({
                  message: "Skipping derived future price calculation for last_trade_price: error calculating spread",
                  asset_id: event.asset_id,
                  event,
                  error: err === null || err === void 0 ? void 0 : err.message
                });
                continue;
              }
              if (spreadOver10Cents) {
                const newPrice = parseFloat(event.price).toString();
                const bookEntry = this.bookCache.getBookEntry(event.asset_id);
                if (!bookEntry) {
                  logger_1.logger.debug({
                    message: "Skipping derived future price calculation last_trade_price: book not found for asset",
                    asset_id: event.asset_id,
                    event
                  });
                  continue;
                }
                if (newPrice !== bookEntry.price) {
                  bookEntry.price = newPrice;
                  const priceUpdateEvent = {
                    asset_id: event.asset_id,
                    event_type: "price_update",
                    triggeringEvent: event,
                    timestamp: event.timestamp,
                    book: { bids: bookEntry.bids, asks: bookEntry.asks },
                    price: newPrice,
                    midpoint: bookEntry.midpoint || "",
                    spread: bookEntry.spread || ""
                  };
                  await ((_d = (_c = this.handlers).onPolymarketPriceUpdate) === null || _d === void 0 ? void 0 : _d.call(_c, [priceUpdateEvent]));
                }
              }
            }
          }
        }
      };
      exports2.GroupSocket = GroupSocket;
    }
  });

  // node_modules/@nevuamarkets/poly-websockets/dist/WSSubscriptionManager.js
  var require_WSSubscriptionManager = __commonJS({
    "node_modules/@nevuamarkets/poly-websockets/dist/WSSubscriptionManager.js"(exports2) {
      "use strict";
      var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.WSSubscriptionManager = void 0;
      var ms_1 = __importDefault2(require_ms());
      var lodash_1 = __importDefault2(require_lodash());
      var bottleneck_1 = __importDefault2(require_lib());
      var PolymarketWebSocket_1 = require_PolymarketWebSocket();
      var GroupRegistry_1 = require_GroupRegistry();
      var OrderBookCache_1 = require_OrderBookCache();
      var GroupSocket_1 = require_GroupSocket();
      var logger_1 = require_logger();
      var BURST_LIMIT_PER_SECOND = 5;
      var DEFAULT_RECONNECT_AND_CLEANUP_INTERVAL_MS = (0, ms_1.default)("10s");
      var DEFAULT_MAX_MARKETS_PER_WS = 100;
      var WSSubscriptionManager = class {
        constructor(userHandlers, options2) {
          this.groupRegistry = new GroupRegistry_1.GroupRegistry();
          this.bookCache = new OrderBookCache_1.OrderBookCache();
          this.burstLimiter = (options2 === null || options2 === void 0 ? void 0 : options2.burstLimiter) || new bottleneck_1.default({
            reservoir: BURST_LIMIT_PER_SECOND,
            reservoirRefreshAmount: BURST_LIMIT_PER_SECOND,
            reservoirRefreshInterval: (0, ms_1.default)("1s"),
            maxConcurrent: BURST_LIMIT_PER_SECOND
          });
          this.reconnectAndCleanupIntervalMs = (options2 === null || options2 === void 0 ? void 0 : options2.reconnectAndCleanupIntervalMs) || DEFAULT_RECONNECT_AND_CLEANUP_INTERVAL_MS;
          this.maxMarketsPerWS = (options2 === null || options2 === void 0 ? void 0 : options2.maxMarketsPerWS) || DEFAULT_MAX_MARKETS_PER_WS;
          this.handlers = {
            onBook: async (events) => {
              await this.actOnSubscribedEvents(events, userHandlers.onBook);
            },
            onLastTradePrice: async (events) => {
              await this.actOnSubscribedEvents(events, userHandlers.onLastTradePrice);
            },
            onTickSizeChange: async (events) => {
              await this.actOnSubscribedEvents(events, userHandlers.onTickSizeChange);
            },
            onPriceChange: async (events) => {
              await this.actOnSubscribedEvents(events, userHandlers.onPriceChange);
            },
            onPolymarketPriceUpdate: async (events) => {
              await this.actOnSubscribedEvents(events, userHandlers.onPolymarketPriceUpdate);
            },
            onWSClose: userHandlers.onWSClose,
            onWSOpen: userHandlers.onWSOpen,
            onError: userHandlers.onError
          };
          this.burstLimiter.on("error", (err) => {
            var _a, _b;
            (_b = (_a = this.handlers).onError) === null || _b === void 0 ? void 0 : _b.call(_a, err);
          });
          setInterval(() => {
            this.reconnectAndCleanupGroups();
          }, this.reconnectAndCleanupIntervalMs);
        }
        /*
                Clears all WebSocket subscriptions and state.
        
                This will:
        
                1. Remove all subscriptions and groups
                2. Close all WebSocket connections
                3. Clear the order book cache
            */
        async clearState() {
          const previousGroups = await this.groupRegistry.clearAllGroups();
          for (const group of previousGroups) {
            this.groupRegistry.disconnectGroup(group);
          }
          this.bookCache.clear();
        }
        /*
                This function is called when:
                - a websocket event is received from the Polymarket WS
                - a price update event detected, either by after a 'last_trade_price' event or a 'price_change' event
                depending on the current bid-ask spread (see https://docs.polymarket.com/polymarket-learn/trading/how-are-prices-calculated)
        
                The user handlers will be called **ONLY** for assets that are actively subscribed to by any groups.
            */
        async actOnSubscribedEvents(events, action) {
          events = lodash_1.default.filter(events, (event) => {
            if ((0, PolymarketWebSocket_1.isPriceChangeEvent)(event)) {
              return event.price_changes.some((price_change_item) => {
                const groupIndices = this.groupRegistry.getGroupIndicesForAsset(price_change_item.asset_id);
                if (groupIndices.length > 1) {
                  logger_1.logger.warn({
                    message: "Found multiple groups for asset",
                    asset_id: price_change_item.asset_id,
                    group_indices: groupIndices
                  });
                }
                return groupIndices.length > 0;
              });
            }
            if ("asset_id" in event) {
              const groupIndices = this.groupRegistry.getGroupIndicesForAsset(event.asset_id);
              if (groupIndices.length > 1) {
                logger_1.logger.warn({
                  message: "Found multiple groups for asset",
                  asset_id: event.asset_id,
                  group_indices: groupIndices
                });
              }
              return groupIndices.length > 0;
            }
            return false;
          });
          await (action === null || action === void 0 ? void 0 : action(events));
        }
        /*
                Edits wsGroups: Adds new subscriptions.
        
                - Filters out assets that are already subscribed
                - Finds a group with capacity or creates a new one
                - Creates a new WebSocket client and adds it to the group
            */
        async addSubscriptions(assetIdsToAdd) {
          var _a, _b;
          try {
            const groupIdsToConnect = await this.groupRegistry.addAssets(assetIdsToAdd, this.maxMarketsPerWS);
            for (const groupId of groupIdsToConnect) {
              await this.createWebSocketClient(groupId, this.handlers);
            }
          } catch (error) {
            const msg = `Error adding subscriptions: ${error instanceof Error ? error.message : String(error)}`;
            await ((_b = (_a = this.handlers).onError) === null || _b === void 0 ? void 0 : _b.call(_a, new Error(msg)));
          }
        }
        /*
            Edits wsGroups: Removes subscriptions.
            The group will use the updated subscriptions when it reconnects.
            We do that because we don't want to miss events by reconnecting.
        */
        async removeSubscriptions(assetIdsToRemove) {
          var _a, _b;
          try {
            await this.groupRegistry.removeAssets(assetIdsToRemove, this.bookCache);
          } catch (error) {
            const errMsg = `Error removing subscriptions: ${error instanceof Error ? error.message : String(error)}`;
            await ((_b = (_a = this.handlers).onError) === null || _b === void 0 ? void 0 : _b.call(_a, new Error(errMsg)));
          }
        }
        /*
                This function runs periodically and:
        
                - Tries to reconnect groups that have assets and are disconnected
                - Cleans up groups that have no assets
            */
        async reconnectAndCleanupGroups() {
          var _a, _b;
          try {
            const reconnectIds = await this.groupRegistry.getGroupsToReconnectAndCleanup();
            for (const groupId of reconnectIds) {
              await this.createWebSocketClient(groupId, this.handlers);
            }
          } catch (err) {
            await ((_b = (_a = this.handlers).onError) === null || _b === void 0 ? void 0 : _b.call(_a, err));
          }
        }
        async createWebSocketClient(groupId, handlers) {
          var _a, _b;
          const group = this.groupRegistry.findGroupById(groupId);
          if (!group) {
            await ((_a = handlers.onError) === null || _a === void 0 ? void 0 : _a.call(handlers, new Error(`Group ${groupId} not found in registry`)));
            return;
          }
          const groupSocket = new GroupSocket_1.GroupSocket(group, this.burstLimiter, this.bookCache, handlers);
          try {
            await groupSocket.connect();
          } catch (error) {
            const errorMessage = `Error creating WebSocket client for group ${groupId}: ${error instanceof Error ? error.message : String(error)}`;
            await ((_b = handlers.onError) === null || _b === void 0 ? void 0 : _b.call(handlers, new Error(errorMessage)));
          }
        }
      };
      exports2.WSSubscriptionManager = WSSubscriptionManager;
    }
  });

  // node_modules/@nevuamarkets/poly-websockets/dist/index.js
  var require_dist = __commonJS({
    "node_modules/@nevuamarkets/poly-websockets/dist/index.js"(exports2) {
      "use strict";
      var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar2 = exports2 && exports2.__exportStar || function(m, exports3) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding2(exports3, m, p);
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.WSSubscriptionManager = void 0;
      var WSSubscriptionManager_1 = require_WSSubscriptionManager();
      Object.defineProperty(exports2, "WSSubscriptionManager", { enumerable: true, get: function() {
        return WSSubscriptionManager_1.WSSubscriptionManager;
      } });
      __exportStar2(require_PolymarketWebSocket(), exports2);
      __exportStar2(require_WebSocketSubscriptions(), exports2);
    }
  });

  // background.js
  var polyManager = null;
  var subscribedAssets = /* @__PURE__ */ new Set();
  async function sendTabMessage(tabId, message) {
    try {
      await chrome.tabs.sendMessage(tabId, message);
    } catch (err) {
      const errorMessage = err.message?.toLowerCase() || "";
      if (!errorMessage.includes("receiving end does not exist") && !errorMessage.includes("could not establish connection")) {
        console.error("Nevua: Error sending message to tab:", err);
      }
    }
  }
  async function broadcastToTabs(senderTabId, message) {
    const tabs = await chrome.tabs.query({ url: "https://polymarket.com/*" });
    await Promise.all(tabs.map((tab) => {
      if (senderTabId === null || tab.id !== senderTabId) {
        return sendTabMessage(tab.id, message);
      }
    }));
  }
  async function getPolyManager() {
    if (polyManager) return polyManager;
    try {
      const mod = await Promise.resolve().then(() => __toESM(require_dist()));
      polyManager = new mod.WSSubscriptionManager({
        onPolymarketPriceUpdate: handlePriceUpdates,
        onWSOpen: (groupId, assetIds) => {
          return Promise.resolve();
        },
        onWSClose: (groupId, code, reason) => {
          return Promise.resolve();
        },
        onError: (error) => {
          return Promise.resolve();
        }
      });
      return polyManager;
    } catch (err) {
      console.error("Nevua: Failed to initialise websocket manager:", err);
      return null;
    }
  }
  async function ensureSubscriptions(needed) {
    needed = new Set(needed);
    const toAdd = [...needed].filter((id) => !subscribedAssets.has(id));
    const toRemove = [...subscribedAssets].filter((id) => !needed.has(id));
    if (toAdd.length === 0 && toRemove.length === 0) return;
    const mgr = await getPolyManager();
    if (!mgr) return;
    try {
      if (toAdd.length) {
        await mgr.addSubscriptions(toAdd);
        toAdd.forEach((id) => subscribedAssets.add(id));
      }
      if (toRemove.length) {
        await mgr.removeSubscriptions(toRemove);
        toRemove.forEach((id) => subscribedAssets.delete(id));
      }
    } catch (err) {
      console.error("Nevua: Subscription update failed:", err);
    }
  }
  async function handlePriceUpdates(events) {
    await processAlertsForPriceUpdates(events);
    const tabs = await chrome.tabs.query({ url: "https://polymarket.com/*" });
    await Promise.all(tabs.map(
      (tab) => sendTabMessage(tab.id, {
        type: "price_updates",
        events
      })
    ));
  }
  async function processAlertsForPriceUpdates(events) {
    try {
      const result = await chrome.storage.local.get(["polymarket_alerts"]);
      const alerts = result.polymarket_alerts || [];
      const now = Date.now();
      const THIRTY_MIN = 30 * 60 * 1e3;
      let alertsChanged = false;
      for (const ev of events) {
        const price = parseFloat(ev.price) * 100;
        const assetId = ev.asset_id;
        for (const alert of alerts) {
          if (alert.status !== "Active") continue;
          if (alert.clobtokenId !== assetId) continue;
          const meetsCondition = alert.priceAlert === "Over" && price >= alert.targetPrice || alert.priceAlert === "Under" && price <= alert.targetPrice;
          if (!meetsCondition) continue;
          const canNotify = alert.trigger === "One Time" || alert.trigger === "Recurring every 30 minutes" && now - alert.lastTriggeredAtMS >= THIRTY_MIN;
          if (!canNotify) continue;
          const notificationId = "polymarket-alert-" + Date.now();
          try {
            await chrome.notifications.create(notificationId, {
              type: "basic",
              iconUrl: chrome.runtime.getURL("icon128.png"),
              title: "\u{1F4C8} Polymarket Price Alert",
              message: `'${alert.marketQuestion}' price is now ${price.toFixed(2)}\xA2 [${alert.outcomeName}]`,
              silent: false
            });
          } catch (err) {
            console.error("Nevua: Failed to create notification:", err);
          }
          alert.lastTriggeredAtMS = now;
          alert.triggerCount += 1;
          if (alert.trigger === "One Time") {
            alert.status = "Paused";
          }
          alertsChanged = true;
        }
      }
      if (alertsChanged) {
        await chrome.storage.local.set({ "polymarket_alerts": alerts });
        const needed = alerts.filter((alert) => alert.status === "Active" && !alert.closed).map((alert) => alert.clobtokenId);
        await ensureSubscriptions(needed);
        const activeCount = alerts.filter((alert) => alert.status === "Active" && !alert.closed).length;
        updateBadge(activeCount);
        await broadcastToTabs(null, {
          type: "alert_update",
          alerts
        });
      }
    } catch (err) {
      console.error("Nevua: Failed to process alerts for price updates:", err);
    }
  }
  function loadAndUpdateBadge() {
    chrome.storage.local.get(["polymarket_alerts"], (result) => {
      if (chrome.runtime.lastError) {
        console.error("Nevua: Error loading alerts for badge:", chrome.runtime.lastError);
        return;
      }
      const savedAlerts = result.polymarket_alerts || [];
      const activeCount = savedAlerts.filter((alert) => alert.status === "Active" && !alert.closed).length;
      updateBadge(activeCount);
    });
  }
  async function initializeAlerts() {
    try {
      const result = await chrome.storage.local.get(["polymarket_alerts"]);
      const savedAlerts = result.polymarket_alerts || [];
      const needed = savedAlerts.filter((alert) => alert.status === "Active" && !alert.closed).map((alert) => alert.clobtokenId);
      if (needed.length > 0) {
        console.log(`Nevua: Initializing ${needed.length} alert subscriptions`);
        await ensureSubscriptions(needed);
      }
    } catch (err) {
      console.error("Nevua: Failed to initialize alerts:", err);
    }
  }
  chrome.runtime.onInstalled.addListener(() => {
    chrome.notifications.getAll((notifications) => {
      Object.keys(notifications).forEach((id) => {
        if (id.startsWith("polymarket-alert-")) {
          chrome.notifications.clear(id);
        }
      });
    });
    loadAndUpdateBadge();
    initializeAlerts();
    startMarketClosureChecker();
  });
  chrome.runtime.onStartup.addListener(() => {
    loadAndUpdateBadge();
    initializeAlerts();
    startMarketClosureChecker();
  });
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === "local" && changes.polymarket_alerts) {
      const newAlerts = changes.polymarket_alerts.newValue || [];
      const activeCount = newAlerts.filter((alert) => alert.status === "Active" && !alert.closed).length;
      updateBadge(activeCount);
      const needed = newAlerts.filter((alert) => alert.status === "Active" && !alert.closed).map((alert) => alert.clobtokenId);
      ensureSubscriptions(needed);
    }
  });
  initializeAlerts();
  startMarketClosureChecker();
  var RateLimiter = class {
    constructor(requestsPerSecond) {
      this.requestsPerSecond = requestsPerSecond;
      this.interval = 1e3 / requestsPerSecond;
      this.lastRequestTime = 0;
    }
    async throttle() {
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequestTime;
      if (timeSinceLastRequest < this.interval) {
        const delay = this.interval - timeSinceLastRequest;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      this.lastRequestTime = Date.now();
    }
  };
  var marketChecker = new RateLimiter(2);
  async function checkMarketClosure(conditionId) {
    try {
      await marketChecker.throttle();
      const response = await fetch(`https://clob.polymarket.com/markets/${conditionId}`);
      if (!response.ok) {
        console.error(`Nevua: Failed to fetch market ${conditionId}: ${response.status}`);
        return null;
      }
      const data = await response.json();
      if (!data) {
        console.error(`Nevua: No data returned for market ${conditionId}`);
        return null;
      }
      return {
        conditionId: data.condition_id,
        closed: data.closed,
        tokens: data.tokens
      };
    } catch (error) {
      console.error(`Nevua: Error checking market ${conditionId}:`, error);
      return null;
    }
  }
  async function processClosedMarkets() {
    try {
      console.log("Nevua: Checking for closed markets...");
      const result = await chrome.storage.local.get(["polymarket_alerts"]);
      const alerts = result.polymarket_alerts || [];
      const openAlerts = alerts.filter((alert) => !alert.closed && alert.conditionId);
      if (openAlerts.length === 0) {
        console.log("Nevua: No open market alerts to check");
        return;
      }
      console.log(`Nevua: Checking ${openAlerts.length} open markets for closure`);
      let alertsChanged = false;
      const alertsToRemove = [];
      for (const alert of openAlerts) {
        const marketData = await checkMarketClosure(alert.conditionId);
        if (!marketData) {
          continue;
        }
        if (marketData.closed) {
          try {
            const tokens = marketData.tokens;
            if (!tokens || !Array.isArray(tokens) || tokens.length === 0) {
              console.log(`Nevua: Removing alert for market ${alert.conditionId} due to invalid token data`);
              alertsToRemove.push(alert.id);
              continue;
            }
            let winningToken = tokens.find((token) => token.winner === true);
            if (!winningToken) {
              winningToken = tokens.reduce(
                (highest, current) => current.price > highest.price ? current : highest
              );
            }
            alert.closed = true;
            alert.outcome = winningToken.outcome;
            alert.status = "Paused";
            alertsChanged = true;
            const notificationId = "polymarket-closure-" + Date.now();
            try {
              await chrome.notifications.create(notificationId, {
                type: "basic",
                iconUrl: chrome.runtime.getURL("icon128.png"),
                title: "\u{1F514} Market Closed",
                message: `'${alert.marketQuestion}' has been closed. Outcome: ${alert.outcome}`,
                silent: false
              });
            } catch (err) {
              console.error("Nevua: Failed to create market closure notification:", err);
            }
            console.log(`Nevua: Market ${alert.conditionId} closed with outcome: ${alert.outcome}`);
          } catch (error) {
            console.error(`Nevua: Error parsing tokens for market ${alert.conditionId}:`, error);
            alertsToRemove.push(alert.id);
          }
        }
      }
      if (alertsToRemove.length > 0) {
        for (const alertId of alertsToRemove) {
          const index = alerts.findIndex((a) => a.id === alertId);
          if (index !== -1) {
            alerts.splice(index, 1);
            alertsChanged = true;
          }
        }
      }
      if (alertsChanged) {
        await chrome.storage.local.set({ "polymarket_alerts": alerts });
        const needed = alerts.filter((alert) => alert.status === "Active" && !alert.closed).map((alert) => alert.clobtokenId);
        await ensureSubscriptions(needed);
        const activeCount = alerts.filter((alert) => alert.status === "Active" && !alert.closed).length;
        updateBadge(activeCount);
        await broadcastToTabs(null, {
          type: "alert_update",
          alerts
        });
        console.log(`Nevua: Updated ${alertsChanged ? "some" : "no"} alerts for market closures`);
      }
    } catch (err) {
      console.error("Nevua: Failed to process closed markets:", err);
    }
  }
  function startMarketClosureChecker() {
    processClosedMarkets();
    setInterval(processClosedMarkets, 10 * 60 * 1e3);
    console.log("Nevua: Market closure checker started (runs every 10 minutes)");
  }
  chrome.notifications.onClicked.addListener((notificationId) => {
    chrome.notifications.clear(notificationId);
  });
  chrome.notifications.onClosed.addListener((notificationId, byUser) => {
  });
  function updateBadge(count) {
    if (count > 0) {
      chrome.action.setBadgeText({ text: count.toString() });
      chrome.action.setBadgeBackgroundColor({ color: "#3b82f6" });
      chrome.action.setBadgeTextColor({ color: "#ffffff" });
    } else {
      chrome.action.setBadgeText({ text: "" });
    }
  }
  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.type === "notify") {
      sendResponse({ ok: true });
      return false;
    }
    if (req.type === "update_subscriptions") {
      ensureSubscriptions(req.needed);
      sendResponse({ ok: true });
      return false;
    }
    if (req.type === "alert_updated") {
      const activeCount = req.alerts.filter((alert) => alert.status === "Active" && !alert.closed).length;
      updateBadge(activeCount);
      const needed = req.alerts.filter((alert) => alert.status === "Active" && !alert.closed).map((alert) => alert.clobtokenId);
      ensureSubscriptions(needed);
      if (sender.tab) {
        broadcastToTabs(sender.tab.id, {
          type: "alert_update",
          alerts: req.alerts
        });
      } else {
        broadcastToTabs(null, {
          type: "alert_update",
          alerts: req.alerts
        });
      }
      sendResponse({ ok: true });
      return false;
    }
    if (req.type === "update_badge") {
      updateBadge(req.count);
      sendResponse({ ok: true });
      return false;
    }
  });
})();
/*! Bundled license information:

lodash/lodash.js:
  (**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
//# sourceMappingURL=background.js.map
