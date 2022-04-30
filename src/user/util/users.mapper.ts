import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserMapper {
  dtoToEntity(userDTO: UserDto): UserEntity {
    return new UserEntity(userDTO.id, userDTO.name, userDTO.lastName);
  }

  entityToDto(userEntity: UserEntity): UserDto {
    return new UserDto(userEntity.userId, userEntity.name, userEntity.lastName);
  }
}
