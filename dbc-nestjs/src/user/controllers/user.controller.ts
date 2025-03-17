import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';

export class CreateUserDto {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return {
      id: user._id,
      username: user.username,
      createdAt: user.createdAt,
    };
  }
}
