import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { CommonEntity } from "..";
import { MediaEntity } from "../media/media.entity";
import bcrypt from "bcrypt";
import EnvConfiguration from "../../config/env.config";

@Entity("user")
export class UserEntity extends CommonEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique:true})
  email: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async hashUpdatedPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ nullable: false, select:false})
  password: string;

  @Column({ nullable: false, default: false })
  isVerified: boolean;

  @OneToOne(() => MediaEntity)
  @JoinColumn()
  profile: MediaEntity;
}
