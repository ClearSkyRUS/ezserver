'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _program = require('../../models/complecs/program');

var _program2 = _interopRequireDefault(_program);

var _day = require('../../models/basic/day');

var _day2 = _interopRequireDefault(_day);

var _getCalForPrograms = require('../../helpers/calWorker/getCalForPrograms');

var _getCalForPrograms2 = _interopRequireDefault(_getCalForPrograms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgramControler = function () {
	function ProgramControler() {
		_classCallCheck(this, ProgramControler);
	}

	_createClass(ProgramControler, [{
		key: 'index',
		value: function index(req, res) {
			_program2.default.find().exec(function (err, programs) {
				if (err) return res.send(err);
				_day2.default.find().populate({
					path: 'meals.meal.dishs.dish',
					populate: {
						path: 'type productslist.product'
					}
				}).exec(function (err, days) {
					if (err) return res.send(err);

					var settings = [];
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = days[0].meals[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var meal = _step.value;

							var set = {
								"title": meal.title,
								"types": []
							};
							var _iteratorNormalCompletion2 = true;
							var _didIteratorError2 = false;
							var _iteratorError2 = undefined;

							try {
								for (var _iterator2 = meal.meal[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
									var mealItem = _step2.value;

									set.types.push(mealItem.type);
								}
							} catch (err) {
								_didIteratorError2 = true;
								_iteratorError2 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion2 && _iterator2.return) {
										_iterator2.return();
									}
								} finally {
									if (_didIteratorError2) {
										throw _iteratorError2;
									}
								}
							}

							settings.push(set);
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}

					var jsonObj = {
						"programs": (0, _getCalForPrograms2.default)(programs, days),
						"settings": settings
					};
					res.json(jsonObj);
				});
			});
		}
	}, {
		key: 'create',
		value: function create(req, res) {
			var data = req.body;

			var program = new _program2.default({
				"title": data.title,
				"public": data.public,
				"image": data.image,
				"options": data.options,
				"settings": data.settings
			});

			program.save().then(function () {
				res.send({ status: "ok" });
			});
		}
	}, {
		key: 'update',
		value: function update(req, res) {
			var data = req.body;

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