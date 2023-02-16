import { ObjectType, Field } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/category.entity';
import { Transaction } from './transaction.entity';

@ObjectType()
export class TransactionWithCategory extends Transaction {
  @Field(() => Category, { nullable: true })
  category: Category;
}
