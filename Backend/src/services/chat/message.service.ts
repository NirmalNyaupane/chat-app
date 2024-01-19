import { Chat } from "../../entities/chat/chat.entity";
import { MediaEntity } from "../../entities/media/media.entity";
import { Message } from "../../entities/message/message.entity";
import { UserEntity } from "../../entities/user/user.entity";

interface sendMessageOptions {
    sender: UserEntity,
    attatchment: MediaEntity[] | null | undefined;
    content: string | null | undefined;
    chat: Chat
}
type MessageFilterType = {
    page?: number,
    limit?: number,
}
class MessageService {
    async sendMessage(options: sendMessageOptions) {
        //save 
        const message = new Message();
        if (options.attatchment) {
            message.attatchment = options.attatchment;
        }
        if (options.content) {
            message.content = options.content;
        }
        message.sender = options.sender;
        message.chat = options.chat;

        const messageResponse = await message.save();

        options.chat.lastMessage = messageResponse;
        await options.chat.save();

        return messageResponse;
    }

    async getMessageByChatId(options: MessageFilterType, chatId: string) {
        const builder = Message.createQueryBuilder("message").leftJoinAndSelect("message.chat", "chat").leftJoinAndSelect("message.sender", "user").where("chat.id=:chatId", {
            chatId
        });
        if (options.limit) {
            builder.limit(options.limit);

            if (options.page) {
                const take = (options.page - 1) * options.limit;
                builder.take(take);
            }
        }
        builder.orderBy("message.createdAt", "DESC")
        return await builder.getManyAndCount()
    }

    async findMessageById(messageId: string) {
        const response = await Message.findOne({
            where: {
                id: messageId
            },
            relations: {
                sender: true
            }
        })

        return response;
    }

    async deleteMessage(messageId: string) {
        return await Message.delete({ id: messageId })
    }

    async updateMessage(message: Message, content: string) {
        message.content = content;

        return await message.save();
    }
}

export default new MessageService;