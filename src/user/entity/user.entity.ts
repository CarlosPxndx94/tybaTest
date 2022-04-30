import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  lastName: string;

  constructor(userId: string, name: string, lastName: string) {
    this.userId = userId;
    this.name = name;
    this.lastName = lastName;
    console.log('Creo User Entity para ' + this.name);
  }
}
