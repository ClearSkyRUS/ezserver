import getCountNotEnded from './getCountNotEnded'

function checkEnded(day) {

	for (var meal of day.meals) {
		for (var dishs of meal.meal) {
			if (getCountNotEnded(dishs.dishs) === 0)
				dishs.ended = setParams(dishs, dishs.dishs);
		}
		if (getCountNotEnded(meal.meal) === 0)
			meal.ended = setParams(meal, meal.meal);
	}

	if (getCountNotEnded(day.meals) === 0)
		day.ended = setParams(day, day.meals);

	return day;
}

function setParams(item, array) {

 	var cal = array.reduce((cal, arrItem) => cal + arrItem.cal, 0);
	var prot = array.reduce((prot, arrItem) => prot + arrItem.prot, 0);
	var fat = array.reduce((fat, arrItem) => fat + arrItem.fat, 0);
	var carb = array.reduce((carb, arrItem) => carb + arrItem.carb, 0);
	var price = array.reduce((price, arrItem) => price + arrItem.price, 0);
	var params = { cal: cal, prot: prot, fat: fat, carb: carb, price: price};
 	for (var key in params)
		item[key] = params[key]

	return true
}

export default checkEnded;