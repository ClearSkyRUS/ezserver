'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _daysQuery = require('../../models/complecs/daysQuery');

var _daysQuery2 = _interopRequireDefault(_daysQuery);

var _day = require('../../models/basic/day');

var _day2 = _interopRequireDefault(_day);

var _sendMessagesToAdmins = require('../telegram/sendMessagesToAdmins');

var _sendMessagesToAdmins2 = _interopRequireDefault(_sendMessagesToAdmins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DaysQueryControler = function () {
	function DaysQueryControler() {
		_classCallCheck(this, DaysQueryControler);
	}

	_createClass(DaysQueryControler, [{
		key: 'index',
		value: function index(req, res) {
			_daysQuery2.default.find().populate('day').sort('date').exec(function (err, DaysQuerys) {
				if (err) return res.send(err);
				res.json(DaysQuerys);
			});
		}
	}, {
		key: 'create',
		value: function create(req, res) {
			_day2.default.find().exec(function (err, Days) {
				if (err) return res.send(err);

				_daysQuery2.default.find().sort('date').exec(function (err, DaysQuerys) {
					if (err) return res.send(err);

					var data = new Date();
					data.setHours(4, 0, 0, 0);
					console.log('Старт чека: ' + data);
					if (DaysQuerys.length < 14) {
						console.log('Заполнение очеренди');
						var monday = getMonday(data);
						monday.setDate(monday.getDate() - 1);
						monday.setHours(4, 0, 0, 0);
						console.log('Понедельник: ' + monday);
						var dayNumber = 0;
						for (var i = 0; i < 14; i++) {
							var DaysQuery = new _daysQuery2.default({
								"day": Days[dayNumber]._id,
								"date": monday.setDate(monday.getDate() + 1)
							});
							DaysQuery.save();
							dayNumber++;
							if (dayNumber === Days.length) dayNumber = 0;
						}
					} else {
						data.setDate(data.getDate() + 1);
						var weakNow = data.getWeek();
						var activeWeak = DaysQuerys[0].date.getWeek();

						if (weakNow > activeWeak) {

							var monday = getMonday(data);
							monday.setDate(data.getDate() + 6);

							var dayNumber = getLastDay(DaysQuerys[13].day, Days);
							dayNumber++;
							if (dayNumber === Days.length) dayNumber = 0;

							_daysQuery2.default.deleteMany({ date: {
									"$gte": DaysQuerys[0].date,
									"$lt": DaysQuerys[7].date } }, function (err) {
								if (err) return handleError(err);
							});
							for (var i = 0; i < 7; i++) {
								console.log('Цикл: ' + i);
								var _DaysQuery = new _daysQuery2.default({
									"day": Days[dayNumber]._id,
									"date": monday.setDate(monday.getDate() + 1)
								});
								_DaysQuery.save();
								dayNumber++;
								if (dayNumber === Days.length) dayNumber = 0;
							}
							(0, _sendMessagesToAdmins2.default)('Новая неделя, ', 'Давай уже работать, але! Меню составлено!');
						}
					}
				});
			});

			function getLastDay(id, Days) {
				var dayNumber = 0;
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = Days[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var day = _step.value;

						if (day._id.toString() === id.toString()) return dayNumber;
						dayNumber++;
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

				return null;
			}

			function getMonday(date) {
				var day = date.getDay() || 7;
				if (day !== 1) date.setHours(-24 * (day - 1));
				return date;
			}

			Date.prototype.getWeek = function () {
				var date = new Date(this.getTime());
				date.setHours(0, 0, 0, 0);
				date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
				var week1 = new Date(date.getFullYear(), 0, 4);
				return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
			};
		}
	}, {
		key: 'update',
		value: function update(req, res) {
			var newDayStart = req.body.new - 1;
			console.log("data: " + newDayStart);
			_day2.default.find().exec(function (err, Days) {
				if (err) return res.send(err);

				_daysQuery2.default.find().sort('date').exec(function (err, DaysQuerys) {
					if (err) return res.send(err);

					for (var i = 7; i < 14; i++) {

						_daysQuery2.default.findByIdAndUpdate(DaysQuerys[i].id, { $set: { day: Days[newDayStart]._id } }, function (err) {});

						newDayStart++;
						if (newDayStart === Days.length) newDayStart = 0;
					}
				});
			});
		}
	}]);

	return DaysQueryControler;
}();

exports.default = DaysQueryControler;