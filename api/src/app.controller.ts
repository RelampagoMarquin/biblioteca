import { Inject } from '@nestjs/common';
import { Sse } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { channel } from 'diagnostics_channel';
import { RedisClientType } from 'redis';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

interface MessageEvent {
  data: string | object;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject('CACHE_MANAGER') private redisClient : RedisClientType) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse("event")
  sendEvent() : Observable<MessageEvent> {
    return new Observable(subscriber => {
      (async () => {
        let client;

        try {
          client = await this.redisClient.duplicate();
          client.then.connect().then(() => {
            this.redisClient.subscribe("something", (message, channel) => {
              console.log(message)
              subscriber.next({data: message})
            })
          })

        } catch (error) {
          console.log(error)
        }
        return () => {
          console.log("Conexão finalizada");
          subscriber.unsubscribe();
          client.disconnect();
        }
      })();
    })
  }

}
