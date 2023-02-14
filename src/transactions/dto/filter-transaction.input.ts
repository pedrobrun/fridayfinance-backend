import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterTransactionInput {
  @Field(() => String, { nullable: true })
  accountId?: string;

  @Field(() => String, { nullable: true })
  categoryId?: string;

  @Field(() => String, { nullable: true })
  reference?: string;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;
}
