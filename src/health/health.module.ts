import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { Logger } from 'src/utils/logger';

@Module({
  providers: [Logger],
  controllers: [HealthController]
})
export class HealthModule { }
