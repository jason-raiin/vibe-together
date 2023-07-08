import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Nest');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const CLIENT_URL = configService.get('CLIENT_URL');
  const PORT = configService.get('PORT');

  app.enableCors({ origin: CLIENT_URL });
  await app.listen(PORT);

  const server = app.getHttpServer();
  const router = server._events.request._router;
  const routes = router.stack
    .map((layer) => {
      if (layer.route) {
        const path = layer.route?.path;
        const method = layer.route?.stack[0].method.toUpperCase();
        return `${method} ${path}`;
      }
    })
    .filter((route: string) => route);

  logger.log(routes);
}

bootstrap();
