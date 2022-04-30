import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserDto[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    return await this.usersService.getUserById(id);
  }

  @Post()
  async newUser(@Body() user: UserDto): Promise<UserDto> {
    return await this.usersService.newUser(user);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: UserDto,
  ): Promise<UserDto> {
    return await this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.usersService.deleteUser(id);
  }
}
