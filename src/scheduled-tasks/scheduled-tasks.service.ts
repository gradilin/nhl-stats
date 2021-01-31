import { Injectable, Logger } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { GamesService } from 'src/games/games.service';
import { RawTeamDto } from 'src/teams/dto/raw-team.dto';
import { TeamsService } from 'src/teams/teams.service';
import { NHLAPIService } from './nhl-api.service';

@Injectable()
export class ScheduledTasksService {
  constructor(
    private nhlAPIService: NHLAPIService,
    private teamsService: TeamsService,
    private gamesService: GamesService,
  ) {}
  private readonly logger = new Logger(ScheduledTasksService.name);

  // @Cron('* * * * * 1')
  @Timeout(30000)
  async updateTeams() {
    let teamArray: RawTeamDto[] = [];
    await this.nhlAPIService
      .getAllTeams()
      // need to convert Promis into object
      .then(res => {
        teamArray = res;
        teamArray.forEach(team => {
          const teamDoc = this.teamsService.convertTeamDtoToTeam(team);
          const serviceReturn = this.teamsService.upsertTeamById(teamDoc);
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

  @Timeout(5000)
  async updateOldGames() {
    const gameDate = new Date();

    // look back thorugh the previous ten days
    for (let _i = 0; _i < 10; _i++) {
      gameDate.setDate(gameDate.getDate() - _i);
      await this.nhlAPIService.getGameSchedule(gameDate).then(res => {
        res.dates.forEach(date => {
          date.games.forEach(game => {
            this.gamesService
              .convertDtoToGame(game, date.date)
              .then(res => {
                this.gamesService.createGame(res);
              })
              .catch(error => {
                console.log('Promise rejected with ' + JSON.stringify(error));
              });
          });
        });
      });
    }
  }
}
