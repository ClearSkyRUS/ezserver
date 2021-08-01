import DayModel from '../../models/basic/day';
import DishModel from '../../models/basic/dish';

class DayControler {

	index(req, res) {
		DayModel.updateMany({}, {$unset: {key: 1, value: 1, text: 1}}, err => {})

 
		DayModel.find().populate('meals.meal.dishs.dish').exec(function(err, days) {
			if (err)
				return res.send(err);
			DishModel.find().populate('type').exec(function(err, dishs) {
				if (err) 
					return res.send(err);
				var response = {
					days: days,
					dishs: dishs
				}
				res.json(response); 
			});
		});
	}

	create(req, res) {
		var data = req.body;
		if (data.type === 'Другой')
		data.type = data.otherType


		const day = new DayModel({
			"title": data.title,
			"type": data.type,
			"active": data.active,
			"meals": data.meals
		});

		day.save().then(() => {
			res.send({ status: "ok" });
		});
	}

	update(req, res) {
		var data = req.body;
		if (data.type === 'Другой')
		data.type = data.otherType

		DayModel.findByIdAndUpdate(req.params.id, { $set: data }, err => {
			if (err)
				return res.send(err);
			res.json({ status: "updated" });
		});
	}

	delete(req, res) {
		DayModel.remove({ _id: req.params.id}).then( day => {
			if (day) 
				return res.json({ status: "deleted" });

			res.json({ status: "error" });
		});
	}
}

export default DayControler;