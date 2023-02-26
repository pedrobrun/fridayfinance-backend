## Friiday Finance Challenge's Backend using [Nest](https://github.com/nestjs/nest).

<br/>

## Steps to run the app:

### (Optional) 1. Edit `.env.example` variables:

1. `DATABASE_URL` : by default it is `postgresql://adminuser:123456@localhost:5432/postgres?schema=public` if you don't change `docker-compose.yml`)
2. `SEED_BATCH_REQUESTS_LIMIT` : this is the limit of concurrent promises that will run in batches to populate the db with transactions.csv. I used `10_000` locally, you can change it if you wish.

### 2. Install dependencies

```bash
$ yarn install
```

### 3. Set up the Docker container

```bash
$ yarn docker:start
```

### 4. Run the db seed - This will run a couple of Prisma commands before the seed script itself, so make sure you have Prisma CLI installed

```bash
$ yarn db:seed
```

### 5. Run the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Testing

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
