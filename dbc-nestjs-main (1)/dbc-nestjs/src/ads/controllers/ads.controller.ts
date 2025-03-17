import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AdPlacementService } from '../services/ad-placement.service';
import { Ad } from '../interfaces/ad.interface';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsPlacementService: AdPlacementService) {}

  @Post() // import from nestjs
  createUser(@Body() user: Omit<Ad, 'id'>) {
    return this.adsPlacementService.createAd(user);
  }

  @Get('/:id') // import from nestjs
  getUser(@Param('id') userId: number) {
    return this.adsPlacementService.getAd(userId);
  }

  @Get() // import from nestjs
  getUsers() {
    return this.adsPlacementService.getAds();
  }
}
