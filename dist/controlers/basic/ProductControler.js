'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _product = require('../../models/basic/product');

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProductControler = function () {
	function ProductControler() {
		_classCallCheck(this, ProductControler);
	}

	_createClass(ProductControler, [{
		key: 'index',
		value: function index(req, res) {
			_product2.default.find().then(function (err, products) {

				if (err) return res.send(err);

				res.json(products);
			});
		}
	}, {
		key: 'create',
		value: function create(req, res) {
			var data = req.body;
			if (data.type === 'Другой') data.type = data.otherType;

			var product = new _product2.default({
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

			product.save().then(function () {
				res.send({ status: "ok" });
			});
		}
	}, {
		key: 'update',
		value: function update(req, res) {
			var data = req.body;
			if (data.type === 'Другой') data.type = data.otherType;

			_product2.default.findByIdAndUpdate(req.params.id, { $set: data }, function (err) {
				if (err) return res.send(err);
				res.json({ status: "updated" });
			});
		}
	}, {
		key: 'delete',
		value: function _delete(req, res) {
			_product2.default.remove({ _id: req.params.id }).then(function (product) {
				if (product) return res.json({ status: "deleted" });

				res.json({ status: "error" });
			});
		}
	}]);

	return ProductControler;
}();

exports.default = ProductControler;