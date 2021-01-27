import { Body, Controller, Get, Post } from '@nestjs/common';

import { RawTeamDto } from './dto/raw-team.dto';
import { Team } from './team.model';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Get()
  async returnTeams(): Promise<Team[]> {
    return await this.teamsService.findAll();
  }

  @Post()
  async CreateTeam(@Body() rawTeam: RawTeamDto): Promise<Team> {
    const {
      id,
      name,
      link,
      abbreviation,
      teamName,
      locationName,
      firstYearOfPlay,
      division,
      conference,
      franchise,
      shortName,
      officialSiteUrl,
      franchiseId,
      active,
    } = rawTeam;
    // console.log(rawTeam);
    const team: Team = {
      id,
      name,
      link,
      abbreviation,
      teamName,
      locationName,
      firstYearOfPlay,
      division,
      conference,
      franchise,
      shortName,
      officialSiteUrl,
      franchiseId,
      active,
    };
    // console.log(team);
    return await this.teamsService.create(team);
  }


  // @Delete() 
  // async DeleteAll() {
  //   this.teamsService.wipeData();
  //   return "not just the teams, the woteams and the chilteams too"
  // }
}
