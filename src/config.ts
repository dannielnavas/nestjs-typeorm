import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgres: {
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      db: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
    },
    mysql: {
      password: process.env.MYSQL_ROOT_PASSWORD,
      user: process.env.MYSQL_USER,
      db: process.env.MYSQL_DATABASE,
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
    },
    apiKey: process.env.API_KEY,
  };
});
