import { DaysQueryModel, ProgramModel } from '../../models'
import { getDay, getCalForPrograms } from '../../helpers'
 
class SiteDataControler {
	index(req, res) {
		const discounts = [{quanity: 1, discount: 0}, {quanity: 5, discount: 10}, {quanity: 20, discount: 20}]
		const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

		ProgramModel.aggregate([
		    {$match: {'public': true, 'options.public': true}},
		    {$project: {
		        options: {$filter: {
		            input: '$options',
		            as: 'option',
		            cond: {$eq: ['$$option.public', true]}
		        }},
		        _id: 1,
		        settings: 1,
		        title: 1,
		        type: 1
		    }}
		]).exec(function(err, programs) {
			if (err) throw err;
			DaysQueryModel.find().populate({
		        path: 'day',
		        populate: {
			        path: 'meals.meal.dishs.dish', 
			        populate: {
		                path: 'type productslist.product'
		            }
		        }
		    }).sort('date').exec(function(err, days) {
				if (err) throw err;
				
				var daysObj = [];
				for (var i = 0; i<7; i++)
					daysObj.push(days[i].day)

				console.log(programs)


				var programsObj = getCalForPrograms(programs, daysObj);

				var jsonToClient = { programs: [], days: daysObj, programsObj: programsObj };
				for (var program of programsObj) {
					var programItem = {
						id: program._id,
						title: program.title,
						options: [],
						discount: discounts
					}
					for (var option of program.options) {
						var optionItem = {
							cal: option.cal,
							price: option.price,
							days: []
						} 
						console.log(option)
						for (var i=0; i<7; i++) {
							var date = new Date(days[i].date)
							var selectedDay = option.days[i];
							var dayItem = {
								date: daysOfWeek[date.getDay()] + ': ' + getDay(date),
								meals: [],
								stat: {cal: selectedDay.cal.toFixed(0), prot: selectedDay.prot.toFixed(0), fat: selectedDay.fat.toFixed(0), carb: selectedDay.carb.toFixed(0)}
							}
							for (var meal of selectedDay.meals) {
								var mealItem = {
									title: meal.title,
									stat: {cal: meal.cal.toFixed(0), prot: meal.prot.toFixed(0), fat: meal.fat.toFixed(0), carb: meal.carb.toFixed(0)},
									dishs: ''
								}
								var dishsString = '';
								for (var dishs of meal.meal) {
									for (var dish of dishs.dishs) {
										if (dishsString !== '') {
											dishsString += ', ' + dish.dish.title.toLowerCase();
										} else {
											dishsString += dish.dish.title
										}
									}
								}
								mealItem.dishs = dishsString;
								dayItem.meals.push(mealItem);
							}
							optionItem.days.push(dayItem);
						}
						programItem.options.push(optionItem)
					}
					jsonToClient.programs.push(programItem)
				}
				res.json(jsonToClient);
			});
		});
	}
}

function getAvibleDate() {
	var data =  new Date();
	if (data.getHours() > 16) {
	    data.setDate(data.getDate()+2)
	} else {
	    data.setDate(data.getDate()+1)
	}
	return data;
}

export default SiteDataControler;