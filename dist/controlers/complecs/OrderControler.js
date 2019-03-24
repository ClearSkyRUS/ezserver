'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _orders = require('../../models/complecs/orders');

var _orders2 = _interopRequireDefault(_orders);

var _program = require('../../models/complecs/program');

var _program2 = _interopRequireDefault(_program);

var _dataToSting = require('../../helpers/dataToSting');

var _dataToSting2 = _interopRequireDefault(_dataToSting);

var _dish = require('../../models/basic/dish');

var _dish2 = _interopRequireDefault(_dish);

var _product = require('../../models/basic/product');

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrderControler = function () {
	function OrderControler() {
		_classCallCheck(this, OrderControler);
	}

	_createClass(OrderControler, [{
		key: 'index',
		value: function index(req, res) {
			_orders2.default.find().then(function (err, Orders) {
				if (err) return res.send(err);
				res.json(Orders);
			});
		}
	}, {
		key: 'create',
		value: function create(req, res) {
			var data = req.body;
			var Order = new _orders2.default({
				"client": data.client,
				"date": data.date,
				"time": data.time,
				"totalprice": data.totalprice,
				"totalsale": data.totalsale,
				"bonuses": data.bonuses,
				"status": data.status,
				"ended": data.ended,
				"cart": data.cart
			});

			Order.save().then(function () {
				res.send({ status: "ok" });
			});
		}
	}, {
		key: 'update',
		value: function update(req, res) {
			var data = req.body;
			if (data.type === 'Другой') data.type = data.otherType;

			_orders2.default.findByIdAndUpdate(req.params.id, { $set: data }, function (err) {
				if (err) return res.send(err);
				res.json({ status: "updated" });
			});
		}
	}, {
		key: 'delete',
		value: function _delete(req, res) {
			_orders2.default.remove({ _id: req.params.id }).then(function (Order) {
				if (Order) return res.json({ status: "deleted" });

				res.json({ status: "error" });
			});
		}
	}]);

	return OrderControler;
}();

exports.default = OrderControler;