import getDishParams from './calWorker/helpers/getDishParams'

function getDishsParams(dishs) {
	var dishsObj = [];
	for (var dish of dishs) {
		var params = getDishParams(dish.productslist);
		dish = {...dish._doc, ...params};
		dishsObj.push(dish);
	}
 	return dishsObj;
}
 
export default getDishsParams;