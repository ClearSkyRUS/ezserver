const getDateOf = (days) => {

	var date = new Date();
	date.setHours(4, 0, 0, 0);
	date.setDate(date.getDate() + days);

	return date;
}

export default getDateOf;