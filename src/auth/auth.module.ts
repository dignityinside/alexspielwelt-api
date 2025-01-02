import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppConfigService } from '@/app/config/config.service';
import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { UsersModule } from '@/users/users.module';
import { AuthGuard } from '@/auth/auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: AppConfigService) => ({
        secret: config.get('app').jwt.secret,
        signOptions: {
          expiresIn: config.get('app').jwt.expiresIn,
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    // apply auth guard globally for all routes
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
