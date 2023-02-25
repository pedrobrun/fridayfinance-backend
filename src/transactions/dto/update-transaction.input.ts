import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  accountId: string;

  @Field(() => String, { nullable: true })
  categoryId: string;

  @Field(() => String, { nullable: true })
  reference?: string;

  @Field(() => Float, { nullable: true })
  amount: number;

  @Field(() => String, { nullable: true })
  currency: string;

  @Field(() => Date, { nullable: true })
  date: Date;
}
