import { InputType, Field } from '@nestjs/graphql';
import { Account } from '../entities/account.entity';

@InputType()
export class CreateAccountInput implements Account {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  bank: string;
}
