import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './dataSource/typeorm.config';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { UserResolver } from './user/user.resolver';
import { ProductResolver } from './product/product.resolver';
import { OrderModule } from './order/order.module';
import { OrderResolver } from './order/order.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserResolver, ProductResolver, OrderResolver],
})
export class AppModule {}
