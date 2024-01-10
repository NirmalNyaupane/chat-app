import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { CommonEntity } from "..";
import { UserEntity } from "../user/user.entity";
import EnvConfiguration from "../../config/env.config";
import bcrypt from "bcrypt";

@Entity("otp")
export class OtpEntity extends CommonEntity {
  @Column({ nullable: false })
  otp: string;

  @BeforeInsert()
  async hashOtp() {
    this.otp = await bcrypt.hash(this.otp, 10);
  }

  @BeforeUpdate()
  async hashUpdatedOtp() {
    this.otp = await bcrypt.hash(this.otp, 10);
  }

  @Column({ type: "timestamp" })
  expiryDate: Date;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
