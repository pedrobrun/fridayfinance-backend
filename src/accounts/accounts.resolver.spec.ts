import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AccountsRepository } from './accounts.repository';
import { AccountsResolver } from './accounts.resolver';
import { AccountsService } from './accounts.service';

describe('AccountsResolver', () => {
  let resolver: AccountsResolver;
  let service: AccountsService;
  let repository: AccountsRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsResolver,
        AccountsService,
        AccountsRepository,
        PrismaService,
      ],
    }).compile();

    resolver = module.get<AccountsResolver>(AccountsResolver);
    service = module.get<AccountsService>(AccountsService);
    repository = module.get<AccountsRepository>(AccountsRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
