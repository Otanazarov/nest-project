import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn } from "typeorm";
@Entity()
export class RootEntity{
    
        @PrimaryGeneratedColumn()
        ID: number;
      
        @Column()
        name: string;
      
        @CreateDateColumn()
        createdAt: Date;
      
        @UpdateDateColumn()
        updateAt: Date;
}