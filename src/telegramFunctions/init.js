import bot from '../core/telegram';
import TlelgramChatModel from '../models/basic/telegramChats';

function initAdmin (msg, match) {
    var name = match[1];
    var chatId = msg.from.id;
    const Chat = new TlelgramChatModel({
		"name": name,
		"ChatId": chatId
	}); 
	Chat.save().then(() => {
		bot.sendMessage(chatId, 'Теперь , ' + name + ', я буду доносить до тебя какую-нибудь информацию, какую смогу, если не сдохну');
	});
};

export default initAdmin;