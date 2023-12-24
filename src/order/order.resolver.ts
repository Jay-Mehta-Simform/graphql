import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from 'src/dataSource/models/user.model';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { NewOrder, UpdateOrder } from '../dataSource/models/order.model';
import { Order } from '../dataSource/models/order.model';
import { OrderService } from './order.service';
import { Product } from 'src/dataSource/models/product.model';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  @Query(() => [Order])
  async orders() {
    return this.orderService.findAll();
  }

  @Query(() => Order)
  async order(@Args('id', { type: () => Int }) id: string) {
    const result = await this.orderService.findOne(id);
    return result;
  }

  @ResolveField(() => User)
  async user(@Parent() order: Order) {
    return this.userService.findOneById(`${order.id}`);
  }

  @ResolveField(() => [Product])
  async product(@Parent() order: Order) {
    return this.productService.findByOrder(order.id);
  }

  @Mutation(() => Order)
  async createOrder(@Args('input') input: NewOrder) {
    return await this.orderService.create(input);
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
