import { Injectable } from '@nestjs/common';
import { Logger as UltraLog } from "ultralog";

@Injectable()
export class LoggerService extends UltraLog {
  constructor() {
    super("console");
    this.configure({});
  }
}
