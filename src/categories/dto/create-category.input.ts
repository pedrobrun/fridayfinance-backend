import { InputType, Field } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';

@InputType()
export class CreateCategoryInput implements Category {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  color: string;
}
