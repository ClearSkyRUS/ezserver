import mongoose, { Schema } from 'mongoose';



const DailySchema = new Schema(
	{
		"consumption": Number,
		"income": Number,
		"endedOrders": Number,
		"bonusesGiven": Number
	},
	{ timestamps: { createdAt: 'created_at' }}
); 

const Daily = mongoose.model('Daily', DailySchema);

export default Daily;