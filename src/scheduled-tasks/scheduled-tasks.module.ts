import { HttpModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { GamesModule } from 'src/games/games.module';
import { PlayersModule } from 'src/players/players.module';
import { TeamsModule } from 'src/teams/teams.module';
import { NHLAPIService } from './nhl-api.service';
import { ScheduledTasksService } from './scheduled-tasks.service';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule, TeamsModule, GamesModule, PlayersModule],
  providers: [ScheduledTasksService,NHLAPIService]
})
export class ScheduledTasksModule {}
