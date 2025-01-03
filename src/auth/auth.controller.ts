import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { Public } from '@/auth/public.decorator';
import { User } from '@/users/entities/user.entity';
import { CreateUserDto } from '@/auth/dto/create-user.dto';
import { LoginUserDto } from '@/auth/dto/login-user.dto';
import { Roles } from '@/auth/roles.decorator';
import { Role } from '@/auth/role.enum';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  /**
   * Register new user
   * @param createUserDto
   */
  @Post('register')
  @Public()
  @ApiOperation({ summary: 'This action register a new user.' })
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.register(createUserDto);
  }

  /**
   * Sign in a user
   * @param loginUserDto
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  @ApiOperation({ summary: 'This action login a user.' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto.username, loginUserDto.password);
  }

  /**
   * Returns user profile
   * @param request
   */
  @Get('profile')
  @Roles(Role.User)
  @ApiOperation({ summary: 'This action show user profile.' })
  @ApiBearerAuth()
  async profile(@Request() request) {
    return request.user;
  }
}
