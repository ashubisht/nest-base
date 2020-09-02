import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from './config/typeOrmConfig';
import { GraphQLModule } from '@nestjs/graphql';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      introspection: true,
      context: ({ req }): unknown => {
        return {req};
      }
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    NotesModule,
    AuthModule,
    HealthModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
