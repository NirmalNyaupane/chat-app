import { BaseEntity, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { MediaEntity } from "../media/media.entity";
import { Chat } from "../chat/chat.entity";
import { CommonEntity } from "..";

@Entity()
export class Message extends CommonEntity {
    @OneToOne(() => UserEntity, { cascade: true })
    @JoinColumn()
    sender: UserEntity

    @ManyToMany(() => MediaEntity, { cascade: true })
    @JoinTable()
    attatchment: MediaEntity

    @ManyToOne(()=>Chat,{cascade:true})
    chat: Chat
}