import { Inject } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { AppService } from './app.service';

interface MessageEvent {
  data: string | object;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
