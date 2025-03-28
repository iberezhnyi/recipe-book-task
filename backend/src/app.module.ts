import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RecipesModule } from './recipes/recipes.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [RecipesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
