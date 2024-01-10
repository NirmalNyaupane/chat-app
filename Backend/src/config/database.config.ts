import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Column, DataSource } from "typeorm";
import EnvConfiguration from "./env.config";
export const AppDataSource = new DataSource({
  type: EnvConfiguration.DB_TYPE as "postgres",
  host: EnvConfiguration.DB_HOST,
  port: +(EnvConfiguration.DB_PORT ?? 5432),
  username: EnvConfiguration.DB_USERNAME,
  password: EnvConfiguration.DB_PASSWORD,
  database: EnvConfiguration.DB_NAME,
  namingStrategy:new SnakeNamingStrategy(),
  synchronize: true,
  logging: true,
  entities: [`${__dirname}/../entities/**/*.entity.ts`],
});