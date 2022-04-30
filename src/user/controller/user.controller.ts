import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserDto[]> {
    return await this.usersService.getAllUsers();
  }

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getUserById(@Request() req: any): Promise<UserDto> {
    const { id } = req.user;
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

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.usersService.deleteUser(id);
  }
}
