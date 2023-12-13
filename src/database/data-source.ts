// TODO: esto para la actualización de las migraciones de typeorm
// import { DataSource } from 'typeorm';
// import * as dotenv from 'dotenv';

// en el path se coloca el nombre del archivo que se va a leer
// dotenv.config({ path: '.env' });
// export const AppDtaSource = new DataSource({
//   type: 'postgres',
//   url: 'postgres://root:123456@localhost:5432/my_db',
//   host: process.env.DB_HOST, // desde el archivo .env  de dotenv esto para no tener la linea de arriba con toda la configuración expuesta
//   synchronize: false,
//   logging: false,
//   migrations: ['src/database/migrations/*.ts'],
//   migrationsTableName: 'migrations_typeorm',
//   entities: ['src/**/*.entity.ts'],
// });
