import { Injectable } from '@nestjs/common';
import { PaginationInput } from 'src/shared/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { FilterTransactionInput } from './dto/filter-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTransactionInput: CreateTransactionInput) {
    return this.prismaService.transaction.create({
      data: createTransactionInput,
    });
  }

  async findAll(
    paginationInput: PaginationInput,
    filterTransactionInput: FilterTransactionInput,
  ) {
    return await this.prismaService.transaction.findMany({
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
          gte:
            !filterTransactionInput?.startDate ||
            isNaN(filterTransactionInput?.startDate.getTime())
              ? undefined
              : filterTransactionInput?.startDate,
          lte:
            !filterTransactionInput?.endDate ||
            isNaN(filterTransactionInput?.endDate.getTime())
              ? undefined
              : filterTransactionInput?.endDate,
        },
      },
      include: {
        category: true,
        account: true,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.transaction.findUnique({
      where: { id },
      include: {
        category: true,
        account: true,
      },
    });
  }

  updateOne(id: string, updateTransactionInput: UpdateTransactionInput) {
    return this.prismaService.transaction.update({
      where: { id },
      data: updateTransactionInput,
    });
  }
}
