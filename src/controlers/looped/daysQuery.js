import DaysQueryModel from '../../models/complecs/daysQuery';
import DayModel from '../../models/basic/day';

import TelegramSend from '../telegram/sendMessagesToAdmins';

class DaysQueryControler {

	index(req, res) {
		DaysQueryModel.find().populate('day').sort('date').exec(function(err, DaysQuerys) {
			if (err)
				return res.send(err);
			res.json(DaysQuerys);
		});
	}

	create(req, res) {
		DayModel.find().exec(function(err, Days) {
			if (err)
				return res.send(err);

			DaysQueryModel.find().sort('date').exec(function(err, DaysQuerys) {
				if (err)
					return res.send(err);

				var data =  new Date();
				data.setHours(4, 0, 0, 0);
				console.log('Старт чека: ' + data)
				if (DaysQuerys.length < 14) {
					console.log('Заполнение очеренди')
					var monday = getMonday(data)
					monday.setDate(monday.getDate() - 1)
					monday.setHours(4, 0, 0, 0);
					console.log('Понедельник: ' + monday)
					var dayNumber = 0;
					for (var i = 0; i < 14; i++) {
						const DaysQuery = new DaysQueryModel({
							"day": Days[dayNumber]._id,
							"date": monday.setDate(monday.getDate() + 1)
						});
						DaysQuery.save();
						dayNumber++;
						if (dayNumber === Days.length)
							dayNumber = 0;
					}
				} else {
					data.setDate(data.getDate() + 1)
					var weakNow = data.getWeek();
					var activeWeak = DaysQuerys[0].date.getWeek();
					console.log(weakNow + " " + activeWeak)
					if (weakNow > activeWeak) {
						console.log('Замена недели')
						var monday = getMonday(data)
						monday.setDate(data.getDate() + 6)
						console.log('Понедельник: ' + monday)
						var dayNumber = getLastDay(DaysQuerys[13].day, Days)
						dayNumber++;
							if (dayNumber === Days.length)
								dayNumber = 0;

						DaysQueryModel.deleteMany({ date: {
								"$gte": DaysQuerys[0].date, 
								"$lt": DaysQuerys[7].date}}, function (err) {
							  		if (err) return handleError(err);
						});
						for (var i = 0; i < 7; i++) {
							console.log('Цикл: ' + i)
							const DaysQuery = new DaysQueryModel({
								"day": Days[dayNumber]._id,
								"date": monday.setDate(monday.getDate() + 1)
							});
							DaysQuery.save();
							dayNumber++;
							if (dayNumber === Days.length)
								dayNumber = 0;
						}
						TelegramSend('Новая неделя, ', 'Давай уже работать, але! Меню составлено!');
					}
				}
			});
		});

		function getLastDay( id, Days ) {
			var dayNumber = 0;
			for (var day of Days) {
				if (day._id.toString() === id.toString())
					return dayNumber;
				dayNumber++;
			}
			return null;
		}

		function getMonday( date ) {
		    var day = date.getDay() || 7;  
		    if( day !== 1 ) 
		        date.setHours(-24 * (day - 1)); 
		    return date; 
		}

		Date.prototype.getWeek = function() {
			var date = new Date(this.getTime());
			date.setHours(0, 0, 0, 0);
			date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
			var week1 = new Date(date.getFullYear(), 0, 4);
			return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
		}
	}

	update(req, res) {
		var newDayStart = req.body.new - 1;
		console.log("data: " + newDayStart)
		DayModel.find().exec(function(err, Days) {
			if (err)
				return res.send(err);

			DaysQueryModel.find().sort('date').exec(function(err, DaysQuerys) {
				if (err)
					return res.send(err);

				for (var i = 7; i < 14; i++) {

					DaysQueryModel.findByIdAndUpdate(DaysQuerys[i].id, { $set: {day: Days[newDayStart]._id} }, err => {});

					newDayStart++;
					if (newDayStart === Days.length)
						newDayStart = 0;
				}
			});
		});
	}


}

export default DaysQueryControler;
