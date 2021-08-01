import TelegramSend from '../telegram/sendMessagesToAdmins';

class newOrderController {
	create(req, res) {
		var data = req.body;
			var telegramMessage = '';
			var helloText = '';
			if (data.action === 'create_order') {
				helloText = 'Кто-то хочет дать нам немного золота, '
				telegramMessage += 'От: ' + data.name + '\n Телефон: ' + data.phone + '\n Адрес: ' + data.adres + '\n Комментарий: ' + data.coment + '\n Заказ: \n' ;
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
				helloText = 'Кто-то хочет поболтать с вами, '
				telegramMessage += 'Имя: ' + data.name + '\nТелефон: ' + data.phone + '\n';
			}

			TelegramSend(helloText, telegramMessage);

			var jsonToClient = { succses: true };
			res.json(jsonToClient);
	}
}

export default newOrderController;