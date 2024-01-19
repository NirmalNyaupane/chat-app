import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { CommonEntity } from "..";
import { MediaEntity } from "../media/media.entity";
import bcrypt from "bcrypt";
import EnvConfiguration from "../../config/env.config";
import { Chat } from '../chat/chat.entity';
import { Message } from "../message/message.entity";

@Entity("user")
export class UserEntity extends CommonEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: false, default: false })
  isVerified: boolean;

  @OneToOne(() => MediaEntity)
  @JoinColumn()
  profile: MediaEntity;

  @OneToMany(() => Chat, (chat) => chat.admin)
  chats: Chat[]
  
  @OneToMany(()=>Message, (message)=>message.sender)
  message:Message[];
}
