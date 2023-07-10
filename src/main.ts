import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Airtable from 'airtable';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY,
  });
  await app.listen(3000);
}
bootstrap();
