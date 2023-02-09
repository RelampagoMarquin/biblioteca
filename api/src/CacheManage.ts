import { createClient } from '@redis/client'

export const CacheRedis = {
    provide: 'CACHE_MANAGER',
    useFactory: async () => {
      const client = createClient({
        url: 'redis://localhost:6379'
      })
      await client.connect();
      return client;
    },
}
