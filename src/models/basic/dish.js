import mongoose, { Schema } from 'mongoose';



const DishSchema = new Schema(
	{
		"title": String,
		"type": String,
		"image": String,
		"gramms": Number,
		"cal": Number,
		"prot": Number,
		"fat": Number,
		"carb": Number,
		"price": Number,
		"key": String, 
		"value": String,
		"text": String,
		"productslist": { type : Array , "default" : [] }
	}
);

const Dish = mongoose.model('Dish', DishSchema);

export default Dish;