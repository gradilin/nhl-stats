import { HttpService, Injectable, Logger } from '@nestjs/common';
import { GameDate } from 'src/games/dto/raw-game-dto';
import { RawTeamDto } from 'src/teams/dto/raw-team.dto';

@Injectable()
export class NHLAPIService {
  constructor(private httpService: HttpService) {}

  private readonly logger = new Logger(NHLAPIService.name);

  //   async getAllTeams() : Promise<Observable<AxiosResponse<NHLTeamsListExport>>> {
  async getAllTeams(): Promise<RawTeamDto[]> {
    const response = await this.httpService
      .get('https://statsapi.web.nhl.com/api/v1/teams')
      .toPromise();
    return response.data?.teams;
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
