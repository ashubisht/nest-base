import { Controller, Get, Redirect } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';

@Controller('health')
export class HealthController {

  constructor(private logger: LoggerService) { }

  @Get("/")
  healthCheck() {
    this.logger.info("HealthController", "healthCheck", "The logger works fine");
    return "App is up!";
  }

  @Get("/redirect")
  @Redirect("http://www.google.com", 302)
  redirect() {
    return "Redirecting to google";
  }

}
