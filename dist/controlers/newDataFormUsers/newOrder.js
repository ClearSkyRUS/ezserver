'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sendMessagesToAdmins = require('../telegram/sendMessagesToAdmins');

var _sendMessagesToAdmins2 = _interopRequireDefault(_sendMessagesToAdmins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var newOrderController = function () {
	function newOrderController() {
		_classCallCheck(this, newOrderController);
	}

	_createClass(newOrderController, [{
		key: 'create',
		value: function create(req, res) {
			var data = req.body;
			var telegramMessage = '';
			var helloText = '';
			if (data.action === 'create_order') {
				helloText = 'Кто-то хочет дать нам немного золота, ';
				telegramMessage += 'От: ' + data.name + '\n Телефон: ' + data.phone + '\n Адрес: ' + data.adres + '\n Комментарий: ' + data.coment + '\n Заказ: \n';
				var totalDays = 0;
				var totalSum = 0;
				for (var key in data.cart) {
					var item = data.cart[key];
					telegramMessage += '\n' + item.variation.title + ' ' + item.variation.option + ' Ккал';
					telegramMessage += '\n Дней: ' + item.quantity + ' Стоимость: ' + item.line_total + ' Рублей \n';
					totalDays += parseFloat(item.quantity);
					totalSum += parseFloat(item.line_total);
				};
				telegramMessage += '\n Всего дней: ' + totalDays + ', Сумма: ' + totalSum + ' Рублей';
			}
			if (data.action === 'create_calback_order') {
				helloText = 'Кто-то хочет поболтать с вами, ';
				telegramMessage += 'Имя: ' + data.name + '\nТелефон: ' + data.phone + '\n';
			}

			(0, _sendMessagesToAdmins2.default)(helloText, telegramMessage);

			var jsonToClient = { succses: true };
			res.json(jsonToClient);
		}
	}]);

	return newOrderController;
}();

exports.default = newOrderController;