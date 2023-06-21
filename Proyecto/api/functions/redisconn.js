const Redis = require("ioredis");

const redisConfig = {
    host: `${process.env.REDIS_HOST}`,
    port: 6379,
};

const redisClient = new Redis(redisConfig);

module.exports = redisClient;
