import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResultRestaurantDto } from '../dto/result-restaurant.dto';
import { RestaurantsService } from '../service/restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get(':ciudad')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateUser(@Param('ciudad') ciudad: string) {
    return this.restaurantsService.findAll(ciudad);
  }
}
