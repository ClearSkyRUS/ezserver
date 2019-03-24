import ProgramModel from '../../models/complecs/program';

class ProgramControler {

	index(req, res) {
		ProgramModel.find().then(( err, programs ) => {
			if (err)
				return res.send(err);
			res.json(programs);
		});
	}

	create(req, res) {
		var data = req.body;
		if (data.type === 'Другой')
		data.type = data.otherType


		const program = new ProgramModel({
			"title": data.title,
			"type": data.type,
			"image": data.image,
			"price": data.price,
			"key": data.title, 
			"value": data.title,
			"text": data.title,
			"options":  data.options,
			"settings":  data.settings,
			"portions":  data.portions
		});

		program.save().then(() => {
			res.send({ status: "ok" });
		});
	}

	update(req, res) {
		var data = req.body;
		if (data.type === 'Другой')
		data.type = data.otherType

		ProgramModel.findByIdAndUpdate(req.params.id, { $set: data }, err => {
			if (err)
				return res.send(err);
			res.json({ status: "updated" });
		});
	}

	delete(req, res) {
		ProgramModel.remove({ _id: req.params.id}).then( program => {
			if (program) 
				return res.json({ status: "deleted" });

			res.json({ status: "error" });
		});
	}
}

export default ProgramControler;