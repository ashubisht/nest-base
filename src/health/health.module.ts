import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { Logger } from 'src/utils/logger';
import { GraphQLHealthResolver } from './health.graphql.resolver';

@Module({
  providers: [Logger, GraphQLHealthResolver],
  controllers: [HealthController]
})
export class HealthModule { }
