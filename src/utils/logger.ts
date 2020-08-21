import { Injectable } from "@nestjs/common";
import { Logger as UltraLog } from "ultralog";


@Injectable()
export class Logger extends UltraLog {

  constructor() {
    super("console");
    this.configure({});
  }

}