import OrderModel from '../../models/complecs/orders';
import ProgramModel from '../../models/complecs/program';
import DatetoString from '../../helpers/dataToSting';
import DishModel from '../../models/basic/dish';
import ProductModel from '../../models/basic/product';

class OrderControler {
	index(req, res) {
		OrderModel.find().then(( err, Orders ) => {
			if (err)
				return res.send(err);
			res.json(Orders);
		});
	}

	create(req, res) {
		var data = req.body;
		const Order = new OrderModel({
			"client":  data.client,
			"date":  data.date,
			"time": data.time,
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