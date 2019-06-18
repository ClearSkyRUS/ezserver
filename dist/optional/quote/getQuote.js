'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  host: 'api.forismatic.com',
  path: '/api/1.0/?method=getQuote&key=457653&format=json&lang=ru'
};

var getQuote = function getQuote(callback) {
  sendRequest(function (res) {
    if (res.errno) return callback(res);

    var output = '';
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      output += chunk;
    });

    res.on('end', function () {
      var obj = JSON.parse(output);
      callback(obj);
    });
  });
};

var sendRequest = function sendRequest(callback) {
  var req = _https2.default.request(options, callback);
  req.on('error', function (err) {
    callback(err);
  });
  req.end();
};

exports.default = getQuote;