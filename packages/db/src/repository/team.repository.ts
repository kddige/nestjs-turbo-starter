import { EntityRepository } from "@mikro-orm/postgresql";
import { TeamEntity } from "../entity";

/**
 * Injected trough ./entity/team.entity.ts
 *
 * @see https://mikro-orm.io/docs/usage-with-nestjs#repositories
 */
export class TeamRepository extends EntityRepository<TeamEntity> {}
