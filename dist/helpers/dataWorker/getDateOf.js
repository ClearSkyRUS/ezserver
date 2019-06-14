"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var getDateOf = function getDateOf(days) {

	var date = new Date();
	date.setHours(4, 0, 0, 0);
	date.setDate(date.getDate() + days);

	return date;
};

exports.default = getDateOf;