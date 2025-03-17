import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Req,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AdPlacementService } from '../services/ad-placement.service';
import { CreateAdDto } from '../dto/create-ad.dto';
import { AdResponseDto } from '../dto/ad-response.dto';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import 'reflect-metadata';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';

@ApiTags('ads')
@Controller('ads')
export class AdsController {
  constructor(private readonly adsPlacementService: AdPlacementService) {}

  @Get()
  async getUsers(@Req() req: Request) {
    const ads = await this.adsPlacementService.getAds();
    return {
      items: ads.map((ad) => new AdResponseDto(ad, this.getBaseUrl(req))),
      _links: {
        self: { href: `${this.getBaseUrl(req)}/ads` },
      },
      total: ads.length,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() createAdDto: CreateAdDto, @Req() req: Request) {
    const ad = await this.adsPlacementService.createAd(createAdDto);
    return new AdResponseDto(ad, this.getBaseUrl(req));
  }

  @Get('/:id')
  async getUser(@Param('id') userId: number, @Req() req: Request) {
    const ad = await this.adsPlacementService.getAd(userId);
    return new AdResponseDto(ad, this.getBaseUrl(req));
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiOperation({ summary: 'Update an ad' })
  @ApiResponse({
    status: 200,
    description: 'The ad has been successfully updated',
    type: AdResponseDto,
  })
  async updateAd(
    @Param('id') id: number,
    @Body() updateAdDto: CreateAdDto,
    @Req() req: Request,
  ) {
    const ad = await this.adsPlacementService.updateAd(id, updateAdDto);
    if (!ad) {
      throw new NotFoundException(`Ad with ID ${id} not found`);
    }
    return new AdResponseDto(ad, this.getBaseUrl(req));
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an ad' })
  @ApiResponse({
    status: 200,
    description: 'The ad has been successfully deleted',
  })
  async deleteAd(@Param('id') id: number) {
    const ad = await this.adsPlacementService.deleteAd(id);
    if (!ad) {
      throw new NotFoundException(`Ad with ID ${id} not found`);
    }
    return { message: 'Ad deleted successfully' };
  }

  private getBaseUrl(req: Request): string {
    return `${req.protocol}://${req.get('host')}`;
  }
}
