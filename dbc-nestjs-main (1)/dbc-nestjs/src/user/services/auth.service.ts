import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async getUser(userId: string) {
    const result = await this.userService.findOneById(userId);
    if (!result) return;
    const { password, ...data } = result;
    return data;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (
      user &&
      (await this.userService.validatePassword(pass, user.password))
    ) {
      const { password, ...result } = user; // Rest operator
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
