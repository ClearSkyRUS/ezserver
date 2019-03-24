'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dish = require('../../models/basic/dish');

var _dish2 = _interopRequireDefault(_dish);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DishControler = function () {
	function DishControler() {
		_classCallCheck(this, DishControler);
	}

	_createClass(DishControler, [{
		key: 'index',
		value: function index(req, res) {
			_dish2.default.find().then(function (err, dishs) {
				if (err) return res.send(err);
				res.json(dishs);
			});
		}
	}, {
		key: 'create',
		value: function create(req, res) {
			var data = req.body;
			if (data.type === 'Другой') data.type = data.otherType;

			var dish = new _dish2.default({
				"title": data.title,
				"type": data.type,
				"image": data.image,
				"gramms": data.gramms,
				"cal": data.cal,
				"prot": data.prot,
				"fat": data.fat,
				"carb": data.carb,
				"price": data.price,
				"key": data.title,
				"value": data.title,
				"text": data.title,
				"productslist": data.productslist
			});

			dish.save().then(function () {
				res.send({ status: "ok" });
			});
		}
	}, {
		key: 'update',
		value: function update(req, res) {
			var data = req.body;
			if (data.type === 'Другой') data.type = data.otherType;

			_dish2.default.findByIdAndUpdate(req.params.id, { $set: data }, function (err) {
				if (err) return res.send(err);
				res.json({ status: "updated" });
			});
		}
	}, {
		key: 'delete',
		value: function _delete(req, res) {
			_dish2.default.remove({ _id: req.params.id }).then(function (dish) {
				if (dish) return res.json({ status: "deleted" });

				res.json({ status: "error" });
			});
		}
	}]);

	return DishControler;
}();

exports.default = DishControler;