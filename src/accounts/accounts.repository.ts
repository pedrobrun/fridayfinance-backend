import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountInput } from './dto/create-account.input';

@Injectable()
export class AccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createAccountInput: CreateAccountInput) {
    return this.prismaService.account.create({
      data: createAccountInput,
    });
  }

  findAll() {
    return this.prismaService.account.findMany();
  }

  findOne(id: string) {
    return this.prismaService.account.findUnique({ where: { id } });
  }
}