import { Options } from "@mikro-orm/core";
import { UserEntity, TeamEntity } from "./entity";

const config: Options = {
  entities: [UserEntity, TeamEntity], // no need for `entitiesTs` this way,
  dbName: "app",
  type: "postgresql", // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`,
  user: "postgres",
  password: "postgres",
  port: 5432,
};

export default config;
