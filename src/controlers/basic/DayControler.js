import DayModel from '../../models/basic/day';

class DayControler {

	index(req, res) {
		DayModel.find().then(( err, days ) => {
			if (err)
				return res.send(err);
			res.json(days);
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
			"key": data.title, 
			"value": data.title,
			"text": data.title,
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