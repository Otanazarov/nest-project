import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn } from "typeorm";
@Entity()
export class RootEntity{
        @PrimaryGeneratedColumn()
        ID: number;
      
        @Column()
        name: string;
      
        @CreateDateColumn()
        created_at: Date;
      
        @UpdateDateColumn()
        update_at: Date;
}