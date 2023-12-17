import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;

  @Field({ nullable: false })
  name: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  inventory: number;
}

@InputType()
export class NewProduct {
  @Field()
  name: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  inventory: number;
}

@InputType()
export class UpdateProduct {
  @Field()
  name?: string;

  @Field(() => Int)
  price?: number;

  @Field(() => Int)
  inventory?: number;
}
