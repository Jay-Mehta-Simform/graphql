import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/dataSource/entities/product.entity';
import { NewProduct, UpdateProduct } from 'src/dataSource/models/product.model';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findByIds(ids: number[]): Promise<Product[]> {
    const result = await this.productRepository.find({
      where: { id: In(ids) },
    });

    if (result.length !== ids.length) {
      throw new Error('Insufficient data found from the database');
    }

    return result;
  }

  async findByOrder(id: number) {
    const products = await this.productRepository.find({
      where: { order: { id } },
    });
    console.debug(
      'Turbo Log : ~ ProductService ~ findByOrder ~ products =',
      products,
    );
    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  create(product: NewProduct): Promise<Product> {
    return this.productRepository.save(product);
  }

  async update(id: string, product: UpdateProduct) {
    const existingProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    return this.productRepository.save({
      ...existingProduct,
      ...product,
    });
  }

  delete(id: string) {
    return this.productRepository.delete(id);
  }
}
