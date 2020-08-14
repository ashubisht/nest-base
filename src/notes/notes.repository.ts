import { Repository, EntityRepository } from "typeorm";
import { Note } from "./entity/note.entity";
import { CreateNote } from "./dto/create.notes.dto";
import { User } from "src/auth/entity/user.entity";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {

  async getNotes(user: User) {
    const query = this.createQueryBuilder('note');
    query.where('note.userId = :userId', { userId: user.id });
    try {
      const notes = await query.getMany();
      return notes;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }


  async createNote(noteDto: CreateNote, user: User) {
    console.log(noteDto);
    console.log(user);
    const note = new Note();
    note.title = noteDto.title;
    note.description = noteDto.description;
    note.status = noteDto.status;
    note.user = user;
    // note.userId = user.id;
    console.log(note);

    try {
      const savedNote = await note.save();
      delete savedNote.user;
      return savedNote;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }

  }


}