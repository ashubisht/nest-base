import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteRepository } from './notes.repository';
import { User } from 'src/auth/entity/user.entity';
import { CreateNote } from './dto/create.notes.dto';

@Injectable()
export class NotesService {

  constructor(
    @InjectRepository(NoteRepository)
    private noteRepository: NoteRepository
  ) { }


  async getNoteFromId(id: number, user: User) {
    const found = await this.noteRepository.findOne({ where: { id, userId: user.id } });
    if (!found) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    return found;
  }

  async addNote(createNote: CreateNote, user: User) {
    return await this.noteRepository.createNote(createNote, user);
  }
  async deleteNote(id: number, user: User) {
    const result = await this.noteRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
  }
  async updateNote(id: number, note: CreateNote, user: User) {
    const existingNote = await this.getNoteFromId(id, user);
    existingNote.title = note.title;
    existingNote.description = note.description;
    existingNote.status = note.status;
    await existingNote.save();
    return existingNote;
  }

  getNotes(user: User) {
    // return this.noteRepository.getNotes(user);
    return this.noteRepository.find({ userId: user.id });
  }
}
