import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/role/role.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => [Role])
  role: Role[];
}
