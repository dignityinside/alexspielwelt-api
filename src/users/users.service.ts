import { Injectable } from '@nestjs/common';

// TODO This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'admin',
      password: 'admin123',
    },
    {
      userId: 2,
      username: 'user',
      password: 'user123',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
