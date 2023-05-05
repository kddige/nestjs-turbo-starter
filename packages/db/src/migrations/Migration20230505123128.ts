import { Migration } from '@mikro-orm/migrations';

export class Migration20230505123128 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" uuid not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "roles" text[] not null default \'{user}\', constraint "users_pkey" primary key ("id"));');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
    this.addSql('create index "users_email_first_name_last_name_index" on "users" ("email", "first_name", "last_name");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }

}
