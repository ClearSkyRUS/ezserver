'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getQuote = require('./quote/getQuote');

Object.defineProperty(exports, 'getQuote', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getQuote).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }