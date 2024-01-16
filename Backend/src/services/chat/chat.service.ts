import { Chat } from "../../entities/chat/chat.entity";
import { MediaEntity } from "../../entities/media/media.entity";
import { UserEntity } from "../../entities/user/user.entity";

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
}

export default new ChatService();