import OrderModel from '../../models/complecs/orders';
import ProgramModel from '../../models/complecs/program';
import DatetoString from '../../helpers/dataToSting';
import DishModel from '../../models/basic/dish';
import ProductModel from '../../models/basic/product';
import DayModel from '../../models/basic/day';

class WorkDataControler {
	index(req, res) {
		var OrdersTomorrow = [];
		const dayCount = req.params.count;
	DayModel.find().exec(function(err, Days) {

		ProgramModel.find().exec(function(err, Programs) {
			if (err) throw err;


			OrderModel.find().exec(function(err, Orders) {
				if (err) throw err;
				var data =  new Date();
				var tomorow = 0;
				for (var i = 0; i < dayCount; i++) {
					data.setDate(data.getDate() + 1)
		     		var start = new Date(data.getFullYear(), 0, 0);
					var diff = data - start;
					var oneDay = 1000 * 60 * 60 * 24;
					var day = Math.floor(diff / oneDay);
					var today = (day+10) % Days.length;

					if (i === 0)
						tomorow = today;

		     		for (var order of Orders) {
		     			for (var cart of order.cart) {
		     				for (var day of cart.days) {
		     					if (day.substr(0,10) === DatetoString(data)) {
		     						var OrderObj = {program: cart.program, option: cart.option, count: cart.quanity, name: cart.name, date: day.substr(0,10), day: today, orderData: order}
		     						OrdersTomorrow.push(OrderObj)
		     					}
		     				}
		     			}
		     		}
	     		}
		     	var dishsToCook = []
		     	var programsObj = []
		     		for (var order of OrdersTomorrow) {
						for (var meal of (Programs.find(x => x._id.toString() === order.program).options).find(x => x.title === order.option).days[order.day].meals) {
							for (var dishs of meal.meal) {
							    for (var dish of dishs.dishs)
							    	if (dishsToCook.find(x => x.id === dish.id)){
							    		dishsToCook.find(x => x.id === dish.id).gram += dish.gram
							    	} else {
								    	var dishObj = {id: dish.id, gram: dish.gram}
								   		dishsToCook.push(dishObj)
							   		}
							}
						}
							if (programsObj.find(x => (x.id === order.program && x.option === order.option && x.day === order.day)))  { 
								programsObj.find(x => (x.id === order.program && x.option === order.option && x.day === order.day)).count++;
							} else {
							    var programObj = {
								    id: order.program,
								    title: Programs.find(x => x._id.toString() === order.program).title,
								    option: order.option,
								    day: order.day,
								    count: 1,
								    meals: (Programs.find(x => x._id.toString() === order.program).options).find(x => x.title === order.option).days[order.day].meals
								}
								programsObj.push(programObj)
							}
					}

					for (var dishToCook of dishsToCook) {
						dishToCook.gram = dishToCook.gram * 1.05
					}

					var DishsObjects = []
					DishModel.find().exec(function(err, Dish) {
						if (err) throw err;
						for (var dishToCook of dishsToCook) {
							var dishObj = { id: dishToCook.id, title: Dish.find(x => x._id.toString() === dishToCook.id).title, gram: (dishToCook.gram), count: 0, products: []}
							if (dishToCook.unit === "Шт")
								dishObj.count = dishToCook.count
							for (var productInDish of Dish.find(x => x._id.toString() === dishToCook.id).productslist) {
								var productObj = { id: productInDish.id, title: productInDish.value, hot: productInDish.hot, cold: productInDish.cold, ganes: productInDish.ganes,  gram: ((dishToCook.gram * (productInDish.gramm / Dish.find(x => x._id.toString() === dishToCook.id).gramms)))}
								dishObj.products.push(productObj)
							}
							DishsObjects.push(dishObj)
						}
						var buyList = {totalPrice: 0, products: []}
						ProductModel.find().exec(function(err, Products) {
							if (err) throw err;
							for (var dishObj of DishsObjects) {
								for (var productObj of dishObj.products) {
									var grammNeed = 0;
									if (productObj.ganes) {
		                            grammNeed = productObj.gram/(Products.find(x => x._id.toString() === productObj.id ).ganes/100)
		                            productObj.gram = grammNeed
		                        	} else {
		                        	if (productObj.hot)
		                        		productObj.gram = productObj.gram + productObj.gram * Products.find(x => x._id.toString() === productObj.id ).hot/100 * productObj.hot
		                            grammNeed = productObj.gram + ((productObj.gram * (Products.find(x => x._id.toString() === productObj.id ).cold/100)) * productObj.cold)
		                        	}
		                			if (buyList.products.find(x => x.id === productObj.id)) {
		                				buyList.products.find(x => x.id === productObj.id).gramneed += grammNeed
		                			} else {
										var productToList = {id: productObj.id, title: productObj.title, price: (grammNeed * (Products.find(x => x._id.toString() === productObj.id).price/1000)), gramneed: grammNeed, gramhave: 0 }
										buyList.products.push(productToList)
									}
								}
							}
							buyList.totalPrice = buyList.products.reduce((price, product) => price + product.price, 0);
								var jsonToClient = {
									DishsToCook: DishsObjects,
									BuyList: buyList,
									Orders: OrdersTomorrow,
									Programs: programsObj,
									DaysInfo: {
										dayTom: tomorow,
										days: Days
									}
								}
								res.json(jsonToClient);
						});
					});
				});
	     	});
		});
	}
}

export default WorkDataControler;