import { HttpService, Injectable, Logger } from '@nestjs/common';
import { RawTeamDto } from 'src/teams/dto/raw-team.dto';

@Injectable()
export class NHLAPIService {
  constructor(private httpService: HttpService) {}

  private readonly logger = new Logger(NHLAPIService.name);

  //   async getAllTeams() : Promise<Observable<AxiosResponse<NHLTeamsListExport>>> {
  async getAllTeams(): Promise<RawTeamDto[]> {
    const response = await this.httpService
      .get('https://statsapi.web.nhl.com/api/v1/teams')
      .toPromise()
    return response.data?.teams;
  }
}
