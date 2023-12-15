import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/dataSource/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findOneById(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
