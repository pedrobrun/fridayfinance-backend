import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from 'src/shared/page-info.class';
import { TransactionWithCategoryAndAccount } from './transaction-with-category-and-account.entity';

@ObjectType()
export class PaginatedReturn {
  @Field(() => [TransactionWithCategoryAndAccount])
  edges: TransactionWithCategoryAndAccount[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
