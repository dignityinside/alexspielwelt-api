import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export interface AppConfig {
  port: number;
  logLevel: string;
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

/**
 * App config
 */
export const appConfig = registerAs('app', (): AppConfig => ({
    port: parseInt(process.env.APP_PORT, 10) || 3001,
    logLevel: process.env.APP_LOG_LEVEL,
    jwt: {
      secret: process.env.JWT_SECRET as string,
      expiresIn: process.env.JWT_EXPIRES_IN ?? '30d',
    },
  }),
);
