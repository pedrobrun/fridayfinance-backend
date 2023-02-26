import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { PaginationInput } from 'src/shared/pagination.dto';
import { FilterTransactionInput } from './dto/filter-transaction.input';
import { TransactionWithCategoryAndAccount } from './entities/transaction-with-category-and-account.entity';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { PaginatedReturn } from './entities/paginated-return';

@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Mutation(() => Transaction)
  createTransaction(
    @Args('createTransactionInput')
    createTransactionInput: CreateTransactionInput,
  ) {
    return this.transactionsService.create(createTransactionInput);
  }

  @Query(() => PaginatedReturn, { name: 'transactions' })
  async findAll(
    @Args('pagination')
    paginationInput: PaginationInput,
    @Args('filter', { nullable: true })
    filterTransactionInput?: FilterTransactionInput,
  ) {
    return this.transactionsService.findAll(
      paginationInput,
      filterTransactionInput,
    );
  }

  @Query(() => TransactionWithCategoryAndAccount, {
    name: 'transaction',
    nullable: true,
  })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.transactionsService.findOne(id);
  }

  @Mutation(() => TransactionWithCategoryAndAccount)
  updateTransaction(
    @Args('updateTransactionInput')
    updateTransactionInput: UpdateTransactionInput,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.transactionsService.updateOne(id, updateTransactionInput);
  }
}
