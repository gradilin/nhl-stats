import { HttpService, Injectable, Logger } from '@nestjs/common';
import { GameDate } from 'src/games/dto/raw-game-dto';
import { RawPlayerDto } from 'src/players/dto/create-player.dto';
import { Player } from 'src/players/player.model';
import { RawTeamDto } from 'src/teams/dto/raw-team.dto';

@Injectable()
export class NHLAPIService {
  constructor(private httpService: HttpService) {}

  private readonly logger = new Logger(NHLAPIService.name);

  async getAllTeams(): Promise<RawTeamDto[]> {
    const response = await this.httpService
      .get('https://statsapi.web.nhl.com/api/v1/teams')
      .toPromise();
    // ignore the parent object and just return the array of team objects
    return response.data?.teams;
  }

  async getSinglePlayerData(playerId: number): Promise<RawPlayerDto> {
    const response = await this.httpService
      .get(`https://statsapi.web.nhl.com/api/v1/people/${playerId}`)
      .toPromise();
    // since we are specifiying a single id only one person is expected
    return response.data?.people[0];
  }

  async getTeamRoster(teamId: number): Promise<RawTeamDto> {
    const response = await this.httpService
      .get(
        `https://statsapi.web.nhl.com/api/v1/${teamId}/teams?expand=team.roster`,
      )
      .toPromise();
    // since we only want the single team roster we can ensure that this will be the only team returned
    return response.data?.teams[0];
  }

  async getDailySchedule(): Promise<any> {
    const response = await this.httpService
      .get('https://statsapi.web.nhl.com/api/v1/schedule')
      .toPromise();
    return response.data;
  }

  async getGameSchedule(date: Date): Promise<GameDate> {
    const prevDateString = this.formatDate(this.SubtractDayFromDate(date));
    const endpoint = `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${prevDateString}&endDate=${prevDateString}`;
    const response = await this.httpService.get(endpoint).toPromise();
    return response.data;
  }

  formatDate(date: Date): string {
    let month: string = (date.getMonth() + 1).toString();
    let day: string = date.getDate().toString();
    const year: string = date.getFullYear().toString();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  SubtractDayFromDate(currentDay: Date): Date {
    const previousDay = new Date();
    previousDay.setDate(currentDay.getDate() - 1);
    return previousDay;
  }
}
