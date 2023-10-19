import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { InjectRepository, handleRetry } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { email } from 'envalid';
import { FindAllUserDto } from './dto/findAll-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { email, password, role, name } = createUserDto;
      const hashedPassword = await hash(password, 2);
      console.log(hashedPassword, email);
      const user = this.userRepo.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      this.userRepo.save(user);
      return 'Succusly';
    } catch (error) {
      throw error;
    }
  }

  async findAll(findAllUserDto: FindAllUserDto) {
    try {
      const { endDate, limit, orderBy, ordering, page, startDate } = findAllUserDto;
      const users = this.userRepo
        .createQueryBuilder('u')
        .select()
        .orderBy(orderBy || "ID", ordering || 'ASC')
        .where('created_at > :startDate', {
          startDate: startDate || new Date(1970),
        })
        .andWhere('u.created_at < :endDate', { endDate: endDate || new Date() })
        .getMany();
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepo.findOneBy({ ID: id });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepo.findOneBy({ ID: id });
      if (!user) {
        throw new BadRequestException(`ID not found`);
      }
      if (updateUserDto.email) {
        const user = await this.userRepo.exist({
          where: { email: updateUserDto.email },
        });
        if (user) {
          throw new BadRequestException(
            `user with email ${updateUserDto.email} already exists`
          )
        }
      }
      const updateUser = await this.userRepo.update({ ID: id }, updateUserDto);
      return;
    } catch (error) {}
  }

  async remove(id: number) {
    await this.userRepo.delete({ ID: id });
    return { succes: true };
  }
}
