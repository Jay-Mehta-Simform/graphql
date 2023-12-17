import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/dataSource/entities/order.entity';
import { User } from 'src/dataSource/entities/user.entity';
import { Product } from 'src/dataSource/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Product])],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
