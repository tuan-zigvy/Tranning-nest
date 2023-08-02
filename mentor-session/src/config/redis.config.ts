export default (): Record<string, string> => ({
  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT,
  redis_password: process.env.REDIS_PASSWORD,
  redis_name: process.env.REDIS_NAME,
});
