import { Injectable } from '@nestjs/common';
import { PaginationInput } from 'src/shared/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { FilterTransactionInput } from './dto/filter-transaction.input';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTransactionInput: CreateTransactionInput) {
    return this.prismaService.transaction.create({
      data: createTransactionInput,
    });
  }

  findAll(
    paginationInput: PaginationInput,
    filterTransactionInput: FilterTransactionInput,
  ) {
    return this.prismaService.transaction.findMany({
      skip: paginationInput.skip,
      take: paginationInput.take,
      where: {
        accountId: filterTransactionInput?.accountId,
        categoryId: filterTransactionInput?.categoryId,
        reference: {
          contains: filterTransactionInput?.reference,
          mode: 'insensitive',
        },
        date: {
          gte: filterTransactionInput.startDate,
          lte: filterTransactionInput.endDate,
        },
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.transaction.findUnique({ where: { id } });
  }
}
