"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Client = require("../../models/basic/Client");

var _Client2 = _interopRequireDefault(_Client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClientControler = function () {
	function ClientControler() {
		_classCallCheck(this, ClientControler);
	}

	_createClass(ClientControler, [{
		key: "index",
		value: function index(req, res) {
			_Client2.default.find().then(function (err, Clients) {
				if (err) return res.send(err);
				res.json(Clients);
			});
		}
	}, {
		key: "create",
		value: function create(req, res) {
			var data = req.body;

			var Client = new _Client2.default({
				"name": data.name,
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

			Client.save().then(function () {
				res.send({ status: "ok" });
			});
		}
	}, {
		key: "update",
		value: function update(req, res) {
			var data = req.body;
			if (data.type === 'Другой') data.type = data.otherType;

			_Client2.default.findByIdAndUpdate(req.params.id, { $set: data }, function (err) {
				if (err) return res.send(err);
				res.json({ status: "updated" });
			});
		}
	}, {
		key: "delete",
		value: function _delete(req, res) {
			_Client2.default.remove({ _id: req.params.id }).then(function (Client) {
				if (Client) return res.json({ status: "deleted" });

				res.json({ status: "error" });
			});
		}
	}]);

	return ClientControler;
}();

exports.default = ClientControler;