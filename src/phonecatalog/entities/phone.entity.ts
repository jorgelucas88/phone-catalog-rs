import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Model, DataTypes, Sequelize, DataType } from 'sequelize';

@Entity({ orderBy: { id: "DESC" }})
export class Phone {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    dateAdded?: Date;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    manufacturer: string;

    @Column({nullable: true})
    description: string;

    @Column({nullable: true})
    color: string;
    
    @Column({nullable: true})
    price: number;
    
    @Column({nullable: true})
    image?: Buffer;

    @Column({nullable: true})
    screen: string;
    
    @Column({nullable: true})
    processor: string;

    @Column({nullable: true})
    ram: string;
    
    @Column({nullable: true})
    updatedAt?: Date;

    @Column({nullable: true})
    deletedAt?: Date;
}