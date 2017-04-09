require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/calculate.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateEngagement = exports.averageLikes = exports.getLikes = exports.imagesForUser = exports.getRecentImages = exports.userForHandle = exports.createUserProcessor = exports.userSearch = undefined;

var _ramda = __webpack_require__(5);

var _ramda2 = _interopRequireDefault(_ramda);

var _axios = __webpack_require__(2);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var client = _axios2.default.create({
  baseURL: 'https://api.instagram.com/v1',
  params: { access_token: process.env.INSTAGRAM_TOKEN } // eslint-disable-line camelcase
});

var userSearch = exports.userSearch = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(q) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', client.get('/users/search', { params: { q: q } }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function userSearch(_x) {
    return _ref.apply(this, arguments);
  };
}();
var createUserProcessor = exports.createUserProcessor = function createUserProcessor(handle) {
  return _ramda2.default.find(_ramda2.default.propEq('username', handle));
};
var getUser = function getUser(id) {
  return client.get('/users/' + id);
};
var userForHandle = exports.userForHandle = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(h) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', _ramda2.default.pipeP(userSearch, _ramda2.default.path(['data', 'data']), createUserProcessor(h), _ramda2.default.prop('id'), getUser, _ramda2.default.path(['data', 'data']))(h));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function userForHandle(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getRecentImages = exports.getRecentImages = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', client.get('/users/' + id + '/media/recent'));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getRecentImages(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var imagesForUser = exports.imagesForUser = _ramda2.default.pipeP(function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(o) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', _ramda2.default.prop('id', o));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}(), getRecentImages, _ramda2.default.path(['data', 'data']));

var getLikes = exports.getLikes = _ramda2.default.map(_ramda2.default.path(['likes', 'count']));
var averageLikes = exports.averageLikes = _ramda2.default.pipe(getLikes, _ramda2.default.mean);
var calculateEngagement = exports.calculateEngagement = function calculateEngagement(user) {
  return _ramda2.default.pipe(averageLikes, _ramda2.default.divide(_ramda2.default.__, user.counts.followed_by));
};

exports.default = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(handle) {
    var user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return userForHandle(handle);

          case 2:
            user = _context5.sent;
            return _context5.abrupt('return', _ramda2.default.pipeP(imagesForUser, calculateEngagement(user))(user));

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x5) {
    return _ref5.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/main.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _micro = __webpack_require__(0);

var _micro2 = _interopRequireDefault(_micro);

var _ramda = __webpack_require__(5);

var _ramda2 = _interopRequireDefault(_ramda);

var _url = __webpack_require__("./src/url.js");

var _url2 = _interopRequireDefault(_url);

var _calculate = __webpack_require__("./src/calculate.js");

var _calculate2 = _interopRequireDefault(_calculate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = _ramda2.default.pipeP(function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(o) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', _ramda2.default.prop('url', o));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}(), _url2.default, _calculate2.default, _ramda2.default.toString);

var srv = (0, _micro2.default)(app);
srv.listen(3000, function () {
  return console.log('Listening on port 3000');
});
exports.default = srv;

/***/ }),

/***/ "./src/url.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compact = exports.splitPath = exports.getPath = undefined;

var _urlParse = __webpack_require__(3);

var _urlParse2 = _interopRequireDefault(_urlParse);

var _ramda = __webpack_require__(5);

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPath = exports.getPath = function getPath(url) {
  return new _urlParse2.default(url).pathname;
};
var splitPath = exports.splitPath = _ramda2.default.split('/');
var compact = exports.compact = _ramda2.default.filter(_ramda2.default.length);
exports.default = _ramda2.default.pipe(getPath, splitPath, compact, _ramda2.default.head);

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = require("micro");

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("url-parse");

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__("./src/main.js");


/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map