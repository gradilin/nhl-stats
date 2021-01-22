import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RawTeamDto } from 'src/teams/dto/raw-team.dto';
import { NHLAPIService } from './nhl-api.service';

@Injectable()
export class ScheduledTasksService {
  constructor(private nhlAPIService: NHLAPIService) {}
  private readonly logger = new Logger(ScheduledTasksService.name);

  //   @Cron('15 * * * * *')
  //   handleCron() {
  //     this.logger.debug('Fuck ya dude climb on in');
  //   }

  @Cron('* * * * * 1')
  async updateTeams() {
    const OfficialTeams: RawTeamDto[] = await this.nhlAPIService
      .getAllTeams()
      .then((res: RawTeamDto[]) => {});

      /// need to lear more abput promises vs observalbes 
  }
}
