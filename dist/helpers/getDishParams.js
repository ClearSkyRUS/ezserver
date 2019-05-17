"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function getDishParams(dishs) {
	var dishsObj = [];
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = dishs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var dish = _step.value;

			var cal = dish.productslist.reduce(function (cal, productItem) {
				return cal + (productItem.product.prot * 4.1 + productItem.product.fat * 4.1 + productItem.product.carb * 9.29) * (productItem.gramm / 100);
			}, 0);
			var gramms = dish.productslist.reduce(function (gramms, productItem) {
				return gramms + productItem.gramm;
			}, 0);
			var prot = dish.productslist.reduce(function (prot, productItem) {
				return prot + productItem.product.prot * (productItem.gramm / 100);
			}, 0);
			var fat = dish.productslist.reduce(function (fat, productItem) {
				return fat + productItem.product.fat * (productItem.gramm / 100);
			}, 0);
			var carb = dish.productslist.reduce(function (carb, productItem) {
				return carb + productItem.product.carb * (productItem.gramm / 100);
			}, 0);
			var price = dish.productslist.reduce(function (price, productItem) {
				return price + productItem.product.price * (productItem.gramm / 1000);
			}, 0);
			var params = { cal: cal, gramms: gramms, prot: prot, fat: fat, carb: carb, price: price };
			dish = _extends({}, dish._doc, params);
			dishsObj.push(dish);
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return dishsObj;
}

exports.default = getDishParams;