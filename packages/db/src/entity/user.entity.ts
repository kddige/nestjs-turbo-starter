import { Collection, Entity, Enum, Index, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { UserRepository } from "../repository";
import { TeamEntity } from "./team.entity";

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  USER = "user",
}

@Entity({ tableName: "users", customRepository: () => UserRepository })
@Index({ properties: ["email", "firstName", "lastName"] })
export class UserEntity {
  @PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  id!: string;

  @Property({ type: "varchar", length: 255 })
  firstName!: string;

  @Property({ type: "varchar", length: 255 })
  lastName!: string;

  @Property({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Property({ type: "varchar", length: 255 })
  password!: string;

  @Enum({ items: () => UserRole, array: true, default: [UserRole.USER] })
  roles: UserRole[] = [UserRole.USER];

  @ManyToMany(() => TeamEntity, (team) => team.users)
  teams: Collection<TeamEntity> = new Collection<TeamEntity>(this);
}
