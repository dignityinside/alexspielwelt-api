import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export interface AppConfig {
  port: number;
}

/**
 * App config
 */
export const appConfig = registerAs('app', (): AppConfig => ({
    port: parseInt(process.env.PORT, 10) || 3001,
  }),
);
