import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { CommonEntity } from "..";
import { Message } from "../message/message.entity";
import { UserEntity } from "../user/user.entity";
import { MediaEntity } from "../media/media.entity";
@Entity()
export class Chat extends CommonEntity {
    @Column({ nullable: false })
    @Index()
    name: string;

    @Column({ nullable: false, default: false })
    isGroupChat: boolean;

    @OneToOne(() => Message)
    @JoinColumn()
    lastMessage: Message;

    @ManyToMany(() => UserEntity)
    @JoinTable()
    participants: UserEntity[];

    @ManyToOne(() => UserEntity, (user) => user.chats, { cascade: true })
    admin: UserEntity

    @OneToOne(() => MediaEntity, { cascade: true })
    @JoinColumn()
    avatar: MediaEntity

}