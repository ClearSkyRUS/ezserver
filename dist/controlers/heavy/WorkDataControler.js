'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../../models');

var _helpers = require('../../helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WorkDataControler = function () {
	function WorkDataControler() {
		_classCallCheck(this, WorkDataControler);
	}

	_createClass(WorkDataControler, [{
		key: 'index',
		value: function index(req, res) {
			var OrdersTomorrow = [];
			var dayCount = parseFloat(req.params.count);

			var dataTomorow = (0, _helpers.getDateOf)(1);
			var dataEnd = (0, _helpers.getDateOf)(dayCount + 1);

			_models.DaysQueryModel.find({ "date": {
					"$gte": dataTomorow,
					"$lt": dataEnd } }).populate({
				path: 'day',
				populate: {
					path: 'meals.meal.dishs.dish',
					populate: {
						path: 'type productslist.product'
					}
				}
			}).sort('date').exec(function (err, days) {
				if (err) throw err;
				_models.OrderModel.find({ "cart.days": {
						"$gte": dataTomorow,
						"$lt": dataEnd } }).populate({
					path: 'cart.program'
				}).exec(function (err, orders) {
					if (err) throw err;
					var programsObj = [];
					var daysObj = [];
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = orders[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var order = _step.value;

							if (programsObj.indexOf(order.cart[0].program) === -1) programsObj.push(order.cart[0].program);
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

					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = days[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var day = _step2.value;

							if (daysObj.indexOf(day.day) === -1) daysObj.push(day.day);
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

					programsObj = (0, _helpers.getCalForPrograms)(programsObj, daysObj);

					var OrdersObj = [];
					for (var i = 0; i < dayCount; i++) {
						var _iteratorNormalCompletion3 = true;
						var _didIteratorError3 = false;
						var _iteratorError3 = undefined;

						try {
							for (var _iterator3 = orders[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
								var order = _step3.value;
								var _iteratorNormalCompletion4 = true;
								var _didIteratorError4 = false;
								var _iteratorError4 = undefined;

								try {
									for (var _iterator4 = order.cart[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
										var cart = _step4.value;
										var _iteratorNormalCompletion5 = true;
										var _didIteratorError5 = false;
										var _iteratorError5 = undefined;

										try {
											for (var _iterator5 = cart.days[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
												var day = _step5.value;

												if (day.getDate() === dataTomorow.getDate()) {
													var OrderObj = {
														program: programsObj.find(function (o) {
															return o._id === cart.program._id;
														}),
														option: cart.option,
														count: cart.quanity,
														name: cart.name,
														date: dataTomorow.toISOString().substring(0, 10),
														day: days.find(function (o) {
															return o.date.getDate() === dataTomorow.getDate();
														}).day,
														orderData: order };

													OrdersObj.push(OrderObj);
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

						dataTomorow.setDate(dataTomorow.getDate() + 1);
					}

					var programsToSend = [];
					var dishsToCook = [];

					var _iteratorNormalCompletion6 = true;
					var _didIteratorError6 = false;
					var _iteratorError6 = undefined;

					try {
						for (var _iterator6 = OrdersObj[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
							var order = _step6.value;
							var _iteratorNormalCompletion10 = true;
							var _didIteratorError10 = false;
							var _iteratorError10 = undefined;

							try {
								for (var _iterator10 = order.program.options.find(function (x) {
									return x.cal === order.option;
								}).days.find(function (x) {
									return x.title === order.day.title;
								}).meals[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
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
														return x.dish._id === dish.dish._id;
													})) {
														dishsToCook.find(function (x) {
															return x.dish._id === dish.dish._id;
														}).gram += dish.gram;
													} else {
														var dishObj = { dish: dish.dish, gram: dish.gram };
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

							if (programsToSend.find(function (x) {
								return x.title === order.program.title && x.option === order.option && x.day === order.day;
							})) {
								programsToSend.find(function (x) {
									return x.title === order.program.title && x.option === order.option && x.day === order.day;
								}).count++;
							} else {
								var programObj = {
									title: order.program.title,
									option: order.option,
									day: order.day,
									count: 1,
									meals: order.program.options.find(function (x) {
										return x.cal === order.option;
									}).days.find(function (x) {
										return x.title === order.day.title;
									}).meals
								};
								programsToSend.push(programObj);
							}
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

					var _iteratorNormalCompletion7 = true;
					var _didIteratorError7 = false;
					var _iteratorError7 = undefined;

					try {
						for (var _iterator7 = dishsToCook[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
							var dishToCook = _step7.value;

							dishToCook.gram = dishToCook.gram * 1.05;
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

					var DishsObjects = [];
					var _iteratorNormalCompletion8 = true;
					var _didIteratorError8 = false;
					var _iteratorError8 = undefined;

					try {
						for (var _iterator8 = dishsToCook[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
							var dishToCook = _step8.value;

							var dishObj = {
								title: dishToCook.dish.title,
								gram: dishToCook.gram,
								tehMap: dishToCook.dish.tehMap,
								count: 0,
								products: [] };

							if (dishToCook.dish.type.unit === "Шт") dishObj.count = dishToCook.gram / 105 * 100 / (0, _helpers.getDishParams)(dishToCook.dish.productslist).gramms;

							var _iteratorNormalCompletion13 = true;
							var _didIteratorError13 = false;
							var _iteratorError13 = undefined;

							try {
								for (var _iterator13 = dishToCook.dish.productslist[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
									var productInDish = _step13.value;

									var gramS = dishToCook.gram / (0, _helpers.getDishParams)(dishToCook.dish.productslist).gramms * productInDish.gramm / checkHot(productInDish) / checkCold(productInDish) * 10000;
									var gramC = dishToCook.gram / (0, _helpers.getDishParams)(dishToCook.dish.productslist).gramms * productInDish.gramm / checkHot(productInDish) * 100;
									var gramH = dishToCook.gram / (0, _helpers.getDishParams)(dishToCook.dish.productslist).gramms * productInDish.gramm;
									var gramG = dishToCook.gram / (0, _helpers.getDishParams)(dishToCook.dish.productslist).gramms * productInDish.gramm / checkGanes(productInDish);
									var productObj = {
										id: productInDish.product._id,
										title: productInDish.product.title,
										hot: productInDish.product.hot,
										cold: productInDish.product.cold,
										ganes: productInDish.product.ganes,
										price: productInDish.product.price,
										gramS: gramS,
										gramC: gramC,
										gramH: gramH,
										gramG: gramG };

									dishObj.products.push(productObj);
								}
							} catch (err) {
								_didIteratorError13 = true;
								_iteratorError13 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion13 && _iterator13.return) {
										_iterator13.return();
									}
								} finally {
									if (_didIteratorError13) {
										throw _iteratorError13;
									}
								}
							}

							DishsObjects.push(dishObj);
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

					var buyList = { totalPrice: 0, products: [] };
					var _iteratorNormalCompletion9 = true;
					var _didIteratorError9 = false;
					var _iteratorError9 = undefined;

					try {
						for (var _iterator9 = DishsObjects[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
							var dishObj = _step9.value;
							var _iteratorNormalCompletion14 = true;
							var _didIteratorError14 = false;
							var _iteratorError14 = undefined;

							try {
								for (var _iterator14 = dishObj.products[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
									var productObj = _step14.value;

									var grammNeed = 0;
									if (productObj.ganes) {
										grammNeed = productObj.gramG;
									} else {
										grammNeed = productObj.gramS;
									}
									if (buyList.products.find(function (x) {
										return x.id === productObj.id;
									})) {
										buyList.products.find(function (x) {
											return x.id === productObj.id;
										}).gramneed += grammNeed;
										buyList.products.find(function (x) {
											return x.id === productObj.id;
										}).price += grammNeed * (productObj.price / 1000);
									} else {
										var productToList = {
											id: productObj.id,
											title: productObj.title,
											price: grammNeed * (productObj.price / 1000),
											gramneed: grammNeed,
											gramhave: 0
										};
										buyList.products.push(productToList);
									}
								}
							} catch (err) {
								_didIteratorError14 = true;
								_iteratorError14 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion14 && _iterator14.return) {
										_iterator14.return();
									}
								} finally {
									if (_didIteratorError14) {
										throw _iteratorError14;
									}
								}
							}
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

					buyList.totalPrice = buyList.products.reduce(function (price, item) {
						return price + item.price;
					}, 0);

					_models.DaysQueryModel.find().populate({
						path: 'day',
						populate: {
							path: 'meals.meal.dishs.dish'
						}
					}).sort('date').exec(function (err, daysMas) {
						if (err) throw err;
						res.json({
							DishsToCook: DishsObjects,
							BuyList: buyList,
							Orders: OrdersObj,
							Programs: programsToSend,
							DaysInfo: {
								dayTom: dataTomorow,
								days: daysMas
							}
						});
						res.end();
						req.destroy();
					});
				});
			});

			var checkGanes = function checkGanes(item) {
				if (item.ganes) return item.product.ganes / 100;
				return 1;
			};

			var checkHot = function checkHot(item) {
				if (item.hot) return 100 - item.product.hot === 0 ? 100 : 100 - item.product.hot;
				return 100;
			};

			var checkCold = function checkCold(item) {
				if (item.cold) return 100 - item.product.cold === 0 ? 100 : 100 - item.product.cold;
				return 100;
			};
		}
	}]);

	return WorkDataControler;
}();

exports.default = WorkDataControler;