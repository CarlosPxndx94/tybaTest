import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { UserEntity } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { UserMapper } from '../util/users.mapper';

@Injectable()
export class UserService {
  constructor(
    private usersRepository: UserRepository,
    private mapper: UserMapper,
  ) {}

  async getAllUsers(): Promise<UserDto[]> {
    const users: UserEntity[] = await this.usersRepository.getAllUsers();
    return users.map((user) => this.mapper.entityToDto(user));
  }

  async getUserById(id: string): Promise<UserDto> {
    const user: UserEntity = await this.usersRepository.getUserById(id);
    return this.mapper.entityToDto(user);
  }

  async newUser(UserDto: UserDto): Promise<UserDto> {
    const newUser: UserEntity = await this.usersRepository.newUser(UserDto);
    return this.mapper.entityToDto(newUser);
  }

  async updateUser(id: string, UserDto: UserDto): Promise<UserDto> {
    const updateUser = await this.usersRepository.updateUser(id, UserDto);
    return this.mapper.entityToDto(updateUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.deleteUser(id);
  }

  async getUserByName(name: string): Promise<UserEntity> {
    return await this.usersRepository.getUserByName(name);
  }
  
}
