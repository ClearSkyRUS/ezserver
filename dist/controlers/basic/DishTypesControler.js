"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dishType = require("../../models/basic/dishType");

var _dishType2 = _interopRequireDefault(_dishType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DishTypesControler = function () {
	function DishTypesControler() {
		_classCallCheck(this, DishTypesControler);
	}

	_createClass(DishTypesControler, [{
		key: "index",
		value: function index(req, res) {
			_dishType2.default.find().then(function (err, dishTypes) {
				if (err) return res.send(err);

				res.json(dishTypes);
				res.end();
				req.destroy();
			});
		}
	}, {
		key: "create",
		value: function create(req, res) {
			var data = req.body;

			var dishType = new _dishType2.default({
				"title": data.title,
				"unit": data.unit,
				"max": data.max,
				"min": data.min,
				"portions": data.portions
			});

			dishType.save().then(function () {
				res.send({ status: "ok" });
				res.end();
				req.destroy();
			});
		}
	}, {
		key: "update",
		value: function update(req, res) {
			var data = req.body;
			_dishType2.default.findByIdAndUpdate(req.params.id, { $set: data }, function (err) {
				if (err) return res.send(err);
				res.json({ status: "updated" });
				res.end();
				req.destroy();
			});
		}
	}, {
		key: "delete",
		value: function _delete(req, res) {
			_dishType2.default.remove({ _id: req.params.id }).then(function (dishType) {
				if (dishType) return res.json({ status: "deleted" });

				res.json({ status: "error" });
				res.end();
				req.destroy();
			});
		}
	}]);

	return DishTypesControler;
}();

exports.default = DishTypesControler;