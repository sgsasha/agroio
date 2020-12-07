import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
      .setTitle('Agroio')
      .setDescription('The Agroio API description')
      .setVersion('1.0')
      .addBearerAuth({ in: 'header', type: 'http' })
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors(); // protection
  await app.listen(process.env.PORT || '801');
}
bootstrap();
