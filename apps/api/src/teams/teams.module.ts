import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TeamEntity } from '@qvik/db';

@Module({
  imports: [MikroOrmModule.forFeature([TeamEntity])],
  providers: [TeamsService],
  controllers: [TeamsController],
})
export class TeamsModule {}
