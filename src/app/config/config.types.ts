import { AppConfig } from '@/app/config/app.config';
import { DatabaseConfig } from '@/app/config/database.config';

export interface ConfigType {
  app: AppConfig;
  database: DatabaseConfig;
}
