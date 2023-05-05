import { Migration } from '@mikro-orm/migrations';

export class Migration20230505162935 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "teams" ("id" uuid not null default uuid_generate_v4(), "name" varchar(255) not null, constraint "teams_pkey" primary key ("id"));');

    this.addSql('create table "teams_users" ("team_entity_id" uuid not null, "user_entity_id" uuid not null, constraint "teams_users_pkey" primary key ("team_entity_id", "user_entity_id"));');

    this.addSql('alter table "teams_users" add constraint "teams_users_team_entity_id_foreign" foreign key ("team_entity_id") references "teams" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "teams_users" add constraint "teams_users_user_entity_id_foreign" foreign key ("user_entity_id") references "users" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "users" alter column "id" drop default;');
    this.addSql('alter table "users" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "users" alter column "id" set default uuid_generate_v4();');
  }

  async down(): Promise<void> {
    this.addSql('alter table "teams_users" drop constraint "teams_users_team_entity_id_foreign";');

    this.addSql('drop table if exists "teams" cascade;');

    this.addSql('drop table if exists "teams_users" cascade;');

    this.addSql('alter table "users" alter column "id" drop default;');
    this.addSql('alter table "users" alter column "id" drop default;');
    this.addSql('alter table "users" alter column "id" type uuid using ("id"::text::uuid);');
  }

}
