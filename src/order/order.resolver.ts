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
    const result = await this.orderService.findOne(id);
    console.log(result);
    return result;
  }

  @ResolveField(() => [Product])
  async products(@Parent() order: Order) {
    const result = await this.productService.findByIds(order.productIds);
    return result;
  }

  @ResolveField(() => User)
  async user(@Parent() order) {
    console.log('Resolving the User Field -', order);
    return this.userService.findOneById(`${order.userId}`);
  }

  @Mutation(() => Order)
  async createOrder(@Args('input') input: NewOrder) {
    const result = await this.orderService.create(input);
    console.log('The Created order - ', result);
    return result;
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
