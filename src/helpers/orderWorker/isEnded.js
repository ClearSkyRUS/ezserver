const isEnded = (order, checkDate) => {
	for (let date of order.cart[0].days) {
		if ((date - checkDate) > 0)
			return false
	}

	return true;
}

export default isEnded;