import mongoose, { Schema } from 'mongoose';



const ClientSchema = new Schema(
	{
		"ref": String,
		"en": String,
		"ru": String
	}
);

const Client = mongoose.model('Client', ClientSchema);

export default Client;