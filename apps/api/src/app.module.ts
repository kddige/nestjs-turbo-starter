import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { dbConfig } from '@qvik/db';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      ...dbConfig,
    }),
    UsersModule,
    TeamsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
