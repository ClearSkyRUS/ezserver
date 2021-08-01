import DishModel from '../../models/basic/dish';
import DishTypeModel from '../../models/basic/dishType';
import ProductModel from '../../models/basic/product';

import { getKeys, getOterDishsParams } from '../../helpers';



class DishControler {

	index(req, res) {
		DishModel.find().populate('type productslist.product').exec(function(err, dishs) {
			if (err) 
				return res.send(err);
			var dishsObj = getOterDishsParams(dishs);
			DishTypeModel.find().exec(function(err, dishTypes) {
				if (err) 
					return res.send(err);

				ProductModel.find().exec(function(err, products) {
					if (err)
						return res.send(err); 
					var productsObj = getKeys(products, 'title');
					var response = {
						types: dishTypes,
						dishs: dishsObj,
						products: productsObj
					}
					res.json(response); 
				});
			});
		});
	}

	create(req, res) {
		var data = req.body;
		if (data.type === 'Другой')
		data.type = data.otherType


		const dish = new DishModel({
			"title": data.title, 
			"tehMap": data.tehMap,
			"type": data.type,
			"image": data.image,
			"gramms": data.gramms,
			"cal": data.cal,
			"prot": data.prot,
			"fat": data.fat,
			"carb": data.carb,
			"price": data.price,
			"productslist": data.productslist
		});

		dish.save().then(() => {
			res.send({ status: "ok" });
		});
	}

	update(req, res) {
		var data = req.body;
		if (data.type === 'Другой')
		data.type = data.otherType

		DishModel.findByIdAndUpdate(req.params.id, { $set: data }, err => {
			if (err)
				return res.send(err);
			res.json({ status: "updated" });
		});
	}

	delete(req, res) {
		DishModel.remove({ _id: req.params.id}).then( dish => {
			if (dish) 
				return res.json({ status: "deleted" });

			res.json({ status: "error" });
		});
	}
}

export default DishControler;