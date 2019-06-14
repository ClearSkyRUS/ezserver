'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getDate(date) {
  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  return dd + "." + mm;
}

exports.default = getDate;