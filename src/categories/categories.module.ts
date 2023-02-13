import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesRepository } from './categories.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [
    CategoriesResolver,
    CategoriesService,
    CategoriesRepository,
    PrismaService,
  ],
})
export class CategoriesModule {}
