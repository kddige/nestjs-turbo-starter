import { Entity, Enum, Index, Property } from "@mikro-orm/core";
import { UserRepository } from "../repository";

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  USER = "user",
}

@Entity({ tableName: "users", customRepository: () => UserRepository })
@Index({ properties: ["email", "firstName", "lastName"] })
export class UserEntity {
  @Property({ type: "uuid", primary: true })
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
}
