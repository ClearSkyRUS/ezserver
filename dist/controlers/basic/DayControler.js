'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _day = require('../../models/basic/day');

var _day2 = _interopRequireDefault(_day);

var _dish = require('../../models/basic/dish');

var _dish2 = _interopRequireDefault(_dish);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DayControler = function () {
	function DayControler() {
		_classCallCheck(this, DayControler);
	}

	_createClass(DayControler, [{
		key: 'index',
		value: function index(req, res) {
			_day2.default.updateMany({}, { $unset: { key: 1, value: 1, text: 1 } }, function (err) {});

			_day2.default.find().populate('meals.meal.dishs.dish').exec(function (err, days) {
				if (err) return res.send(err);
				_dish2.default.find().populate('type').exec(function (err, dishs) {
					if (err) return res.send(err);
					var response = {
						days: days,
						dishs: dishs
					};
					res.json(response);
				});
			});
		}
	}, {
		key: 'create',
		value: function create(req, res) {
			var data = req.body;
			if (data.type === 'Другой') data.type = data.otherType;

			var day = new _day2.default({
				"title": data.title,
				"type": data.type,
				"active": data.active,
				"meals": data.meals
			});

			day.save().then(function () {
				res.send({ status: "ok" });
			});
		}
	}, {
		key: 'update',
		value: function update(req, res) {
			var data = req.body;
			if (data.type === 'Другой') data.type = data.otherType;

			_day2.default.findByIdAndUpdate(req.params.id, { $set: data }, function (err) {
				if (err) return res.send(err);
				res.json({ status: "updated" });
			});
		}
	}, {
		key: 'delete',
		value: function _delete(req, res) {
			_day2.default.remove({ _id: req.params.id }).then(function (day) {
				if (day) return res.json({ status: "deleted" });

				res.json({ status: "error" });
			});
		}
	}]);

	return DayControler;
}();

exports.default = DayControler;