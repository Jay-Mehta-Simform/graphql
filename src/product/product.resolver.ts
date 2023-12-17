import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  NewProduct,
  Product,
  UpdateProduct,
} from '../dataSource/models/product.model';
import { ProductService } from './product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  async products() {
    return this.productService.findAll();
  }

  @Query(() => Product)
  async product(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  async createProduct(@Args('input') input: NewProduct) {
    return this.productService.create(input);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('input') input: UpdateProduct,
  ) {
    return this.productService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('id') id: string) {
    const result = await this.productService.delete(id);
    return result.affected > 0 ? true : false;
  }
}
