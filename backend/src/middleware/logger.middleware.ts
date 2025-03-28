import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const responseTime = Date.now() - start;
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      console.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength || '0'}B - ${responseTime}ms`,
      );
    });

    next();
  }
}
