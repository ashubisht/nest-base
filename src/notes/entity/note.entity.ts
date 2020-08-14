import { } from "@nestjs/common";
import { PrimaryGeneratedColumn, Column, BaseEntity, Entity, ManyToOne } from "typeorm";
import { User } from "src/auth/entity/user.entity";

@Entity()
export class Note extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @ManyToOne(type => User, user => user.notes, { eager: false })
  user: User;

}