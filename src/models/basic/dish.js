import mongoose, { Schema } from 'mongoose';



const DishSchema = new Schema(
	{
		"title": String,
		"tehMap": String,
		"type": { type: Schema.Types.ObjectId, ref: 'DishType' },
		"image": String,
		"gramms": Number,
		"productslist": [{
			"id": String,
			"product": { type: Schema.Types.ObjectId, ref: 'Product' },
			"gramm": Number,
			"cold": Boolean,
			"hot": Boolean,  
			"ganes": Boolean  
		}]
	}
);

const Dish = mongoose.model('Dish', DishSchema);

export default Dish;