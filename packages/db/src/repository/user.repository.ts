import { EntityRepository } from "@mikro-orm/postgresql";
import { UserEntity } from "../entity";

/**
 * Injected trough ./entity/user.entity.ts
 *
 * @see https://mikro-orm.io/docs/usage-with-nestjs#repositories
 */
export class UserRepository extends EntityRepository<UserEntity> {}
