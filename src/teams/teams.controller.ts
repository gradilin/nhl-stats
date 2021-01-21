import { Controller, Get } from '@nestjs/common';
import { Team } from './team.model';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  // @Get()
  // findAll(): string {
  //     return 'This is a string there is nothing to find'
  // }

  @Get()
  async returnTasks(): Promise<Team[]> {
    return await this.teamsService.findAll();
  }
}
