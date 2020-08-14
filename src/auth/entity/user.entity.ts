import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from "typeorm";
import { Note } from "src/notes/entity/note.entity";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(type => Note, note => note.user, { eager: true })
  notes: Note[];

}