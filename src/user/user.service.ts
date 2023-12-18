import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/dataSource/entities/user.entity';
import { NewUser, UpdateUser } from 'src/dataSource/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneById(id: string) {
    const result = await this.userRepository.findOneBy({ id });
    console.log('FindOneById result -', result);
    return result;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(newUser: NewUser): Promise<User> {
    return this.userRepository.save(newUser);
  }

  async update(id: string, updatedUser: UpdateUser): Promise<User> {
    await this.userRepository.update(id, updatedUser);
    return this.userRepository.findOneBy({ id });
  }

  async delete(id: string) {
    const result = await this.userRepository.delete(id);
    return result.affected > 0 ? true : false;
  }
}
