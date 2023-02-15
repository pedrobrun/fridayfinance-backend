import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  color: string;
}
