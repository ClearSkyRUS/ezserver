'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../../models');

var _helpers = require('../../helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SiteDataControler = function () {
	function SiteDataControler() {
		_classCallCheck(this, SiteDataControler);
	}

	_createClass(SiteDataControler, [{
		key: 'index',
		value: function index(req, res) {
			var discounts = [{ quanity: 1, discount: 0 }, { quanity: 5, discount: 10 }, { quanity: 20, discount: 20 }];
			var daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

			_models.ProgramModel.aggregate([{ $match: { 'public': true, 'options.public': true } }, { $project: {
					options: { $filter: {
							input: '$options',
							as: 'option',
							cond: { $eq: ['$$option.public', true] }
						} },
					_id: 1,
					settings: 1,
					title: 1,
					type: 1
				} }]).exec(function (err, programs) {
				if (err) throw err;
				_models.DaysQueryModel.find().populate({
					path: 'day',
					populate: {
						path: 'meals.meal.dishs.dish',
						populate: {
							path: 'type productslist.product'
						}
					}
				}).sort('date').exec(function (err, days) {
					if (err) throw err;

					var daysObj = [];
					for (var i = 0; i < 7; i++) {
						daysObj.push(days[i].day);
					}console.log(programs);

					var programsObj = (0, _helpers.getCalForPrograms)(programs, daysObj);

					var jsonToClient = { programs: [], days: daysObj, programsObj: programsObj };
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = programsObj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var program = _step.value;

							var programItem = {
								id: program._id,
								title: program.title,
								options: [],
								discount: discounts
							};
							var _iteratorNormalCompletion2 = true;
							var _didIteratorError2 = false;
							var _iteratorError2 = undefined;

							try {
								for (var _iterator2 = program.options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
									var option = _step2.value;

									var optionItem = {
										cal: option.cal,
										price: option.price,
										days: []
									};
									console.log(option);
									for (var i = 0; i < 7; i++) {
										var date = new Date(days[i].date);
										var selectedDay = option.days[i];
										var dayItem = {
											date: daysOfWeek[date.getDay()] + ': ' + (0, _helpers.getDay)(date),
											meals: [],
											stat: { cal: selectedDay.cal.toFixed(0), prot: selectedDay.prot.toFixed(0), fat: selectedDay.fat.toFixed(0), carb: selectedDay.carb.toFixed(0) }
										};
										var _iteratorNormalCompletion3 = true;
										var _didIteratorError3 = false;
										var _iteratorError3 = undefined;

										try {
											for (var _iterator3 = selectedDay.meals[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
												var meal = _step3.value;

												var mealItem = {
													title: meal.title,
													stat: { cal: meal.cal.toFixed(0), prot: meal.prot.toFixed(0), fat: meal.fat.toFixed(0), carb: meal.carb.toFixed(0) },
													dishs: ''
												};
												var dishsString = '';
												var _iteratorNormalCompletion4 = true;
												var _didIteratorError4 = false;
												var _iteratorError4 = undefined;

												try {
													for (var _iterator4 = meal.meal[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
														var dishs = _step4.value;
														var _iteratorNormalCompletion5 = true;
														var _didIteratorError5 = false;
														var _iteratorError5 = undefined;

														try {
															for (var _iterator5 = dishs.dishs[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
																var dish = _step5.value;

																if (dishsString !== '') {
																	dishsString += ', ' + dish.dish.title.toLowerCase();
																} else {
																	dishsString += dish.dish.title;
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

												mealItem.dishs = dishsString;
												dayItem.meals.push(mealItem);
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

										optionItem.days.push(dayItem);
									}
									programItem.options.push(optionItem);
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

							jsonToClient.programs.push(programItem);
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

					res.json(jsonToClient);
					res.end();
					req.destroy();
				});
			});
		}
	}]);

	return SiteDataControler;
}();

function getAvibleDate() {
	var data = new Date();
	if (data.getHours() > 16) {
		data.setDate(data.getDate() + 2);
	} else {
		data.setDate(data.getDate() + 1);
	}
	return data;
}

exports.default = SiteDataControler;