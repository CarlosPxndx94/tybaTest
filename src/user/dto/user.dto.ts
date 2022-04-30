import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsString()
  @ApiProperty()
  id?: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsString()
  @ApiProperty()
  password: string;

  constructor(id: string, name: string, lastName: string, password: string) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.password = password;
  }
}
