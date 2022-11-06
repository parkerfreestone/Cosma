import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserFollowers {
    @PrimaryGeneratedColumn()
    id: number;
}