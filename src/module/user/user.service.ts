import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {hash} from 'bcrypt' 
import { InjectRepository, handleRetry } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo:Repository<User>
  ){}
  async create(createUserDto: CreateUserDto) {
try {
  const {email,password,role,name} = createUserDto
  console.log(createUserDto);
  const hashedPassword = await hash(password,2)
  console.log(hashedPassword);
  const user = this.userRepo.create({
    name,
    email,
    password:hashedPassword,
    role
  })
  this.userRepo.save(user)
  return "Succusly"
} catch (error) {
  throw new error(error)
}
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
