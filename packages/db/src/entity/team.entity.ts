import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { UserEntity } from "./user.entity";
import { TeamRepository } from "../repository";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ tableName: "teams", customRepository: () => TeamRepository })
export class TeamEntity {
  @PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  id!: string;

  @Property({ type: "varchar", length: 255 })
  name!: string;

  @ApiProperty({ type: () => UserEntity, isArray: true })
  @ManyToMany(() => UserEntity, "teams", { owner: true })
  users: Collection<UserEntity> = new Collection<UserEntity>(this);
}
