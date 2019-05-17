"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function getDishParams(array) {
	var gramms = array.reduce(function (gramms, item) {
		return gramms + item.gramm;
	}, 0);
	var prot = array.reduce(function (prot, item) {
		return prot + item.product.prot / checkGanes(item) / checkHot(item) * 100 * (item.gramm / 100);
	}, 0);
	var fat = array.reduce(function (fat, item) {
		return fat + item.product.fat / checkGanes(item) / checkHot(item) * 100 * (item.gramm / 100);
	}, 0);
	var carb = array.reduce(function (carb, item) {
		return carb + item.product.carb / checkGanes(item) / checkHot(item) * 100 * (item.gramm / 100);
	}, 0);
	var price = array.reduce(function (price, item) {
		return price + item.product.price / checkGanes(item) / checkHot(item) / checkCold(item) * 10000 * (item.gramm / 1000);
	}, 0);
	var cal = prot * 4.1 + fat * 9.29 + carb * 4.1;

	return { cal: cal, gramms: gramms, prot: prot, fat: fat, carb: carb, price: price };
}

function checkGanes(item) {
	if (item.ganes) return item.product.ganes / 100;
	return 1;
}

function checkHot(item) {
	if (item.hot) return 100 - item.product.hot === 0 ? 100 : 100 - item.product.hot;
	return 100;
}

function checkCold(item) {
	if (item.cold) return 100 - item.product.cold === 0 ? 100 : 100 - item.product.cold;
	return 100;
}

exports.default = getDishParams;