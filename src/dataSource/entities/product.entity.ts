import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column('int')
  price: number;

  @Column('int')
  inventory: number;
}
