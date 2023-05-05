# @qvik/db

This package contains the database access layer for the Qvik backend.

## Description

The package is intended to be used with backend services in NestJS, but not limited to it. The package is written in TypeScript and uses the `mikro-orm` package for database access.

## Installation

Install the package in a project by running `pnpm add @qvik/db --filter <project>`.

## Usage

The package can be used in any typescript project.

### Usage with NestJs

To use the package with NestJS, you need to import the `MikroOrmModule` into the `AppModule` and provide the configuration for the database connection.

IMPORTANT:

- The `MikroOrmModule` must be imported before any other module that uses the database connection.
- If you define a custom configuration the `entities` property MUST be from `dbConfig.entities` or include all the entities from `dbConfig.entities`.

```typescript
// app.module.ts
import { dbConfig } from "@qvik/db";

@Module({
  imports: [
    MikroOrmModule.forRoot({
      ...dbConfig,
      // Add any additional configuration here
      // or override the default configuration, !entities MUST be extended from dbConfig.entities
      entities: [...dbConfig.entities, CustomEntityIReallyNeed],
      // rest of the configuration
    }),
  ],
})
export class AppModule {}
```

Now you can inject and use the `EntityManager` in your services.

```typescript
// users.service.ts
import { Injectable } from "@nestjs/common";
import { EntityManager } from "@mikro-orm/postgresql";

import { UserEntity } from "@qvik/db";

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async getUser(id: string) {
    return this.em.find(UserEntity, {});
  }
}
```

To use the predefined repository, you need to inject the Entities into feature modules.

```typescript
// users.module.ts
import { Module } from "@nestjs/common";

import { UserEntity } from "@qvik/db";

@Module({
  imports: [
    // this injects the repository into the module
    MikroOrm.forFeature([UserEntity]),
  ],
})
export class UsersModule {}
```

Now you can inject and use the `UserRepository` in your services.

```typescript
// users.service.ts
import { Injectable } from "@nestjs/common";

import { UserRepository } from "@qvik/db";

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(id: string) {
    return this.userRepository.find();
  }
}
```

### Usage with NodeJS
Usage with node is much simpler, and you can also use the `EntityManager` directly.

```typescript
// index.ts
import { EntityManager } from "@mikro-orm/postgresql";

import { dbConfig } from "@qvik/db";
import { UserEntity } from "@qvik/db";

const em = await MikroORM.init({
  ...dbConfig,
  // Add any additional configuration here
  // or override the default configuration, !entities MUST be extended from dbConfig.entities
  entities: [...dbConfig.entities, CustomEntityIReallyNeed],
  // rest of the configuration
});


// get all users
async function getAllUsers() {
  return em.find(UserEntity, {});
}

// OR using the repository
const userRepository = em.getRepository(UserEntity);

// get all users
async function getAllUsers() {
  return userRepository.find();
}
```