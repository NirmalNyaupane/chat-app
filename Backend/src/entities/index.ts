import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

class CommonEntity extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @CreateDateColumn()
    createdAt:string;

    @DeleteDateColumn()
    deletedAt:string;

    @UpdateDateColumn()
    updatedAt:string;
}

export {CommonEntity};