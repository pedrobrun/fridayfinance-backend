import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class Transaction {
  @Field(() => String)
  id: string;

  @Field(() => String)
  accountId: string;

  @Field(() => String, { nullable: true })
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
