import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
