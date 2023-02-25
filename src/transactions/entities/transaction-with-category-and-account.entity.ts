import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/accounts/entities/account.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Transaction } from './transaction.entity';

@ObjectType()
export class TransactionWithCategoryAndAccount extends Transaction {
  @Field(() => Category, { nullable: true })
  category: Category;

  @Field(() => Category, { nullable: true })
  account: Account;
}
