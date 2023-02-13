import { Injectable } from '@nestjs/common';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  create(createTransactionInput: CreateTransactionInput) {
    return this.transactionsRepository.create(createTransactionInput);
  }

  findAll() {
    return this.transactionsRepository.findAll();
  }

  findOne(id: string) {
    return this.transactionsRepository.findOne(id);
  }
}
