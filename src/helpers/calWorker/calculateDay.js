import recalculateProcents from './helpers/recalculateProcents'
import checkEnded from './helpers/checkEnded'
import retCals from './helpers/retCals'
import retPieceCal from './helpers/retPieceCal'
import setAllEnded from './helpers/setAllEnded'

import calculateFixed from './typesCalculate/calculateFixed'
import calculatePiece from './typesCalculate/calculatePiece'
import calculateProcent from './typesCalculate/calculateProcent'

function calculateDay(day) {
	var leftCal = day.target;

	leftCal = calculateFixed(day, leftCal);
	checkEnded(day);
	recalculateProcents(day);

	leftCal = calculatePiece(day, leftCal);


	var cicleSaver = 0;
	while (!day.ended) {
		checkEnded(day);
		recalculateProcents(day);

 		var procentResult = calculateProcent(day, leftCal);
		leftCal = procentResult.cal;

		if (procentResult.border) {
			leftCal = retCals(day) + leftCal;
		} else {
			if (leftCal < 80 || leftCal > -80) {
				setAllEnded(day);
			} else {
				leftCal = retPieceCal(day) + leftCal;
				recalculateProcents(day);
				leftCal = calculatePiece(day, leftCal);
				setAllEnded(day);
			}
		}
		
		cicleSaver++;
		if (cicleSaver === 10) {
			setAllEnded(day);
		}
	}
	return day;
}

export default calculateDay;