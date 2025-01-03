import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '@/auth/dto/create-user.dto';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  /**
   * Sign in user
   * @param username
   * @param pass
   */
  async login(username: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneBy(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!(await this.verifyPassword(pass, user.passwordHash))) {
      throw new UnauthorizedException();
    }

    const { passwordHash, ...result } = user;

    const payload = { sub: user.id, username: user.username, roles: user.roles };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  /**
   * Register a new user
   * @param createUserDto
   */
  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOneBy(createUserDto.username);

    if (existingUser) {
      throw new ConflictException();
    }

    const hashedPassword = await this.hashPassword(createUserDto.password);

    const createUser = {
      username: createUserDto.username,
      name: createUserDto.name,
      email: createUserDto.email,
      passwordHash: hashedPassword,
    };

    return await this.usersService.create(createUser);
  }

  /**
   * Returns hashed password
   * @param password
   */
  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Verify password
   * @param plainPassword
   * @param hashedPassword
   */
  public async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
