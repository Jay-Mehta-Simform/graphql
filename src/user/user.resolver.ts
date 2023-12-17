import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewUser, UpdateUser, User } from '../dataSource/models/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async user(@Args('id', { type: () => Int }) id: string) {
    return this.userService.findOneById(id);
  }

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: NewUser) {
    return this.userService.create(input);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: string,
    @Args('input') input: UpdateUser,
  ) {
    return this.userService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Args('id', { type: () => Int }) id: string,
  ): Promise<Boolean> {
    return this.userService.delete(id);
  }
}
