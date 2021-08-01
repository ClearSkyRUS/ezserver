import { DayModel, ProgramModel } from '../../models'
import { getDay, getCalForPrograms } from '../../helpers'

class ProgramControler {

	index(req, res) {
		ProgramModel.find().exec(( err, programs ) => {
			if (err)
				return res.send(err);
			DayModel.find().populate({
		        path: 'meals.meal.dishs.dish',
		        populate: {
		            path: 'type productslist.product'
		        }
    		}).exec(( err, days ) => {
				if (err)
					return res.send(err);

				var settings = [];
				for (var meal of days[0].meals) {
					var set = {
			        	"title": meal.title,
			        	"types": []
			        }
			        for (var mealItem of meal.meal) {
			        	set.types.push(mealItem.type)
			        }
			        settings.push(set)
				}


				var jsonObj = {
					"programs": getCalForPrograms(programs, days),
					"settings": settings
				}
				res.json(jsonObj);
			});
		});
	}

	create(req, res) {
		var data = req.body;

		const program = new ProgramModel({
			"title": data.title,
			"public": data.public,
			"image": data.image,
			"options":  data.options,
			"settings":  data.settings
		});

		program.save().then(() => {
			res.send({ status: "ok" });
		});
	}

	update(req, res) {
		var data = req.body;

		ProgramModel.findByIdAndUpdate(req.params.id, { $set: data }, err => {
			if (err)
				return res.send(err);
			res.json({ status: "updated" });
		});
	}

	delete(req, res) {
		ProgramModel.remove({ _id: req.params.id}).then( program => {
			if (program) 
				return res.json({ status: "deleted" });

			res.json({ status: "error" });
		});
	}
}

export default ProgramControler;