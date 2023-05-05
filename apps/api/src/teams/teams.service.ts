import { Injectable, NotFoundException } from '@nestjs/common';
import { TeamEntity, TeamRepository } from '@qvik/db';

@Injectable()
export class TeamsService {
  constructor(private teamRepository: TeamRepository) {}

  async findAll(): Promise<TeamEntity[]> {
    return this.teamRepository.findAll();
  }

  async findOne(id: string) {
    const team = await this.teamRepository.findOne(id);
    if (!team) {
      throw new NotFoundException();
    }
    return team;
  }
}
