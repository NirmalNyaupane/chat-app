import {Column, Entity} from 'typeorm';
import { CommonEntity } from '..';

@Entity("media")
export class MediaEntity extends CommonEntity {
    @Column()
    name:string;

    @Column()
    mimeType:string;
}