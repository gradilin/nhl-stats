import { Injectable, Logger } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';
import { RawTeamDto } from 'src/teams/dto/raw-team.dto';
import { TeamsService } from 'src/teams/teams.service';
import { NHLAPIService } from './nhl-api.service';

@Injectable()
export class ScheduledTasksService {
  constructor(
    private nhlAPIService: NHLAPIService,
    private teamsService: TeamsService,
  ) {}
  private readonly logger = new Logger(ScheduledTasksService.name);

  // @Cron('* * * * * 1')
  @Timeout(5000)
  async updateTeams() {
    let teamArray: RawTeamDto[] = [];
    await this.nhlAPIService
      .getAllTeams()
      // need to convert Promis into object  
      .then(res => {
        teamArray = res;
        teamArray.forEach(team => {
          const serviceReturn = this.teamsService.upsertTeamById(team);
          // loggin in case something goes wrong
          serviceReturn.catch(error => {
            console.log('DB Upsert rejected with ' + JSON.stringify(error));
          });
        });
      })
      .catch(error => {
        console.log('Promise rejected with ' + JSON.stringify(error));
      });
  }
}
