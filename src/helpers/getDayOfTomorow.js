function getTomorow(data) {
	var start = new Date(data.getFullYear(), 0, 0);
	var diff = data - start;
	var oneDay = 1000 * 60 * 60 * 24;
	var day = Math.floor(diff / oneDay);
	var today = (day + 1) % Programs[0].options[0].days.length;

 	return today;
}

export default getTomorow;