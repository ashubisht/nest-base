import { PipeTransform, ArgumentMetadata, BadRequestException, Injectable } from "@nestjs/common";
import { CreateNoteRequest, CreateNote } from "../dto/create.notes.dto";
import { NoteStatus } from "../vo/notesStatus.enum";

@Injectable()
export class NoteValidation implements PipeTransform {

  private readonly expectedStatus = [
    NoteStatus.ACTIVE
  ]

  transform(value: any, metadata: ArgumentMetadata) {

    if (metadata.type === "body") {
      console.log("PipeValue: ", value);

      const found = this.expectedStatus.map(status => {
        if (status.toString() === value.status) {
          return status;
        }
      });
      if (found.length === 0) {
        throw new BadRequestException();
      }

      return {
        title: value.subject,
        description: value.body,
        status: found[0]
      }
    }

    return value;
  }

}