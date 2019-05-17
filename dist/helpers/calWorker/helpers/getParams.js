"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function getParams(array) {
	var cal = array.reduce(function (cal, productItem) {
		return cal + (productItem.product.prot * 4.1 + productItem.product.fat * 4.1 + productItem.product.carb * 9.29) * (productItem.gramm / 100);
	}, 0);
	var gramms = array.reduce(function (gramms, productItem) {
		return gramms + productItem.gramm;
	}, 0);
	var prot = array.reduce(function (prot, productItem) {
		return prot + productItem.product.prot * (productItem.gramm / 100);
	}, 0);
	var fat = array.reduce(function (fat, productItem) {
		return fat + productItem.product.fat * (productItem.gramm / 100);
	}, 0);
	var carb = array.reduce(function (carb, productItem) {
		return carb + productItem.product.carb * (productItem.gramm / 100);
	}, 0);
	var price = array.reduce(function (price, productItem) {
		return price + productItem.product.price * (productItem.gramm / 1000);
	}, 0);
	return { cal: cal, gramms: gramms, prot: prot, fat: fat, carb: carb, price: price };
}

exports.default = getParams;