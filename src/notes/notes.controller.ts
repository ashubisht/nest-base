import { Controller, Get, Post, Patch, Delete, Param, ParseIntPipe, UsePipes, ValidationPipe, Body, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { User } from '../auth/entity/user.entity';
import { CreateNote } from './dto/create.notes.dto';
import { RequestUser } from "../auth/auth.decorator";
import { AuthGuard } from '@nestjs/passport';
import { NoteValidation } from './pipes/addnotes.pipe';

@Controller('notes')
@UseGuards(AuthGuard())
export class NotesController {

  constructor(private notesService: NotesService) { }

  @Get("/")
  getNotes(@RequestUser() user: User) {
    return this.notesService.getNotes(user);
  }

  @Get("/:id")
  getNoteFromId(
    @Param("id", ParseIntPipe) id: number,
    @RequestUser() user: User
  ) {
    return this.notesService.getNoteFromId(id, user);
  }

  @Post("/")
  @UsePipes(NoteValidation, ValidationPipe)
  addNote(@Body() note: CreateNote, @RequestUser() user: User) {
    // console.log("Controller: ", note);
    // console.log("User: ", user);
    // return "success";
    return this.notesService.addNote(note, user);
  }

  @Patch("/")
  updateNote(
    @Param('id', ParseIntPipe) id: number,
    @RequestUser() note: CreateNote,
    user: User
  ) {
    return this.notesService.updateNote(id, note, user);
  }

  @Delete("/:id")
  deleteNote(@Param('id', ParseIntPipe) id: number,
    @RequestUser() user: User) {
    return this.notesService.deleteNote(id, user);
  }

}
