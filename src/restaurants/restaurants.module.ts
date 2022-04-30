import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RestaurantsController } from './controller/restaurants.controller';
import { RestaurantsService } from './service/restaurants.service';

@Module({
  imports: [HttpModule],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
