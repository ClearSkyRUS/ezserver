import getDishParams from '../helpers/getDishParams'

function calculateProcent(day, calTarget) {
	var onBorder = false;
	var calNeeded = calTarget;
	for (var meal of day.meals) {
		var NeedForMeal = calNeeded * (meal.target/100)
		for (var dishs of meal.meal)
			for (var dish of dishs.dishs)
				if (dish.dish.type.unit === "%" && !dish.ended) {
					var NeedForDish = NeedForMeal * (dish.target/100)
					var dishParams = getDishParams(dish.dish.productslist)
					
					dish.gram = NeedForDish/dishParams.cal * dishParams.gramms
 					
					if (dish.gram < parseFloat(dish.dish.type.min)) {
                    	dish.gram = parseFloat(dish.dish.type.min);
                    	dish.ended = true;
                    }

                    if (dish.gram > parseFloat(dish.dish.type.max)) {
                    	dish.gram = parseFloat(dish.dish.type.max);
                    	dish.ended = true;
                    }
 
 					for (var key in dishParams) { 
					  dish[key] = dishParams[key] * (dish.gram/100)
					}

	                calTarget = calTarget - dish.cal;

	                if (dish.ended)
	                	onBorder = true;

				}  
	}
	return {cal: calTarget, border: onBorder}; 
}

export default calculateProcent;