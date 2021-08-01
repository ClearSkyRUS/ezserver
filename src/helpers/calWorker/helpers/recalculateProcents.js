import getSumProcent from './getSumProcent'

function recalculateProcents(day) {
	var sum = getSumProcent(day.meals)
	for (var meal of day.meals) {
		if (!meal.ended)
			meal.target = (meal.target/sum) * 100;
		for (var dishs of meal.meal) {
			var sumDishs = getSumProcent(dishs.dishs)
			for (var dish of dishs.dishs) 
				if (!dish.ended)
					dish.target = (dish.target/sumDishs) * 100;
		}
	}
	return day; 
}

export default recalculateProcents;