import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello/:name')
  getHello(
    @Param('name') name: string,
    @Query('lastName') lastName: string,
  ): string {
    return this.appService.getHello(name + ' ' + lastName);
  }
}
