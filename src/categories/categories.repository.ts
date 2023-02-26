import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCategoryInput: CreateCategoryInput) {
    return this.prismaService.category.create({
      data: {
        id: createCategoryInput.id ?? randomUUID(),
        ...createCategoryInput,
      },
    });
  }

  findAll() {
    return this.prismaService.category.findMany();
  }

  findOne(id: string) {
    return this.prismaService.category.findUnique({ where: { id } });
  }

  updateOne(id: string, updateCategoryInput: UpdateCategoryInput) {
    return this.prismaService.category.update({
      where: {
        id,
      },
      data: updateCategoryInput,
    });
  }
}
