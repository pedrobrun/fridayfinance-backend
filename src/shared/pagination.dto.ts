import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int)
  @Min(1)
  @Max(50)
  take: number;

  @Field(() => String, { nullable: true })
  after: string;
}
