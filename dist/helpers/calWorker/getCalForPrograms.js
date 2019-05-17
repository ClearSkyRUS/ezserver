"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _calculateDay = require("./calculateDay");

var _calculateDay2 = _interopRequireDefault(_calculateDay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCalForPrograms(programs, days) {
	var mPrograms = [];
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = programs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var program = _step.value;

			var mProgram = { "_id": program._id, "title": program.title, "type": program.type, "public": program.public, "settings": program.settings, "options": [] };
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = program.options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var option = _step2.value;

					var optionObj = null;
					if (option._doc) optionObj = option._doc;else optionObj = option;

					var mOption = _extends({}, optionObj, { "days": [] });
					var _iteratorNormalCompletion3 = true;
					var _didIteratorError3 = false;
					var _iteratorError3 = undefined;

					try {
						for (var _iterator3 = days[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
							var day = _step3.value;

							var mDay = {
								"title": day.title,
								"target": option.cal,
								"ended": false,
								"meals": []
							};
							var _iteratorNormalCompletion4 = true;
							var _didIteratorError4 = false;
							var _iteratorError4 = undefined;

							try {
								for (var _iterator4 = day.meals[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
									var meal = _step4.value;

									if (program.settings.find(function (o) {
										return o.title === meal.title;
									}).auto || program.settings.find(function (o) {
										return o.title === meal.title;
									}).types.length !== 0) {
										var mMeal = {
											"title": meal.title,
											"target": meal.procent,
											"ended": false,
											"meal": []
										};
										var _iteratorNormalCompletion5 = true;
										var _didIteratorError5 = false;
										var _iteratorError5 = undefined;

										try {
											for (var _iterator5 = meal.meal[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
												var dishs = _step5.value;

												if (program.settings.find(function (o) {
													return o.title === meal.title;
												}).auto && dishs.main || program.settings.find(function (o) {
													return o.title === meal.title;
												}).types.indexOf(dishs.type) !== -1) {
													var mDishs = {
														"type": dishs.type,
														"ended": false,
														"dishs": []
													};
													var _iteratorNormalCompletion6 = true;
													var _didIteratorError6 = false;
													var _iteratorError6 = undefined;

													try {
														for (var _iterator6 = dishs.dishs[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
															var dish = _step6.value;

															var mDish = {
																"dish": dish.dish,
																"target": dish.procent,
																"ended": false
															};
															mDishs.dishs.push(mDish);
														}
													} catch (err) {
														_didIteratorError6 = true;
														_iteratorError6 = err;
													} finally {
														try {
															if (!_iteratorNormalCompletion6 && _iterator6.return) {
																_iterator6.return();
															}
														} finally {
															if (_didIteratorError6) {
																throw _iteratorError6;
															}
														}
													}

													mMeal.meal.push(mDishs);
												}
											}
										} catch (err) {
											_didIteratorError5 = true;
											_iteratorError5 = err;
										} finally {
											try {
												if (!_iteratorNormalCompletion5 && _iterator5.return) {
													_iterator5.return();
												}
											} finally {
												if (_didIteratorError5) {
													throw _iteratorError5;
												}
											}
										}

										mDay.meals.push(mMeal);
									}
								}
							} catch (err) {
								_didIteratorError4 = true;
								_iteratorError4 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion4 && _iterator4.return) {
										_iterator4.return();
									}
								} finally {
									if (_didIteratorError4) {
										throw _iteratorError4;
									}
								}
							}

							mOption.days.push((0, _calculateDay2.default)(mDay));
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

					mProgram.options.push(mOption);
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

			mPrograms.push(mProgram);
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

	return mPrograms;
}

exports.default = getCalForPrograms;