import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 500 })
  firstName: string;

  @Column({ length: 500 })
  lastName: string;

  @Column('smallint')
  age: number;

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];
}
