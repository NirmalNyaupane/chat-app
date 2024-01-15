import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { CommonEntity } from "..";
import { Message } from "../message/message.entity";
import { UserEntity } from "../user/user.entity";
@Entity()
export class Chat extends CommonEntity {
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, default: false })
    isGroupChat: boolean;

    @OneToOne(() => Message)
    @JoinColumn()
    lastMessage: Message;

    @ManyToMany(() => UserEntity)
    @JoinTable()
    participants: UserEntity[];

    @OneToOne(() => UserEntity, { cascade: true })
    @JoinColumn()
    admin: UserEntity
}