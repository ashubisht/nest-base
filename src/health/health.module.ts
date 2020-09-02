import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { GraphQLHealthResolver } from './health.graphql.resolver';

@Module({
  providers: [GraphQLHealthResolver],
  controllers: [HealthController]
})
export class HealthModule { }
