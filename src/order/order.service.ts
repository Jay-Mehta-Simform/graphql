import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/dataSource/entities/order.entity';
import { Product } from 'src/dataSource/entities/product.entity';
import { User } from 'src/dataSource/entities/user.entity';
import { NewOrder, UpdateOrder } from 'src/dataSource/models/order.model';
import { In, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: string): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id: Number(id) },
      //relations: ['user', 'product'],
    });
  }

  async create(input: NewOrder): Promise<Order> {
    const order = this.orderRepository.create(input);
    order.user = await this.userRepository.findOne({
      where: { id: input.userId.toString() },
    });
    order.product = await this.productRepository.find({
      where: { id: In(input.productIds) },
    });
    const result = await this.orderRepository.save(order);
    return result;
  }

  async update(id: string, input: UpdateOrder): Promise<Order> {
    if (Object.keys(input).length === 0) {
      throw new Error('No fields to update');
    }
    await this.orderRepository.update(id, input);
    return this.orderRepository.findOneBy({ id: Number(id) });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.orderRepository.delete(id);
    return result.affected > 0;
  }
}
