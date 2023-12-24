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
    });
  }

  async findProducts(productId: string) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    console.debug(
      'Turbo Log : ~ OrderService ~ findProducts ~ product =',
      product,
    );
    return product;
  }

  async create(input: NewOrder): Promise<Order> {
    const order = this.orderRepository.create(input);
    order.user = await this.userRepository.findOne({
      where: { id: input.userId.toString() },
    });
    if (!order.user) {
      throw new Error('User not found');
    }
    order.product = await this.productRepository.find({
      where: { id: In(input.productIds) },
    });
    if (order.product.length !== input.productIds.length) {
      throw new Error('One or more products not found');
    }
    const result = await this.orderRepository.save(order);
    return result;
  }

  async update(id: string, input: UpdateOrder): Promise<Order> {
    if (Object.keys(input).length === 0) {
      throw new Error('No fields to update');
    }
    const order = await this.orderRepository.findOneBy({ id: Number(id) });
    if (input.productIds) {
      order.product = await this.productRepository.find({
        where: { id: In(input.productIds) },
      });
    }
    if (input.userId) {
      order.user = await this.userRepository.findOne({
        where: { id: input.userId.toString() },
      });
    }
    if (input.totalPrice) {
      order.totalPrice = input.totalPrice;
    }
    return this.orderRepository.save(order);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.orderRepository.delete(id);
    return result.affected > 0;
  }
}
