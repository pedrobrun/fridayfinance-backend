import { Injectable } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  create(createAccountInput: CreateAccountInput) {
    return this.accountsRepository.create(createAccountInput);
  }

  findAll() {
    return this.accountsRepository.findAll();
  }

  findOne(id: string) {
    return this.accountsRepository.findOne(id);
  }
}
