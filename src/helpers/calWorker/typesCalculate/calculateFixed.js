import getDishParams from '../helpers/getDishParams'

function calculateFixed(day, cal) {
	const targetCal = cal;
	for (var meal of day.meals)
		for (var dishs of meal.meal)
			for (var dish of dishs.dishs)
				if (dish.dish.type.unit === "Гр" && !dish.ended) {
					for (var portion of dish.dish.type.portions)
						if (targetCal > parseFloat(portion.after))
							dish.gram = parseFloat(portion.value)

					var dishParams = getDishParams(dish.dish.productslist)
 					for (var key in dishParams) { 
					  dish[key] = dishParams[key] * (dish.gram/100)
					}

	                dish.ended = true;
	                cal = cal - dish.cal;
				} 
	return cal; 
}

export default calculateFixed;