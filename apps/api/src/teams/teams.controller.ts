import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TeamsService } from './teams.service';

@Controller('teams')
@ApiTags('Teams')
export class TeamsController {
  constructor(private teamService: TeamsService) {}

  @Get()
  async find() {
    return this.teamService.findAll();
  }
}
