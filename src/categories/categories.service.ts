import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}
  create(createCategoryInput: CreateCategoryInput) {
    return this.categoriesRepository.create(createCategoryInput);
  }

  findAll() {
    return this.categoriesRepository.findAll();
  }

  findOne(id: string) {
    return this.categoriesRepository.findOne(id);
  }

  updateOne(id: string, updateCategoryInput: UpdateCategoryInput) {
    return this.categoriesRepository.updateOne(id, updateCategoryInput);
  }
}
