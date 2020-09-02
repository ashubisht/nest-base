import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from './app.module';
// import { NestFastifyApplication, FastifyAdapter } from "@nestjs/platform-fastify";
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  // const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
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
