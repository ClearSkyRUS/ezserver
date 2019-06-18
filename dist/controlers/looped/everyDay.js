'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _sendMessagesToAdmins = require('../telegram/sendMessagesToAdmins');

var _sendMessagesToAdmins2 = _interopRequireDefault(_sendMessagesToAdmins);

var _models = require('../../models');

var _helpers = require('../../helpers');

var _optional = require('../../optional');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var everyDayAction = function everyDayAction() {
	var messageData = '';

	var data = (0, _helpers.getDateOf)(-1);
	var dataEnd = (0, _helpers.getDateOf)(1);
	var dataCheck = (0, _helpers.getDateOf)(30);

	_models.DaysQueryModel.find({ "date": {
			"$gte": data,
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
				"$gte": data,
				"$lt": dataEnd } }).populate({
			path: 'cart.program client'
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
			messageData += 'Заказов было на сегодня: ' + orders.length + ' \n';
			var sum = 0;
			var get = 0;
			var endedOrders = 0;
			var bonusesTotal = 0;

			var _loop = function _loop(_order) {
				sum += programsObj.find(function (x) {
					return x._id == _order.cart[0].program._id;
				}).options.find(function (x) {
					return x.cal == _order.cart[0].option;
				}).days[0].price;
				get += (_order.totalprice - _order.bonuses) / _order.cart[0].days.length;
				if ((0, _helpers.isEnded)(_order, dataEnd)) {
					_models.OrderModel.findByIdAndUpdate(_order._id, { status: 'Завершен' }, function (err) {
						if (err) console.log(err);
					});
					var bonuses = (_order.totalprice - _order.bonuses) * 0.1;
					_models.ClientModel.findByIdAndUpdate(_order.client._id, { points: bonuses + _order.client.points }, function (err) {
						if (err) console.log(err);
					});
					bonusesTotal += bonuses;
					endedOrders++;
				}
			};

			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = orders[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var _order = _step3.value;

					_loop(_order);
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

			messageData += 'Себестоимость продуктов: ' + sum.toFixed(0) + ' Руб \n';
			messageData += 'Доход: ' + get.toFixed(0) + ' Руб \n';
			messageData += 'Прибыль: ' + (get - sum).toFixed(0) + ' Руб \n';

			if (endedOrders) messageData += '\n Заказов завершено: ' + endedOrders + '\n' + 'Бонусов начисленно: ' + bonusesTotal + '\n';

			var stamp = new _models.DailyModel({
				"consumption": sum,
				"income": get,
				"endedOrders": endedOrders,
				"bonusesGiven": bonusesTotal
			});
			stamp.save();

			(0, _optional.getQuote)(function (response) {
				var qute = '';
				if (response.errno) qute = '\n Печаль, но цитатка не подгрузилась(';else {
					qute = '\n ' + response.quoteText;
					if (response.quoteAuthor) qute += '\n     ' + response.quoteAuthor;
				}

				(0, _sendMessagesToAdmins2.default)('Новый день, ', 'Данные за вчера: \n' + messageData + qute);
			});
		});
	});
};

exports.default = everyDayAction;