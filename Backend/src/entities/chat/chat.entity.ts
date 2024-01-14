import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { CommonEntity } from "..";
import { UserEntity } from "../user/user.entity";
import { Message } from "../message/message.entity";
@Entity()
export class Chat extends CommonEntity {
    @Column({nullable:false})
    name: string;

    @Column({nullable:false, default:false})
    isGroupChat: boolean;

    @OneToOne(() => Message)
    @JoinColumn()
    lastMessage: Message;

    @ManyToMany(() => UserEntity)
    participants: UserEntity;

    @OneToOne(()=>UserEntity,{cascade:true})
    @JoinColumn()
    admin: UserEntity
}