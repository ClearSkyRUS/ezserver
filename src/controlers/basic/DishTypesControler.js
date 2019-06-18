import DishTypeModel from '../../models/basic/dishType';

class DishTypesControler {

	index(req, res) {
		DishTypeModel.find().then(( err, dishTypes ) => {
			if (err)
				return res.send(err);

			res.json(dishTypes); 
			res.end();
			req.destroy();
		});
	}

	create(req, res) {
		var data = req.body;

		const dishType = new DishTypeModel({
			"title": data.title,
			"unit": data.unit,
			"max": data.max,
			"min": data.min,
			"portions": data.portions
		});
 
		dishType.save().then(() => {
			res.send({ status: "ok" });
			res.end();
			req.destroy();
		});
	}

	update(req, res) {
		var data = req.body;
		DishTypeModel.findByIdAndUpdate(req.params.id, { $set: data }, err => {
			if (err)
				return res.send(err);
			res.json({ status: "updated" });
			res.end();
			req.destroy();
		});
	}

	delete(req, res) {
		DishTypeModel.remove({ _id: req.params.id}).then( dishType => {
			if (dishType) 
				return res.json({ status: "deleted" });

			res.json({ status: "error" });
			res.end();
			req.destroy();
		});
	}
}

export default DishTypesControler;