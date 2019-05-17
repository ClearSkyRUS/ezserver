function getSumProcent(array) {
	var sum = 0;
	for (var item of array) {
		if (!item.ended)
			sum += item.target;
	}
	return sum;
}

export default getSumProcent;