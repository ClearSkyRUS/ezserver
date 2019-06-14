import TelegramSend from '../telegram/sendMessagesToAdmins';

import { DaysQueryModel, OrderModel } from '../../models'
import { getDateOf } from '../../helpers'

import OrderController from '../complecs/OrderControler';
const Order = new OrderController();

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
		        path: 'cart.program'
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
 				console.log(programsObj);
 				TelegramSend('Новый день, ', 'Данные за вчера: \n');
 		});
	});
}

export default everyDayAction;