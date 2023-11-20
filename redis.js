import redis, { createClient } from 'redis';
export const redisClient = createClient({ socket: { port: 6379, host: 'localhost' }, legacyMode: true });
