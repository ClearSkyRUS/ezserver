'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _orders = require('../../models/complecs/orders');

var _orders2 = _interopRequireDefault(_orders);

var _program = require('../../models/complecs/program');

var _program2 = _interopRequireDefault(_program);

var _dataToSting = require('../../helpers/dataToSting');

var _dataToSting2 = _interopRequireDefault(_dataToSting);

var _dish = require('../../models/basic/dish');

var _dish2 = _interopRequireDefault(_dish);

var _product = require('../../models/basic/product');

var _product2 = _interopRequireDefault(_product);

var _day = require('../../models/basic/day');

var _day2 = _interopRequireDefault(_day);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WorkDataControler = function () {
	function WorkDataControler() {
		_classCallCheck(this, WorkDataControler);
	}

	_createClass(WorkDataControler, [{
		key: 'index',
		value: function index(req, res) {
			var OrdersTomorrow = [];
			var dayCount = req.params.count;
			_day2.default.find().exec(function (err, Days) {

				_program2.default.find().exec(function (err, Programs) {
					if (err) throw err;

					_orders2.default.find().exec(function (err, Orders) {
						if (err) throw err;
						var data = new Date();
						var tomorow = 0;
						for (var i = 0; i < dayCount; i++) {
							data.setDate(data.getDate() + 1);
							var start = new Date(data.getFullYear(), 0, 0);
							var diff = data - start;
							var oneDay = 1000 * 60 * 60 * 24;
							var day = Math.floor(diff / oneDay);
							var today = (day + 10) % Days.length;

							if (i === 0) tomorow = today;

							var _iteratorNormalCompletion = true;
							var _didIteratorError = false;
							var _iteratorError = undefined;

							try {
								for (var _iterator = Orders[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
									var order = _step.value;
									var _iteratorNormalCompletion2 = true;
									var _didIteratorError2 = false;
									var _iteratorError2 = undefined;

									try {
										for (var _iterator2 = order.cart[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
											var cart = _step2.value;
											var _iteratorNormalCompletion3 = true;
											var _didIteratorError3 = false;
											var _iteratorError3 = undefined;

											try {
												for (var _iterator3 = cart.days[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
													var day = _step3.value;

													if (day.substr(0, 10) === (0, _dataToSting2.default)(data)) {
														var OrderObj = { program: cart.program, option: cart.option, count: cart.quanity, name: cart.name, date: day.substr(0, 10), day: today, orderData: order };
														OrdersTomorrow.push(OrderObj);
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
						}
						var dishsToCook = [];
						var programsObj = [];
						var _iteratorNormalCompletion4 = true;
						var _didIteratorError4 = false;
						var _iteratorError4 = undefined;

						try {
							for (var _iterator4 = OrdersTomorrow[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
								var order = _step4.value;
								var _iteratorNormalCompletion10 = true;
								var _didIteratorError10 = false;
								var _iteratorError10 = undefined;

								try {
									for (var _iterator10 = Programs.find(function (x) {
										return x._id.toString() === order.program;
									}).options.find(function (x) {
										return x.title === order.option;
									}).days[order.day].meals[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
										var meal = _step10.value;
										var _iteratorNormalCompletion11 = true;
										var _didIteratorError11 = false;
										var _iteratorError11 = undefined;

										try {
											for (var _iterator11 = meal.meal[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
												var dishs = _step11.value;
												var _iteratorNormalCompletion12 = true;
												var _didIteratorError12 = false;
												var _iteratorError12 = undefined;

												try {
													for (var _iterator12 = dishs.dishs[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
														var dish = _step12.value;

														if (dishsToCook.find(function (x) {
															return x.id === dish.id;
														})) {
															dishsToCook.find(function (x) {
																return x.id === dish.id;
															}).gram += dish.gram;
														} else {
															var dishObj = { id: dish.id, gram: dish.gram };
															dishsToCook.push(dishObj);
														}
													}
												} catch (err) {
													_didIteratorError12 = true;
													_iteratorError12 = err;
												} finally {
													try {
														if (!_iteratorNormalCompletion12 && _iterator12.return) {
															_iterator12.return();
														}
													} finally {
														if (_didIteratorError12) {
															throw _iteratorError12;
														}
													}
												}
											}
										} catch (err) {
											_didIteratorError11 = true;
											_iteratorError11 = err;
										} finally {
											try {
												if (!_iteratorNormalCompletion11 && _iterator11.return) {
													_iterator11.return();
												}
											} finally {
												if (_didIteratorError11) {
													throw _iteratorError11;
												}
											}
										}
									}
								} catch (err) {
									_didIteratorError10 = true;
									_iteratorError10 = err;
								} finally {
									try {
										if (!_iteratorNormalCompletion10 && _iterator10.return) {
											_iterator10.return();
										}
									} finally {
										if (_didIteratorError10) {
											throw _iteratorError10;
										}
									}
								}

								if (programsObj.find(function (x) {
									return x.id === order.program && x.option === order.option && x.day === order.day;
								})) {
									programsObj.find(function (x) {
										return x.id === order.program && x.option === order.option && x.day === order.day;
									}).count++;
								} else {
									var programObj = {
										id: order.program,
										title: Programs.find(function (x) {
											return x._id.toString() === order.program;
										}).title,
										option: order.option,
										day: order.day,
										count: 1,
										meals: Programs.find(function (x) {
											return x._id.toString() === order.program;
										}).options.find(function (x) {
											return x.title === order.option;
										}).days[order.day].meals
									};
									programsObj.push(programObj);
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

						var _iteratorNormalCompletion5 = true;
						var _didIteratorError5 = false;
						var _iteratorError5 = undefined;

						try {
							for (var _iterator5 = dishsToCook[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
								var dishToCook = _step5.value;

								dishToCook.gram = dishToCook.gram * 1.05;
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

						var DishsObjects = [];
						_dish2.default.find().exec(function (err, Dish) {
							if (err) throw err;
							var _iteratorNormalCompletion6 = true;
							var _didIteratorError6 = false;
							var _iteratorError6 = undefined;

							try {
								for (var _iterator6 = dishsToCook[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
									var dishToCook = _step6.value;

									var dishObj = { id: dishToCook.id, title: Dish.find(function (x) {
											return x._id.toString() === dishToCook.id;
										}).title, gram: dishToCook.gram, count: 0, products: [] };
									if (dishToCook.unit === "Шт") dishObj.count = dishToCook.count;
									var _iteratorNormalCompletion9 = true;
									var _didIteratorError9 = false;
									var _iteratorError9 = undefined;

									try {
										for (var _iterator9 = Dish.find(function (x) {
											return x._id.toString() === dishToCook.id;
										}).productslist[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
											var productInDish = _step9.value;

											var productObj = { id: productInDish.id, title: productInDish.value, hot: productInDish.hot, cold: productInDish.cold, ganes: productInDish.ganes, gram: dishToCook.gram * (productInDish.gramm / Dish.find(function (x) {
													return x._id.toString() === dishToCook.id;
												}).gramms) };
											dishObj.products.push(productObj);
										}
									} catch (err) {
										_didIteratorError9 = true;
										_iteratorError9 = err;
									} finally {
										try {
											if (!_iteratorNormalCompletion9 && _iterator9.return) {
												_iterator9.return();
											}
										} finally {
											if (_didIteratorError9) {
												throw _iteratorError9;
											}
										}
									}

									DishsObjects.push(dishObj);
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

							var buyList = { totalPrice: 0, products: [] };
							_product2.default.find().exec(function (err, Products) {
								if (err) throw err;
								var _iteratorNormalCompletion7 = true;
								var _didIteratorError7 = false;
								var _iteratorError7 = undefined;

								try {
									for (var _iterator7 = DishsObjects[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
										var dishObj = _step7.value;
										var _iteratorNormalCompletion8 = true;
										var _didIteratorError8 = false;
										var _iteratorError8 = undefined;

										try {
											for (var _iterator8 = dishObj.products[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
												var productObj = _step8.value;

												var grammNeed = 0;
												if (productObj.ganes) {
													grammNeed = productObj.gram / (Products.find(function (x) {
														return x._id.toString() === productObj.id;
													}).ganes / 100);
													productObj.gram = grammNeed;
												} else {
													if (productObj.hot) productObj.gram = productObj.gram + productObj.gram * Products.find(function (x) {
														return x._id.toString() === productObj.id;
													}).hot / 100 * productObj.hot;
													grammNeed = productObj.gram + productObj.gram * (Products.find(function (x) {
														return x._id.toString() === productObj.id;
													}).cold / 100) * productObj.cold;
												}
												if (buyList.products.find(function (x) {
													return x.id === productObj.id;
												})) {
													buyList.products.find(function (x) {
														return x.id === productObj.id;
													}).gramneed += grammNeed;
												} else {
													var productToList = { id: productObj.id, title: productObj.title, price: grammNeed * (Products.find(function (x) {
															return x._id.toString() === productObj.id;
														}).price / 1000), gramneed: grammNeed, gramhave: 0 };
													buyList.products.push(productToList);
												}
											}
										} catch (err) {
											_didIteratorError8 = true;
											_iteratorError8 = err;
										} finally {
											try {
												if (!_iteratorNormalCompletion8 && _iterator8.return) {
													_iterator8.return();
												}
											} finally {
												if (_didIteratorError8) {
													throw _iteratorError8;
												}
											}
										}
									}
								} catch (err) {
									_didIteratorError7 = true;
									_iteratorError7 = err;
								} finally {
									try {
										if (!_iteratorNormalCompletion7 && _iterator7.return) {
											_iterator7.return();
										}
									} finally {
										if (_didIteratorError7) {
											throw _iteratorError7;
										}
									}
								}

								buyList.totalPrice = buyList.products.reduce(function (price, product) {
									return price + product.price;
								}, 0);
								var jsonToClient = {
									DishsToCook: DishsObjects,
									BuyList: buyList,
									Orders: OrdersTomorrow,
									Programs: programsObj,
									DaysInfo: {
										dayTom: tomorow,
										days: Days
									}
								};
								res.json(jsonToClient);
							});
						});
					});
				});
			});
		}
	}]);

	return WorkDataControler;
}();

exports.default = WorkDataControler;