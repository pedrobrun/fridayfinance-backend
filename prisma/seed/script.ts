import { createReadStream } from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';
import { Account } from '../../src/accounts/entities/account.entity';
import { Transaction } from '../../src/transactions/entities/transaction.entity';
import { PrismaClient } from '@prisma/client';
import { Category } from '../../src/categories/entities/category.entity';

const batchRequestsLimit = Number(process.env.SEED_BATCH_REQUESTS_LIMIT);

const prismaClient = new PrismaClient();

async function parseCsvFile(
  filePath: string,
  columnsToParse: (keyof Account | keyof Transaction | keyof Category)[],
) {
  const objects = [];

  const parser = createReadStream(path.resolve(__dirname, filePath)).pipe(
    parse({
      delimiter: ',',
      relaxQuotes: true,
      columns: columnsToParse,
      fromLine: 2,
    }),
  );

  for await (const obj of parser) {
    objects.push(obj);
  }

  return objects;
}

export async function batchRequests(reqs, limit) {
  for (let i = 0; i < reqs.length; i = i + limit) {
    const batch = reqs.slice(i, i + limit);
    await Promise.all(batch);
  }
}

(async () => {
  if (!Number(batchRequestsLimit) || Number(batchRequestsLimit) <= 0) {
    throw 'process.env.SEED_BATCH_REQUESTS_LIMIT must be a number greather than 0';
  }

  try {
    await prismaClient.category.deleteMany();
    await prismaClient.transaction.deleteMany();
    await prismaClient.account.deleteMany();

    console.log('Deleted old registers...');

    console.time('Seeding accounts ✅');
    const accounts = await parseCsvFile('./data/accounts.csv', [
      'id',
      'name',
      'bank',
    ]);
    const accountPromises = accounts.map((account) => {
      const newAccount = prismaClient.account.create({
        data: account,
      });
      return newAccount;
    });
    await Promise.all(accountPromises);
    console.timeEnd('Seeding accounts ✅');

    console.time('Seeding categories ✅');
    const categories = await parseCsvFile('./data/categories.csv', [
      'id',
      'name',
      'color',
    ]);
    const categoriesPromises = categories.map((category) => {
      const newCategory = prismaClient.category.create({
        data: category,
      });
      return newCategory;
    });
    await Promise.all(categoriesPromises);
    console.timeEnd('Seeding categories ✅');

    console.time('Seeding transactions ✅');
    const transactions = await parseCsvFile('./data/transactions.csv', [
      'id',
      'accountId',
      'categoryId',
      'reference',
      'amount',
      'currency',
      'date',
    ]);

    const transactionsPromises = transactions.map((transaction) => {
      transaction.amount = Number(transaction.amount);
      transaction.date = new Date(transaction.date);
      transaction.categoryId = transaction.categoryId || null;
      return prismaClient.transaction.create({
        data: transaction,
      });
    });

    await batchRequests(transactionsPromises, batchRequestsLimit);

    console.timeEnd('Seeding transactions ✅');
  } catch (e) {
    console.error('Error while seeding the database: ', e);
  }
})();
