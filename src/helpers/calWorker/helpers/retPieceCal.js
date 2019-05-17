function retPieceCal(day) {
	var returned = 0;
	for (var meal of day.meals) {
		for (var dishs of meal.meal) {
			for (var dish of dishs.dishs) 
				if (dish.dish.type.unit === "Шт") {
					console.log('НАШЕЛ')
					dish.ended = false;
					dishs.ended = false;
					meal.ended = false;
					returned += dish.cal;
				}
		} 
	}
	return returned; 
}

export default retPieceCal;