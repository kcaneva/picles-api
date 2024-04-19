import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      appName: 'Picles API',
      version: '0.0.1',
      author: 'Kléber Caneva',
    };
  }
}
