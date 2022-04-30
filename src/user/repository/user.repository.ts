import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';
import { UserMapper } from '../util/users.mapper';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private mapper: UserMapper,
  ) {}

  getAllUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  getUserById(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne({ where: { userId: id } });
  }

  newUser(UserDto: UserDto): Promise<UserEntity> {
    const newUser = this.mapper.dtoToEntity(UserDto);
    return this.usersRepository.save(newUser);
  }

  async updateUser(id: string, UserDto: UserDto): Promise<UserEntity> {
    UserDto.id = id;
    const updateUser = this.mapper.dtoToEntity(UserDto);
    await this.usersRepository.update(id, updateUser);
    return this.usersRepository.findOne({ where: { userId: id } });
  }

  deleteUser(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  getUserByName(name: string): Promise<UserEntity> {
    return this.usersRepository.findOne({ where: { name: name } });
  }
}
