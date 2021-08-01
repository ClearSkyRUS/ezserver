import calculateDay from './calculateDay'

function getCalForPrograms(programs, days) {
	var mPrograms = []
	for (var program of programs) {
		var mProgram = {"_id": program._id, "title": program.title, "type": program.type, "public": program.public, "settings": program.settings, "options": []}
		for (var option of program.options) {
			var optionObj = null;
			if (option._doc)
				optionObj = option._doc
			else 
				optionObj = option
			
			var mOption = {...optionObj, "days": []}
			for (var day of days) {
				var mDay = {
			        "title": day.title,
			        "target": option.cal,
			        "ended": false,
			        "meals": []
			    }
			    for (var meal of day.meals) { 
			    	if (program.settings.find(o => o.title === meal.title).auto ||
			    		program.settings.find(o => o.title === meal.title).types.length !== 0) {
				        var mMeal = {
					        "title": meal.title,
					        "target": meal.procent,
					        "ended": false,
					        "meal":[]
				        }
			            for (var dishs of meal.meal) { 
			            	if ((program.settings.find(o => o.title === meal.title).auto && dishs.main) || 
				            	(program.settings.find(o => o.title === meal.title).types.indexOf(dishs.type) !== -1)) {
					            var mDishs = {
						          	"type": dishs.type,
						            "ended": false,
						            "dishs":[]
					            }
				               	for (var dish of dishs.dishs) { 
					                var mDish = {
					                  	"dish": dish.dish,
					                  	"target": dish.procent,
					                    "ended": false
					                }
				                   	mDishs.dishs.push(mDish)
				               	}
				               	mMeal.meal.push(mDishs)
				            }
			            }
			           	mDay.meals.push(mMeal)
			        }
		        }
		        mOption.days.push(calculateDay(mDay))
			}
			mProgram.options.push(mOption)
		}
		mPrograms.push(mProgram)
	}
	return mPrograms
}

export default getCalForPrograms;