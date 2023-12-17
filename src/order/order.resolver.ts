import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Product } from 'src/dataSource/models/product.model';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { NewOrder, Order, UpdateOrder } from '../dataSource/models/order.model';
import { OrderService } from './order.service';
import { User } from 'src/dataSource/models/user.model';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  @Query(() => [Order])
  async orders() {
    return await this.orderService.findAll();
  }

  @Query(() => Order)
  async order(@Args('id', { type: () => Int }) id: string) {
    console.log('Finding one order');
    return this.orderService.findOne(id);
  }

  @ResolveField(() => [Product])
  async products(@Parent() order: Order) {
    const result = await this.productService.findByIds(order.productIds);
    return result;
  }

  @ResolveField(() => User)
  async user(@Parent() order: Order) {
    const { userId } = order;
    console.log('order', order);
    return this.userService.findOneById(`${userId}`);
  }

  @Mutation(() => Order)
  async createOrder(@Args('input') input: NewOrder) {
    return this.orderService.create(input);
  }

  @Mutation(() => Order)
  async updateOrder(
    @Args('id', { type: () => Int }) id: string,
    @Args('input') input: UpdateOrder,
  ) {
    return this.orderService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteOrder(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.delete(id);
  }
}
