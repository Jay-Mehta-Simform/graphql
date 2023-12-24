import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsPositive } from 'class-validator';

@ObjectType()
export class Order {
  @Field(() => Int)
  id: number;
  @Field()
  @IsPositive()
  totalPrice: number;
  // @Field(() => Int)
  // userId: number;
  // @Field(() => [Int])
  // productIds: number[];
}

@InputType()
export class UpdateOrder {
  @Field(() => Int)
  @IsPositive()
  totalPrice?: number;
  @Field(() => Int)
  userId?: number;
  @Field(() => [Int])
  productIds?: number[];
}

@InputType()
export class NewOrder {
  @Field(() => Int)
  @IsPositive()
  totalPrice: number;
  @Field(() => Int)
  userId: number;
  @Field(() => [Int])
  productIds: number[];
}
