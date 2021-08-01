import getDishParams from '../helpers/getDishParams'

function calculatePiece(day, calTarget) {
	var calNeeded = calTarget;
	for (var meal of day.meals) {
		var NeedForMeal = calNeeded * (meal.target/100)
		for (var dishs of meal.meal)
			for (var dish of dishs.dishs)
				if (dish.dish.type.unit === "Шт" && !dish.ended) {
					var NeedForDish = NeedForMeal * (dish.target/100)
					if (dish.cal !== 0)
					var dishParams = getDishParams(dish.dish.productslist)
					var count = 1;
					var gram = dishParams.gramms;
					var cal = dishParams.cal * count;
                    while (NeedForDish > cal) {
                        count += 0.5;
                        gram = dishParams.gramms * count;
                        cal = dishParams.cal * count; 
                    }
                    
                    if ((cal - NeedForDish) > (NeedForDish - (dishParams.cal * (count-0.5))))
                    	count -= 0.5;

                    if (count < parseFloat(dish.dish.type.min))
                    	count = parseFloat(dish.dish.type.min);

                    if (count > parseFloat(dish.dish.type.max))
                    	count = parseFloat(dish.dish.type.max);

                    dish.gram = dishParams.gramms * count;
                    dish.count = count;  
 					
 					for (var key in dishParams) {
					  dish[key] = dishParams[key] * count
					}
 
	                calTarget = calTarget - dish.cal;

	                dish.ended = true;
				}  
	}
	return calTarget; 
}

export default calculatePiece;