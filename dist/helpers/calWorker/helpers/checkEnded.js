'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getCountNotEnded = require('./getCountNotEnded');

var _getCountNotEnded2 = _interopRequireDefault(_getCountNotEnded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkEnded(day) {
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {

		for (var _iterator = day.meals[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var meal = _step.value;
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = meal.meal[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var dishs = _step2.value;

					if ((0, _getCountNotEnded2.default)(dishs.dishs) === 0) dishs.ended = setParams(dishs, dishs.dishs);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			if ((0, _getCountNotEnded2.default)(meal.meal) === 0) meal.ended = setParams(meal, meal.meal);
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

	if ((0, _getCountNotEnded2.default)(day.meals) === 0) day.ended = setParams(day, day.meals);

	return day;
}

function setParams(item, array) {

	var cal = array.reduce(function (cal, arrItem) {
		return cal + arrItem.cal;
	}, 0);
	var prot = array.reduce(function (prot, arrItem) {
		return prot + arrItem.prot;
	}, 0);
	var fat = array.reduce(function (fat, arrItem) {
		return fat + arrItem.fat;
	}, 0);
	var carb = array.reduce(function (carb, arrItem) {
		return carb + arrItem.carb;
	}, 0);
	var price = array.reduce(function (price, arrItem) {
		return price + arrItem.price;
	}, 0);
	var params = { cal: cal, prot: prot, fat: fat, carb: carb, price: price };
	for (var key in params) {
		item[key] = params[key];
	}return true;
}

exports.default = checkEnded;