import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true })
  @Min(1)
  take: number;

  @Field(() => String, { nullable: true })
  after: string;
}
