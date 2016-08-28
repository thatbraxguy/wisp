/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _db = __webpack_require__(6);

	var _db2 = _interopRequireDefault(_db);

	var _wispStore = __webpack_require__(9);

	var _wispStore2 = _interopRequireDefault(_wispStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../styles/main.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	// init google maps

	// switch callback to instead create a node on the map!
	_wispStore2.default.addListener('child_added', function (data) {
	  return console.log(data);
	});

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _firebase = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"firebase\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _firebase2 = _interopRequireDefault(_firebase);

	var _config = __webpack_require__(7);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_firebase2.default.initializeApp(_config2.default.firebase);

	var database = _firebase2.default.database();

	exports.default = database;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _firebase = __webpack_require__(8);

	var _firebase2 = _interopRequireDefault(_firebase);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    firebase: _firebase2.default
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  apiKey: '',
	  databaseURL: 'https://wisp-ced97.firebaseio.com'
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _db = __webpack_require__(6);

	var _db2 = _interopRequireDefault(_db);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var listeners = {};
	var wisps = _db2.default.ref('wisp');

	var callListeners = function callListeners(event, data) {
	  if (listeners[event]) {
	    listeners[event].forEach(function (x) {
	      return x(data);
	    });
	  }
	};

	var addListener = function addListener(event, cb) {
	  listeners[event] = listeners[event] || [];
	  listeners[event].push(cb);
	};

	wisps.on('child_added', function (snapshot) {
	  return callListeners('child_added', snapshot.val());
	});

	exports.default = {
	  addListener: addListener,
	  push: function push(data) {
	    return wisps.push(data);
	  }
	};

/***/ }
/******/ ]);