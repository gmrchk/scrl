(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Scrl"] = factory();
	else
		root["Scrl"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _index2.default; // this is here for webpack to expose Scrl as window.Scrl

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scrl = function () {
	function Scrl(options) {
		var _this = this;

		_classCallCheck(this, Scrl);

		this._raf = null;
		this._positionY = 0;
		this._velocityY = 0;
		this._targetPositionY = 0;
		this._targetPositionYWithOffset = 0;
		this._directionY = 0;

		this.scrollTo = function (offsetOrElement) {
			if (offsetOrElement && offsetOrElement.nodeType) {
				// the offset is a HTMLElement
				_this._targetPositionY = _this._getTargetPositionFromElement(offsetOrElement);
			} else if (parseInt(offsetOrElement) === offsetOrElement) {
				// the offset is a number
				_this._targetPositionY = Math.round(offsetOrElement);
			} else {
				console.error('Argument must be a number or HTMLElement.');
				return;
			}

			// don't animate beyond the available height
			_this._targetPositionY = Math.min(_this._targetPositionY, _this._getMaximumPossibleScrollPosition());

			// calculated required values
			_this._positionY = _this._getScrollPosition();
			_this._directionY = _this._positionY > _this._targetPositionY ? -1 : 1;
			_this._targetPositionYWithOffset = _this._targetPositionY + _this._directionY;
			_this._velocityY = 0;

			if (_this._positionY !== _this._targetPositionY) {
				// start animation
				_this.options.onStart();
				_this._animate();
			} else {
				// page is already at the position
				_this.options.onAlreadyAtPositions();
			}
		};

		this._animate = function () {
			var distance = _this._getUpdatedDistance();
			_this._render();

			if (_this._directionY === 1 && _this._targetPositionY > _this._positionY || _this._directionY === -1 && _this._targetPositionY < _this._positionY) {
				// calculate next position
				_this._raf = requestAnimationFrame(_this._animate);
				_this.options.onTick();
			} else {
				// finish and set position to the final position
				_this._positionY = _this._targetPositionY;
				_this._render();
				_this._raf = null;
				_this.options.onTick();
				_this.options.onEnd();
				// this.triggerEvent('scrollDone')
			}
		};

		this._getUpdatedDistance = function () {
			var distance = _this._targetPositionYWithOffset - _this._positionY;
			var attraction = distance * _this.options.acceleration;

			_this._velocityY += attraction;

			_this._velocityY *= _this.options.friction;
			_this._positionY += _this._velocityY;

			return Math.abs(distance);
		};

		this._render = function () {
			_this.options.target.scrollTo(0, _this._positionY);
		};

		// default options
		var defaults = {
			onAlreadyAtPositions: function onAlreadyAtPositions() {},
			onCancel: function onCancel() {},
			onEnd: function onEnd() {},
			onStart: function onStart() {},
			onTick: function onTick() {},
			friction: 0.7, // 1 - .3
			acceleration: 0.04,
			target: window
		};

		// merge options
		this.options = _extends({}, defaults, options);

		this.validateScrollTarget();

		// set reverse friction
		if (options && options.friction) {
			this.options.friction = 1 - options.friction;
		}

		// register listener for cancel on wheel event
		window.addEventListener('mousewheel', function (event) {
			if (_this._raf) {
				_this.options.onCancel();
				cancelAnimationFrame(_this._raf);
				_this._raf = null;
			}
		}, {
			passive: true
		});
	}

	/**
  * Validates options.target
  */


	_createClass(Scrl, [{
		key: 'validateScrollTarget',
		value: function validateScrollTarget() {
			if (this.options.target == null) {
				throw new Error("[scrl] options.target can't be null");
			}
			if (!this._targetIsWindow() && !(this.options.target instanceof Element)) {
				throw new Error('[srcl] options.target expects either window or an HTMLElement. Given value:', options.target);
			}
		}

		/**
   * scroll towards a number or HTMLElement
   * @param {number|HTMLElement} offsetOrElement
   * @returns
   */


		/**
   * Animate the scroll position
   */


		/**
   * Updates and returns the distance the scroll has still to go
   * @returns float
   */


		/**
   * Apply the current scroll position to either the window or the HTMLElement
   */

	}, {
		key: '_targetIsWindow',


		/**
   * Checks if an the given options.target is equal to window
   * @see https://stackoverflow.com/a/3099796/586823
   * @returns boolean
   */
		value: function _targetIsWindow() {
			return this.options.target.self === window;
		}

		/**
   * Get the target scroll position for a given HTMLElement
   * @param {window|HTMLElement} targetElement
   * @returns float
   */

	}, {
		key: '_getTargetPositionFromElement',
		value: function _getTargetPositionFromElement(targetElement) {
			if (this._targetIsWindow()) {
				return Math.round(targetElement.getBoundingClientRect().top + window.pageYOffset);
			}
			return targetElement.getBoundingClientRect().top - this.options.target.getBoundingClientRect().top + this.options.target.scrollTop;
		}

		/**
   * Get the maximum scroll position
   * @returns float
   */

	}, {
		key: '_getMaximumPossibleScrollPosition',
		value: function _getMaximumPossibleScrollPosition() {
			if (this._targetIsWindow()) {
				return document.documentElement.scrollHeight - window.innerHeight;
			}
			return this.options.target.scrollHeight - this.options.target.offsetHeight;
		}

		/**
   * Returns the target's current scroll position
   * @returns float
   */

	}, {
		key: '_getScrollPosition',
		value: function _getScrollPosition() {
			return this._targetIsWindow() ? window.pageYOffset : this.options.target.scrollTop;
		}
	}]);

	return Scrl;
}();

exports.default = Scrl;

/***/ })
/******/ ]);
});