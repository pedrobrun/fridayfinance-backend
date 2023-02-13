import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Account {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  bank: string;
}
