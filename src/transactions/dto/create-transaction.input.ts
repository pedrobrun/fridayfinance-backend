import { Field, Float, InputType } from '@nestjs/graphql';
import { Transaction } from '../entities/transaction.entity';

@InputType()
export class CreateTransactionInput implements Transaction {
  @Field(() => String)
  id: string;

  @Field(() => String)
  accountId: string;

  @Field(() => String)
  categoryId: string;

  @Field(() => String, { nullable: true })
  reference?: string;

  @Field(() => Float)
  amount: number;

  @Field(() => String)
  currency: string;

  @Field(() => Date)
  date: Date;
}
