'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _program = require('../../models/complecs/program');

var _program2 = _interopRequireDefault(_program);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgramControler = function () {
	function ProgramControler() {
		_classCallCheck(this, ProgramControler);
	}

	_createClass(ProgramControler, [{
		key: 'index',
		value: function index(req, res) {
			_program2.default.find().then(function (err, programs) {
				if (err) return res.send(err);
				res.json(programs);
			});
		}
	}, {
		key: 'create',
		value: function create(req, res) {
			var data = req.body;
			if (data.type === 'Другой') data.type = data.otherType;

			var program = new _program2.default({
				"title": data.title,
				"type": data.type,
				"image": data.image,
				"price": data.price,
				"key": data.title,
				"value": data.title,
				"text": data.title,
				"options": data.options,
				"settings": data.settings,
				"portions": data.portions
			});

			program.save().then(function () {
				res.send({ status: "ok" });
			});
		}
	}, {
		key: 'update',
		value: function update(req, res) {
			var data = req.body;
			if (data.type === 'Другой') data.type = data.otherType;

			_program2.default.findByIdAndUpdate(req.params.id, { $set: data }, function (err) {
				if (err) return res.send(err);
				res.json({ status: "updated" });
			});
		}
	}, {
		key: 'delete',
		value: function _delete(req, res) {
			_program2.default.remove({ _id: req.params.id }).then(function (program) {
				if (program) return res.json({ status: "deleted" });

				res.json({ status: "error" });
			});
		}
	}]);

	return ProgramControler;
}();

exports.default = ProgramControler;