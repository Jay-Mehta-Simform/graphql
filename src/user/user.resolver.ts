import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { RoleService } from 'src/role/role.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  @Query(() => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOneById(id);
  }

  @ResolveField()
  async role(@Parent() user: User) {
    const { id } = user;
    return this.roleService.findAll(id);
  }
}
