import mongoose, { Schema } from 'mongoose';



const TelegramChatSchema = new Schema(
	{
		"name": String,
		"ChatId": String
	}
);

const TelegramChat = mongoose.model('TelegramChat', TelegramChatSchema);

export default TelegramChat;