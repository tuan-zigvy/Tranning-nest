import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(compression());
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: ["'self'", 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
          scriptSrc: ["'self'", "https: 'unsafe-inline'"],
          manifestSrc: ["'self'", 'apollo-server-landing-page.cdn.apollographql.com'],
          frameSrc: ["'self'", 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );
  app.enableCors({ origin: configService.get<string>('URL_CLIENT'), credentials: true });
  await app.listen(configService.get<number>('PORT') || 9000);
}
bootstrap();
