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

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findByIds(ids: number[]): Promise<Product[]> {
    const result = await this.productRepository.find({
      where: { id: In(ids) },
    });
    console.log(result);
    return result;
  }

  findOne(id: string): Promise<Product> {
    return this.productRepository.findOne({
      where: { id: id },
    });
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

    existingProduct.name = product.name || existingProduct.name;
    existingProduct.price = product.price || existingProduct.price;
    existingProduct.inventory = product.inventory || existingProduct.inventory;

    return this.productRepository.save(existingProduct);
  }

  delete(id: string) {
    return this.productRepository.delete(id);
  }
}
