function getCountNotEnded(array) {
	var count = 0;
	for (var item of array) {
		if (!item.ended) 
			count++;
	}
	return count;
}

export default getCountNotEnded;