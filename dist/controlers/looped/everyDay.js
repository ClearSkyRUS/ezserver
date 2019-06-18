'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _sendMessagesToAdmins = require('../telegram/sendMessagesToAdmins');

var _sendMessagesToAdmins2 = _interopRequireDefault(_sendMessagesToAdmins);

var _models = require('../../models');

var _helpers = require('../../helpers');

var _OrderControler = require('../complecs/OrderControler');

var _OrderControler2 = _interopRequireDefault(_OrderControler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Order = new _OrderControler2.default();

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
			console.log(programsObj);
			(0, _sendMessagesToAdmins2.default)('Новый день, ', 'Данные за вчера: \n');
		});
	});
};

exports.default = everyDayAction;