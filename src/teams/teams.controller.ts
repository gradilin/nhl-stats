import { Param } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { RawTeamDto } from './dto/raw-team.dto';
import { Team } from './team.model';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  // @Get()
  // async returnTeams(): Promise<Team[]> {
  //   return await this.teamsService.findAll();
  // }

  @Get(':id')
  async returnTeamById(@Param('id') teamId: number): Promise<Team> {
    console.log(teamId);
    const q = await this.teamsService.findByTeamId(teamId); 
    console.log(q);
    return q;
  }

  @Post()
  async CreateTeam(@Body() rawTeam: RawTeamDto): Promise<Team> {
    const teamObject = this.teamsService.convertTeamDtoToTeam(rawTeam);
    const result =  await this.teamsService.create(teamObject);
    console.log(result);
    return result;

  }

  // @Delete()
  // async DeleteAll() {
  //   this.teamsService.wipeData();
  //   return "not just the teams, the woteams and the chilteams too"
  // }
}
