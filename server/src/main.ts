import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const url = configService.get('CLIENT_URL');
  app.enableCors({ origin: url });

  const port = configService.get('PORT');
  await app.listen(port);
}

bootstrap();
