import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteRepository } from './notes.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NoteRepository]),
    AuthModule
  ],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule { }
