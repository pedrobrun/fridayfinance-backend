import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';

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

  @Query(() => [Transaction], { name: 'transactions' })
  findAll() {
    return this.transactionsService.findAll();
  }

  @Query(() => Transaction, { name: 'transaction', nullable: true })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.transactionsService.findOne(id);
  }
}
