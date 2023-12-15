import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/dataSource/entities/role.entity';
import { User } from 'src/dataSource/entities/user.entity';
import { RoleModule } from 'src/role/role.module';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User]), RoleModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
