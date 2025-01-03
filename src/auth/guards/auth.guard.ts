import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@/auth/decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector
  ) {}

  /**
   * Check can access the route
   * @param context
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (this.isPublic(context)) {
      return true;
    }

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      request['user'] = await this.getUserFromToken(token);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  /**
   * Extract jwt token from header
   * @param request
   * @private
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  /**
   * Check route is public
   * @param context
   * @private
   */
  private isPublic(context): boolean {
    return this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()]
    );
  }

  /**
   * Verify token and returns user data
   * @param token
   * @private
   */
  private async getUserFromToken(token) {
    return await this.jwtService.verifyAsync(
      token,
      { secret: this.configService.get('app').jwt.secret }
    );
  }
}
