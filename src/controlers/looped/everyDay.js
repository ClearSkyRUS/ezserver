import TelegramSend from '../telegram/sendMessagesToAdmins';

import { DaysQueryModel, OrderModel, ClientModel, DailyModel } from '../../models'
import { getDateOf, getCalForPrograms, isEnded } from '../../helpers'

import { getQuote } from '../../optional'


const everyDayAction = () => {
	let messageData = '';

	let data = getDateOf(-1);
	let dataEnd = getDateOf(1);
	let dataCheck = getDateOf(30);


	DaysQueryModel.find({"date": {
			"$gte": data, 
			"$lt": dataEnd}}) 
		.populate({
	        path: 'day',
	        populate: {
		        path: 'meals.meal.dishs.dish', 
		        populate: {
	                path: 'type productslist.product'
	            }
	        }
	}).sort('date').exec(function(err, days) {
		if (err) throw err;
		OrderModel.find({"cart.days": {
				"$gte": data, 
				"$lt": dataEnd}})
			.populate({
		        path: 'cart.program client'
	    	}).exec(function(err, orders) {
				if (err) throw err;
				var programsObj = [];
				var daysObj = [];
 				for (var order of orders)
 					if (programsObj.indexOf(order.cart[0].program) === -1)
 						programsObj.push(order.cart[0].program)

 				for (var day of days)
 					if (daysObj.indexOf(day.day) === -1)
 						daysObj.push(day.day)

 				programsObj = getCalForPrograms(programsObj, daysObj);
 				messageData += 'Заказов было на сегодня: ' + orders.length + ' \n';
 				let sum = 0;
 				let get = 0;
 				let endedOrders = 0;
 				let bonusesTotal = 0;
 				for (let order of orders) {
 					sum += programsObj.find(x => x._id == order.cart[0].program._id).options.find(x => x.cal == order.cart[0].option).days[0].price;
 					get += (order.totalprice - order.bonuses)/order.cart[0].days.length;
 					if (isEnded(order, dataEnd)) {
 						OrderModel.findByIdAndUpdate(order._id, { status: 'Завершен'}, err => {if (err) console.log(err)});
 						let bonuses = (order.totalprice - order.bonuses) * 0.1;
 						ClientModel.findByIdAndUpdate(order.client._id, { points: bonuses + order.client.points }, err => {if (err) console.log(err)});
 						bonusesTotal += bonuses;
 						endedOrders++;
 					}
 				}

 				messageData += 'Себестоимость продуктов: ' + sum.toFixed(0) + ' Руб \n';
 				messageData += 'Доход: ' + get.toFixed(0) + ' Руб \n';
 				messageData += 'Прибыль: ' + (get-sum).toFixed(0) + ' Руб \n';

 				if (endedOrders)
 					messageData += '\n Заказов завершено: ' + endedOrders + '\n' +
 									'Бонусов начисленно: ' + bonusesTotal + '\n';


 				const stamp = new DailyModel({
					"consumption": sum,
					"income": get,
					"endedOrders": endedOrders,
					"bonusesGiven": bonusesTotal
				});
				stamp.save();

				getQuote(response => {
					let qute = '';
					if (response.errno)
						qute = '\n Печаль, но цитатка не подгрузилась(';
					else {
						qute = '\n ' + response.quoteText;
						if (response.quoteAuthor)
							qute += '\n     ' + response.quoteAuthor
					}

					// TelegramSend('Новый день, ', 'Данные за вчера: \n' + messageData + qute);
				})
 		});
	});
}

export default everyDayAction;