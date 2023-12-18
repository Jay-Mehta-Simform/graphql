import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingMiddleware } from './middleware/logger.middleware';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json());
  app.use(new LoggingMiddleware().use);
  app.listen(3000).then(() => console.log('Listening on port 3000'));
}
bootstrap();
