import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@app/config/config.types';

export class AppConfigService extends ConfigService<ConfigType> {}