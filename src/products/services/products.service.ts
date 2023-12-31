import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindConditions, Repository } from 'typeorm';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dtos/products.dtos';
import { Brand } from '../entities/brand.entity';
import { Category } from '../entities/category.entity';
import { Product } from './../entities/product.entity';
import { BrandsService } from './brands.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandsService: BrandsService,
    @InjectRepository(Category) private categoriesRepo: Repository<Category>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
  ) {}

  findAll(params?: FilterProductDto) {
    if (params) {
      const where: FindConditions<Product> = {};
      // en la nueva version de typeorm se usa FindOptionsWhere
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }
    // devuelvo la relacion con brand
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    // TODO: update
    // para findOne se pasa ahora por las options y no como primer parametro el id
    // const product = await this.productRepo.findOne({
    //   where: { id },
    //   relations: ['brand'],
    // });
    const product = await this.productRepo.findOne(id, {
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    // const newProduct = new Product();
    // newProduct.name = data.name;
    // newProduct.description = data.description;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;
    // newProduct.image = data.image;
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      // TODO: update
      // ahora no se usa el create sino el findOne si no findOneBy
      // const brand = await this.brandsService.findOneBy({ id: data.brandId })
      const brand = await this.brandsService.findOne(data.brandId);
      newProduct.brand = brand;
    }

    if (data.categoriesIds) {
      // TODO: update
      // findByIds en la nueva version es deprecated de usa findBy  con el operador in
      // const categories = await this.categoriesRepo.findBy({
      // id: In(data.categoriesIds),
      // });
      const categories = await this.categoriesRepo.findByIds(
        data.categoriesIds,
      );
      newProduct.categories = categories;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);
    if (changes.brandId) {
      const brand = await this.brandRepo.findOne(changes.brandId);
      product.brand = brand;
    }
    // if (changes.categoriesIds) {
    //   const categories = await this.categoriesRepo.findByIds(
    //     changes.categoriesIds,
    //   );
    //   product.categories = categories;
    // }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepo.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    const category = await this.categoriesRepo.findOne(categoryId);
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
