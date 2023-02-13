import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsResolver } from './accounts.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountsRepository } from './accounts.repository';

@Module({
  providers: [
    AccountsResolver,
    AccountsService,
    AccountsRepository,
    PrismaService,
  ],
})
export class AccountsModule {}
