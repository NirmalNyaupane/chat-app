import { Chat } from "../../entities/chat/chat.entity";
import { MediaEntity } from "../../entities/media/media.entity";
import { UserEntity } from "../../entities/user/user.entity";
type ChatFilterType = {
    page?: number,
    limit?: number,
    search?: string,
}
class ChatService {
    async findChatById(id: string) {
        return await Chat.findOne({
            where: {
                id: id
            },
            relations: {
                participants: true,
                admin: true
            }
        });
    }
    async findPrivateChatByUserId(userid: string) {
        const builder = await Chat.createQueryBuilder("chat").leftJoinAndSelect("chat.participants", "user").where("user.id=:id", { id: userid })
            .andWhere("chat.isGroupChat=:isGroupChat", {
                isGroupChat: false
            }).getOne();
        return builder;
    }

    async findChatByUserId(userid: string) {
        const builder = await Chat.createQueryBuilder("chat").leftJoinAndSelect("chat.participants", "user").where("user.id=:id", { id: userid }).getOne();
        return builder;
    }

    async findAllChatByUserId(userId: string) {
        const user = await UserEntity.find({
            where: {
                id: userId
            },
            relations: {
                chats: true
            }
        });

        return user;
    }

    async createSingleChat(sender: UserEntity, receiver: UserEntity) {
        const chat = new Chat();
        chat.name = "single chat";
        chat.participants = [sender, receiver]
        return await chat.save();
    }

    async createGroupChat(name: string, admin: UserEntity, participants: UserEntity[], media: MediaEntity | null) {
        console.log(media)
        const chat = new Chat();
        chat.name = name;
        chat.participants = [...participants, admin];
        chat.admin = admin;
        chat.isGroupChat = true;
        if (media) {
            chat.avatar = media
        }
        return await chat.save();
    }

    async findChatAdmin(chatId: string) {
        return await Chat.findOne({
            where: { id: chatId }, relations: {
                admin: true,
                participants: true
            }
        })
    }

    async addParticipants(chat: Chat, newParticipants: UserEntity[]) {
        const participants = [...chat.participants, ...newParticipants];
        chat.participants = participants;
        return await chat.save();
    }

    async removeParticipant(chat: Chat, participantsId: string) {
        chat.participants = chat.participants.filter((participant) => {
            return participant.id !== participantsId;
        })

        return await chat.save();
    }

    async deleteChat(id: string) {
        return await Chat.delete({ id: id });
    }

    async renameChat(chat: Chat, name: string) {
        chat.name = name;
        return await chat.save();
    }

    async getAllChats(options: ChatFilterType, userId: string) {
        const builder = Chat.createQueryBuilder("chat").leftJoinAndSelect("chat.participants", "user")
            .leftJoinAndSelect("chat.admin", "admin")
            .leftJoinAndSelect("chat.lastMessage", "message").where("user.id=:id", { id: userId }).orderBy("chat.updatedAt", "DESC");

        if (options.limit) {
            builder.limit(options.limit);

            if (options.page) {
                const take = (options.page - 1) * options.limit;
                builder.take(take);
            }
        }
    
        if (options.search) {
            // builder.andWhere("chat.name = :name", {
            //     name: `ILIKE %${options.search}%`
            // })
            builder.andWhere('chat.name ILIKE :name', { name: `%${options.search}%` })
        }
        return await builder.getManyAndCount()
    }
}

export default new ChatService();