import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { MediaEntity } from "../media/media.entity";
import { Chat } from "../chat/chat.entity";
import { CommonEntity } from "..";

@Entity()
export class Message extends CommonEntity {
    @ManyToMany(() => MediaEntity, { cascade: true })
    @JoinTable()
    attatchment: MediaEntity[]

    @Column({ nullable: true })
    content: string;

    @ManyToOne(() => Chat, { cascade: true })
    chat: Chat

    @ManyToOne(() => UserEntity, (user) => user.message, { cascade: true })
    sender: UserEntity
}