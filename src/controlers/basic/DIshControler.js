import DishModel from '../../models/basic/dish';

class DishControler {

	index(req, res) {
		DishModel.find().then(( err, dishs ) => {
			if (err)
				return res.send(err);
			res.json(dishs);
		});
	}

	create(req, res) {
		var data = req.body;
		if (data.type === 'Другой')
		data.type = data.otherType


		const dish = new DishModel({
			"title": data.title,
			"type": data.type,
			"image": data.image,
			"gramms": data.gramms,
			"cal": data.cal,
			"prot": data.prot,
			"fat": data.fat,
			"carb": data.carb,
			"price": data.price,
			"key": data.title, 
			"value": data.title,
			"text": data.title,
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