
function setAllEnded(day) {
	for (var meal of day.meals) {
		for (var dishs of meal.meal) {
			for (var dish of dishs.dishs) 
				if (!dish.ended)
					dish.ended = true;
		}
	}
}

export default setAllEnded;