import * as process from 'node:process';
import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  type: any;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  name: string;
  synchronize: boolean
}

/**
 * App config
 */
export const databaseConfig = registerAs('database', (): DatabaseConfig  => <DatabaseConfig>({
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: Boolean(process.env.DB_SYNC ?? false)
  }),
);
