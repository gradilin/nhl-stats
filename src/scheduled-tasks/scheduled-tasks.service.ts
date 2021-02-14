import { Injectable, Logger } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { GamesService } from 'src/games/games.service';
import { PlayersService } from 'src/players/players.service';
import { RawTeamDto } from 'src/teams/dto/raw-team.dto';
import { TeamsService } from 'src/teams/teams.service';
import { NHLAPIService } from './nhl-api.service';

@Injectable()
export class ScheduledTasksService {
  constructor(
    private nhlAPIService: NHLAPIService,
    private teamsService: TeamsService,
    private gamesService: GamesService,
    private playerService: PlayersService,
  ) {}
  private readonly logger = new Logger(ScheduledTasksService.name);

  // // @Cron('* * * * * 1')
  // @Timeout(30000)
  // async updateTeams() {
  //   let teamArray: RawTeamDto[] = [];
  //   await this.nhlAPIService
  //     .getAllTeams()
  //     // need to convert Promis into object
  //     .then(res => {
  //       teamArray = res;
  //       teamArray.forEach(team => {
  //         const teamDoc = this.teamsService.convertTeamDtoToTeam(team);
  //         const serviceReturn = this.teamsService.upsertTeamById(teamDoc);
  //         // loggin in case something goes wrong
  //         serviceReturn.catch(error => {
  //           console.log('DB Upsert rejected with ' + JSON.stringify(error));
  //         });
  //       });
  //     })
  //     .catch(error => {
  //       console.log('Promise rejected with ' + JSON.stringify(error));
  //     });
  // }

  @Timeout(1000)
  async updateOldGames() {
    const gameDate = new Date();
    const startOf2000Season = new Date('10/03/2000');

    // To calculate the time difference of two dates
    const Difference_In_Time = gameDate.getTime() - startOf2000Season.getTime();

    // To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    let _gameCount = 0; 
    // look back thorugh the previous ten days
    for (let _i = 0; _i < Difference_In_Days; _i++) {
      gameDate.setDate(gameDate.getDate() - 1);

      await this.nhlAPIService.getGameSchedule(gameDate).then(res => {
        res.dates.forEach(date => {
          date.games.forEach(game => {
            this.gamesService
              .convertDtoToGame(game, date.date)
              .then(res => {
                this.gamesService.upsertGameById(res);
                _gameCount++;
                console.log(`${ _gameCount } games updated`)
              })
              .catch(error => {
                console.log('Promise rejected with ' + JSON.stringify(error));
              });
          });
        });
      });
    }
  }

  // @Timeout(1000)
  // async updateActiveRosterPlayers() {
  //   const teams = await this.teamsService.findAll();
  //   // cycle through each team in the db
  //   await teams.forEach(team => {
  //     // foreach team get full roster and add their data to the rosterplayer array
  //     this.nhlAPIService
  //       .getTeamRoster(team.teamPk)
  //       .then(teamFull => {
  //         teamFull.roster.roster.forEach(player => {
  //           this.nhlAPIService
  //             .getSinglePlayerData(player.person.id)
  //             .then(rawPlayer => {
  //               this.playerService.CreatePlayer(rawPlayer);
  //             })
  //             .catch(error => {
  //               console.log('Promise rejected with ' + JSON.stringify(error));
  //             });
  //         });
  //       })
  //       .catch(error => {
  //         console.log('Promise rejected with ' + JSON.stringify(error));
  //       });
  //   });
  // }
}
