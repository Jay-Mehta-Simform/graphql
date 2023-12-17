import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => Int)
  age: number;
}

@InputType()
export class UpdateUser {
  firstName?: string;
  lastName?: string;
  @Field(() => Int)
  age?: number;
}

@InputType()
export class NewUser {
  firstName: string;
  lastName: string;
  @Field(() => Int)
  age: number;
}
