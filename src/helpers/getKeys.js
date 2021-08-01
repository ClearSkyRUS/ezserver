const getKeys = (array, param1, param2) => {
	var modArray = []
	for (var item of array) {
		var keys = { key: item[param1], text: item[param1], value: item[param1]}; 
		if (param2)
			keys.text += ' ' + item[param2];
		
		item = {...item._doc, ...keys};
		modArray.push(item);
	} 
 	return modArray;
}

export default getKeys;