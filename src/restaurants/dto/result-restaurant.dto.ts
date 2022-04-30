import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResultRestaurantDto {
  @IsString()
  @ApiProperty()
  formatted_address: string;

  @IsString()
  @ApiProperty()
  name: string;

  constructor(formatted_address: string, name: string) {
    this.formatted_address = formatted_address;
    this.name = name;
  }
}
