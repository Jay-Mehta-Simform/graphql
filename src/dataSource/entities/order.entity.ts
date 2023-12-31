import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalPrice: number;

  @ManyToOne(() => User, (user) => user.order)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Product, (product) => product.order)
  @JoinTable({
    name: 'orderDetails',
    joinColumn: { name: 'orderId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
  })
  product: Product[];
}
