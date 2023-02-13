import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsRepository } from './transactions.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [
    TransactionsResolver,
    TransactionsService,
    TransactionsRepository,
    PrismaService,
  ],
})
export class TransactionsModule {}
