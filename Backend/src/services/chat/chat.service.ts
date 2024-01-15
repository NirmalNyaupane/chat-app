import { Chat } from "../../entities/chat/chat.entity";
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

    async createSingleChat(sender:UserEntity, receiver:UserEntity){
        const chat = new Chat();
        chat.name="single chat";
        chat.participants=[sender, receiver]
        return await chat.save();
    }
}

export default new ChatService();