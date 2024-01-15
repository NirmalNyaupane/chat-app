import { Chat } from "../../entities/chat/chat.entity";
import { MediaEntity } from "../../entities/media/media.entity";
import { UserEntity } from "../../entities/user/user.entity";

class ChatService {
    async findChatById(id: string) {
        return await Chat.findOneBy({ id: id });
    }

    async findChatByUserId(userid: string) {
        const builder = await Chat.createQueryBuilder("chat").leftJoinAndSelect("chat.participants", "user").where("user.id=:id", { id: userid }).getOne();
        console.log(builder);
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
}

export default new ChatService();