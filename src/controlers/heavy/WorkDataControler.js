import OrderModel from '../../models/complecs/orders';
import ProgramModel from '../../models/complecs/program';
import DatetoString from '../../helpers/dataToSting';
import DishModel from '../../models/basic/dish';
import ProductModel from '../../models/basic/product';
import DayModel from '../../models/basic/day';
import DaysQueryModel from '../../models/complecs/daysQuery';

import getCalForPrograms  from '../../helpers/calWorker/getCalForPrograms';
import getDishParams from '../../helpers/calWorker/helpers/getDishParams';


class WorkDataControler {
	index(req, res) {
		var OrdersTomorrow = [];
		const dayCount = parseFloat(req.params.count);

		var dataTomorow = getDateOf(1);
		var dataEnd = getDateOf(dayCount+1);

		DaysQueryModel.find({"date": {
			"$gte": dataTomorow, 
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
			console.log(days)
			OrderModel.find({"cart.days": {
				"$gte": dataTomorow, 
				"$lt": dataEnd}})
			.populate({
		        path: 'cart.program'
	    	}).exec(function(err, orders) {
				if (err) throw err;
				console.log(orders)
				var programsObj = [];
				var daysObj = [];
 				for (var order of orders)
 					if (programsObj.indexOf(order.cart[0].program) === -1)
 						programsObj.push(order.cart[0].program)

 				for (var day of days)
 					if (daysObj.indexOf(day.day) === -1)
 						daysObj.push(day.day)

 				programsObj = getCalForPrograms(programsObj, daysObj);

 				var OrdersObj = [];
 				for (var i = 0; i < dayCount; i++) {
		     		for (var order of orders) {
		     			for (var cart of order.cart) {
		     				for (var day of cart.days) {
		     					if (day.getDate() === dataTomorow.getDate()) {
		     						var OrderObj = {
		     							program: programsObj.find(o => o._id === cart.program._id), 
		     							option: cart.option, 
		     							count: cart.quanity, 
		     							name: cart.name, 
		     							date: dataTomorow.toISOString().substring(0, 10), 
		     							day: days.find(o => o.date.getDate() === dataTomorow.getDate()).day, 
		     							orderData: order}

		     						OrdersObj.push(OrderObj)
		     					}
		     				}
		     			}
		     		}
		     		dataTomorow.setDate(dataTomorow.getDate() + 1);
	     		}

	     		var programsToSend = [];
     			var dishsToCook = [];

		     	for (var order of OrdersObj) {
					for (var meal of order.program.options.find(x => x.cal === order.option).days.find(x => x.title === order.day.title).meals) {
						for (var dishs of meal.meal) {
						    for (var dish of dishs.dishs)
						    	if (dishsToCook.find(x => x.dish._id === dish.dish._id)){
						    		dishsToCook.find(x => x.dish._id === dish.dish._id).gram += dish.gram
						    	} else {
							    	var dishObj = {dish: dish.dish, gram: dish.gram}
							   		dishsToCook.push(dishObj)
						   		}
						}
					}
					if (programsToSend.find(x => (x.title === order.program.title && x.option === order.option && x.day === order.day)))  { 
						programsToSend.find(x => (x.title === order.program.title && x.option === order.option && x.day === order.day)).count++;
					} else {
					    var programObj = {
						    title: order.program.title,
						    option: order.option,
						    day: order.day,
						    count: 1,
						    meals: order.program.options.find(x => x.cal === order.option).days.find(x => x.title === order.day.title).meals
						}
						programsToSend.push(programObj)
					}
				}

				for (var dishToCook of dishsToCook) {
					dishToCook.gram = dishToCook.gram * 1.05
				}


				var DishsObjects = []
				for (var dishToCook of dishsToCook) {
					var dishObj = { 
						title: dishToCook.dish.title, 
						gram: dishToCook.gram, 
						count: 0, 
						products: []}
					
					if (dishToCook.dish.type.unit === "Шт")
						dishObj.count = ((dishToCook.gram/105)*100)/getDishParams(dishToCook.dish.productslist).gramms
					
					for (var productInDish of dishToCook.dish.productslist) {
						var gramS = dishToCook.gram/getDishParams(dishToCook.dish.productslist).gramms * productInDish.gramm/checkHot(productInDish) /checkCold(productInDish) * 10000
						var gramC = dishToCook.gram/getDishParams(dishToCook.dish.productslist).gramms * productInDish.gramm/checkHot(productInDish) * 100
						var gramH = dishToCook.gram/getDishParams(dishToCook.dish.productslist).gramms * productInDish.gramm 
						var gramG = dishToCook.gram/getDishParams(dishToCook.dish.productslist).gramms * productInDish.gramm/checkGanes(productInDish)
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
							gramG: gramG}

						dishObj.products.push(productObj)
					}
					DishsObjects.push(dishObj)
				}

				var buyList = {totalPrice: 0, products: []}
				for (var dishObj of DishsObjects) {
					for (var productObj of dishObj.products) {
						var grammNeed = 0;
						if (productObj.ganes) {
		                    grammNeed = productObj.gramG
		               	} else {
		                	grammNeed = productObj.gramS
		                }
		                if (buyList.products.find(x => x.id === productObj.id)) {
		                	buyList.products.find(x => x.id === productObj.id).gramneed += grammNeed;
		                	buyList.products.find(x => x.id === productObj.id).price += (grammNeed * (productObj.price/1000));
		                } else {
							var productToList = {
								id: productObj.id, 
								title: productObj.title, 
								price: (grammNeed * (productObj.price/1000)), 
								gramneed: grammNeed, 
								gramhave: 0 
							}
							buyList.products.push(productToList)
						}
					} 
				}
				buyList.totalPrice = buyList.products.reduce((price, item) => price + item.price, 0);

				DaysQueryModel.find().populate({
			        path: 'day',
			        populate: {
				        path: 'meals.meal.dishs.dish',
			        }
			    }).sort('date').exec(function(err, daysMas) {
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
				});
		   	});
		});


		function getDateOf (days) {
			var date = new Date();
			date.setHours(4, 0, 0, 0);
			date.setDate(date.getDate() + days);

			return date;
		}

		function checkGanes(item) {
			if (item.ganes)
				return item.product.ganes / 100
			return 1
		} 

		function checkHot(item) {
			if (item.hot)
				return (100 - item.product.hot === 0) ? 100 : (100 - item.product.hot)
			return 100
		} 

		function checkCold(item) {
			if (item.cold)
				return (100 - item.product.cold === 0) ? 100 : (100 - item.product.cold)
			return 100
		} 
	}
}

export default WorkDataControler;