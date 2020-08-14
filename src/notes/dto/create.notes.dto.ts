import { IsNotEmpty, IsOptional, IsIn } from "class-validator";
import { NoteStatus } from "../vo/notesStatus.enum";

export { } from "class-validator";

export class CreateNote {

  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsIn([NoteStatus.ACTIVE, NoteStatus.DEPRECATED])
  status: NoteStatus;

}