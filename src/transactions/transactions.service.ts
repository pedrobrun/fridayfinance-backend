import { Injectable } from '@nestjs/common';
import { PaginationInput } from 'src/shared/pagination.dto';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { FilterTransactionInput } from './dto/filter-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  create(createTransactionInput: CreateTransactionInput) {
    return this.transactionsRepository.create(createTransactionInput);
  }

  findAll(
    paginationInput: PaginationInput,
    filterTransactionInput: FilterTransactionInput,
  ) {
    return this.transactionsRepository.findAll(
      paginationInput,
      filterTransactionInput,
    );
  }

  findOne(id: string) {
    return this.transactionsRepository.findOne(id);
  }

  updateOne(id: string, updateTransactionInput: UpdateTransactionInput) {
    return this.transactionsRepository.updateOne(id, updateTransactionInput);
  }
}
