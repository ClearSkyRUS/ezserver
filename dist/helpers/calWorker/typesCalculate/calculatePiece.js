"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getDishParams = require("../helpers/getDishParams");

var _getDishParams2 = _interopRequireDefault(_getDishParams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculatePiece(day, calTarget) {
	var calNeeded = calTarget;
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = day.meals[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var meal = _step.value;

			var NeedForMeal = calNeeded * (meal.target / 100);
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = meal.meal[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var dishs = _step2.value;
					var _iteratorNormalCompletion3 = true;
					var _didIteratorError3 = false;
					var _iteratorError3 = undefined;

					try {
						for (var _iterator3 = dishs.dishs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
							var dish = _step3.value;

							if (dish.dish.type.unit === "Шт" && !dish.ended) {
								var NeedForDish = NeedForMeal * (dish.target / 100);
								if (dish.cal !== 0) var dishParams = (0, _getDishParams2.default)(dish.dish.productslist);
								var count = 1;
								var gram = dishParams.gramms;
								var cal = dishParams.cal * count;
								while (NeedForDish > cal) {
									count += 0.5;
									gram = dishParams.gramms * count;
									cal = dishParams.cal * count;
								}

								if (cal - NeedForDish > NeedForDish - dishParams.cal * (count - 0.5)) count -= 0.5;

								if (count < parseFloat(dish.dish.type.min)) count = parseFloat(dish.dish.type.min);

								if (count > parseFloat(dish.dish.type.max)) count = parseFloat(dish.dish.type.max);

								dish.gram = dishParams.gramms * count;
								dish.count = count;

								for (var key in dishParams) {
									dish[key] = dishParams[key] * count;
								}

								calTarget = calTarget - dish.cal;

								dish.ended = true;
							}
						}
					} catch (err) {
						_didIteratorError3 = true;
						_iteratorError3 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion3 && _iterator3.return) {
								_iterator3.return();
							}
						} finally {
							if (_didIteratorError3) {
								throw _iteratorError3;
							}
						}
					}
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

	return calTarget;
}

exports.default = calculatePiece;