'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _recalculateProcents = require('./helpers/recalculateProcents');

var _recalculateProcents2 = _interopRequireDefault(_recalculateProcents);

var _checkEnded = require('./helpers/checkEnded');

var _checkEnded2 = _interopRequireDefault(_checkEnded);

var _retCals = require('./helpers/retCals');

var _retCals2 = _interopRequireDefault(_retCals);

var _retPieceCal = require('./helpers/retPieceCal');

var _retPieceCal2 = _interopRequireDefault(_retPieceCal);

var _setAllEnded = require('./helpers/setAllEnded');

var _setAllEnded2 = _interopRequireDefault(_setAllEnded);

var _calculateFixed = require('./typesCalculate/calculateFixed');

var _calculateFixed2 = _interopRequireDefault(_calculateFixed);

var _calculatePiece = require('./typesCalculate/calculatePiece');

var _calculatePiece2 = _interopRequireDefault(_calculatePiece);

var _calculateProcent = require('./typesCalculate/calculateProcent');

var _calculateProcent2 = _interopRequireDefault(_calculateProcent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculateDay(day) {
	var leftCal = day.target;

	leftCal = (0, _calculateFixed2.default)(day, leftCal);
	(0, _checkEnded2.default)(day);
	(0, _recalculateProcents2.default)(day);

	leftCal = (0, _calculatePiece2.default)(day, leftCal);

	var cicleSaver = 0;
	while (!day.ended) {
		(0, _checkEnded2.default)(day);
		(0, _recalculateProcents2.default)(day);

		var procentResult = (0, _calculateProcent2.default)(day, leftCal);
		leftCal = procentResult.cal;

		if (procentResult.border) {
			leftCal = (0, _retCals2.default)(day) + leftCal;
		} else {
			if (leftCal < 80 || leftCal > -80) {
				(0, _setAllEnded2.default)(day);
			} else {
				leftCal = (0, _retPieceCal2.default)(day) + leftCal;
				(0, _recalculateProcents2.default)(day);
				leftCal = (0, _calculatePiece2.default)(day, leftCal);
				(0, _setAllEnded2.default)(day);
			}
		}

		cicleSaver++;
		if (cicleSaver === 10) {
			(0, _setAllEnded2.default)(day);
		}
	}
	return day;
}

exports.default = calculateDay;