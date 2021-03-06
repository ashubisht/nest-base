import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from './app.module';
import { NestFastifyApplication, FastifyAdapter } from "@nestjs/platform-fastify";

async function bootstrap() {
  // Currently fastify has issues with GraphQL, and therefore fallback to express is used
  // const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('NestJs base demo')
    .setDescription('Users and notes API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
