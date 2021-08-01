import ClientModel from '../../models/basic/client';

class ClientControler {

	index(req, res) {
		ClientModel.find().then(( err, Clients ) => {
			if (err)
				return res.send(err);


			
			res.json(Clients);
		});
	}

	create(req, res) {
		var data = req.body;


		const Client = new ClientModel({
			"name": data.name,
			"time": data.time,
			"type": data.type,
			"tel": data.tel,
			"check": data.check,
			"points": data.points,
			"gender": data.gender,
			"sale": data.sale,
			"key": data.tel, 
			"value": data.tel,
			"text": data.name + " " + data.tel,
			"adres": data.adres
		});

		Client.save().then(() => {
			res.send({ status: "ok" });
		});
	}

	update(req, res) {
		var data = req.body;
		if (data.type === 'Другой')
		data.type = data.otherType

		ClientModel.findByIdAndUpdate(req.params.id, { $set: data }, err => {
			if (err)
				return res.send(err);
			res.json({ status: "updated" });
		});
	}

	delete(req, res) {
		ClientModel.remove({ _id: req.params.id}).then( Client => {
			if (Client) 
				return res.json({ status: "deleted" });

			res.json({ status: "error" });
		});
	}
}

export default ClientControler;