import { Injectable } from '@nestjs/common';
import { MyDbProvider } from 'src/database/db.provider';
import { User } from 'src/ads/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../controllers/user.controller';

@Injectable()
export class UserService {
  constructor(private readonly dbProvider: MyDbProvider) {}

  async findOne(username: string): Promise<User | undefined> {
    const result = await this.dbProvider.users().findOne({ username }).lean();
    if (!result) {
      return;
    }
    return result;
  }

  async findOneById(userId: string): Promise<User | undefined> {
    const result = await this.dbProvider.users().findById(userId).lean();
    if (!result) {
      return;
    }
    return result;
  }

  async create(data: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const user = await this.dbProvider.users().create({
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      password: hashedPassword, // Store hashed password
      createdAt: new Date(),
    });
    return user;
  }

  async validatePassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
