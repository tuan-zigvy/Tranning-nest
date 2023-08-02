import { DataSource, DataSourceOptions } from 'typeorm';

require('dotenv').config();

export const OrmConfig: DataSourceOptions = {
  host: process.env.DB_HOST,
  type: 'postgres',
  port: parseInt(process.env.DB_PORT as string, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  subscribers: ['dist/**/*.subscribers{.ts,.js}'],
  synchronize: true,
  logging: true,
};

const dataSource = new DataSource(OrmConfig);

export default dataSource;
