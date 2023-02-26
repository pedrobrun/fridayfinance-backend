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
    const { take, after } = paginationInput;

    const where = {
      accountId: filterTransactionInput?.accountId,
      categoryId: filterTransactionInput?.categoryId,
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
    };

    const cursor = after ? { id: after } : undefined;

    const transactions = await this.prismaService.transaction.findMany({
      take: take + 1, // Fetch one extra item to check if there are more items after this page
      skip: 1, // skip the cursor
      cursor,
      where,
      include: {
        category: true,
        account: true,
      },
    });

    const hasNextPage = transactions.length > take;
    const edges = hasNextPage ? transactions.slice(0, -1) : transactions;

    return {
      edges,
      pageInfo: {
        endCursor: hasNextPage ? edges[edges.length - 1].id : null,
        hasNextPage,
      },
    };
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
