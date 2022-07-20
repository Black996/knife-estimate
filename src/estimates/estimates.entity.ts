import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Estimate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;
}