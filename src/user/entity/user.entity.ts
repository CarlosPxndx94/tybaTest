import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'varchar', length: 70, nullable: true })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compareSync(password, this.password);
  }

  constructor(
    userId: string,
    name: string,
    lastName: string,
    password: string,
  ) {
    this.userId = userId;
    this.name = name;
    this.lastName = lastName;
    this.password = password;
    console.log('Creo User Entity para ' + this.name);
  }
}
