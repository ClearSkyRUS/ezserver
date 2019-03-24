import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema(
	{
		"title": String,
		"type": String,
		"prot": Number,
		"fat": Number,
		"carb": Number,
		"price": Number,
		"cold": { 
	    type: Number, 
	    default: 0, 
	    }, 
		"hot": { 
	    type: Number, 
	    default: 0, 
	    }, 
		"ganes": { 
	    type: Number, 
	    default: 0, 
	    }, 
		"key": String, 
		"value": String,
		"text": String
	}
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;