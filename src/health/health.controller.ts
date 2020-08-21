import { Controller, Get } from '@nestjs/common';
import { Logger } from 'src/utils/logger';

@Controller('health')
export class HealthController {

  constructor(private logger: Logger) { }

  @Get("/")
  healthCheck() {
    this.logger.info("HealthController", "healthCheck", "The logger works fine");
    return "App is up!";
  }

}
