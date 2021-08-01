
function retCals(day) {
	var returned = 0;
	for (var meal of day.meals) {
		for (var dishs of meal.meal) {
			for (var dish of dishs.dishs) 
				if (!dish.ended)
					returned += dish.cal;
		} 
	}
	return returned; 
}

export default retCals;