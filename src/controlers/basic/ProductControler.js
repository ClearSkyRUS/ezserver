import ProductModel from '../../models/basic/product';

class ProductControler {

	index(req, res) {
		ProductModel.find().then(( err, products ) => {

			if (err)
				return res.send(err);

			res.json(products); 
		});
	}

	create(req, res) {
		var data = req.body;
		if (data.type === 'Другой')
		data.type = data.otherType

		const product = new ProductModel({
			"title": data.title,
			"type": data.type,
			"prot": data.prot,
			"fat": data.fat,
			"carb": data.carb,
			"price": data.price,
			"cold": data.cold,
			"hot": data.hot,
			"ganes": data.ganes
		});

		product.save().then(() => {
			res.send({ status: "ok" });
		});
	}

	update(req, res) {
		var data = req.body;
		if (data.type === 'Другой')
		data.type = data.otherType

		ProductModel.findByIdAndUpdate(req.params.id, { $set: data }, err => {
			if (err)
				return res.send(err);
			res.json({ status: "updated" });
		});
	}

	delete(req, res) {
		ProductModel.remove({ _id: req.params.id}).then( product => {
			if (product) 
				return res.json({ status: "deleted" });

			res.json({ status: "error" });
		});
	}
}

export default ProductControler;