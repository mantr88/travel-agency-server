import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { config } from 'dotenv';

config();



export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'antonpetrenko',
  password: '',
  database: 'travel',
  logging: true,
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  namingStrategy: new SnakeNamingStrategy(),
});