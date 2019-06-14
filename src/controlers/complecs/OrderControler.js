import OrderModel from '../../models/complecs/orders';
import ProgramModel from '../../models/complecs/program';
import ClientModel from '../../models/basic/client';

import { getKeys } from '../../helpers';


class OrderControler {
	index(req, res) {


		OrderModel.find().exec(function(err, orders) {
			if (err)
				return res.send(err);
			for (var order of orders) {
				OrderModel.findByIdAndUpdate(order._id, { $set: order }, err => {
				});
			}
			ProgramModel.find().select('title type options').exec(function(err, programs) {
				if (err)
					return res.send(err);
				ClientModel.find().exec(function(err, clients) {
					if (err)
						return res.send(err);


					res.json({
						"orders": orders,
						"programs": getKeys(programs, 'title'),
						"clients": clients
					});
				});
			});
		});
	}

	create(req, res) {
		var data = req.body;
		const Order = new OrderModel({
			"client":  data.client,
			"date":  data.date,
			"totalprice": data.totalprice,
			"totalsale": data.totalsale,
			"bonuses": data.bonuses,
			"status":  data.status,
			"ended":  data.ended,
			"cart":  data.cart
		});

		Order.save().then(() => {
			res.send({ status: "ok" });
		});
	}

	update(req, res) {
		var data = req.body;
		if (data.type === 'Другой')
		data.type = data.otherType

		OrderModel.findByIdAndUpdate(req.params.id, { $set: data }, err => {
			if (err)
				return res.send(err);
			res.json({ status: "updated" });
		});
	}

	delete(req, res) {
		OrderModel.remove({ _id: req.params.id}).then( Order => {
			if (Order) 
				return res.json({ status: "deleted" });

			res.json({ status: "error" });
		});
	}
}

export default OrderControler;