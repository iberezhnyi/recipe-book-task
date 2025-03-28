import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const port = process.env.PORT || 3000;
  const baseUrl = process.env.API_BASE_URL || 'http://localhost';

  await app.listen(port);
  console.log(`Application is running on: ${baseUrl}:${port}`);
}
bootstrap();
