import { HttpModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NHLAPIService } from './nhl-api.service';
import { ScheduledTasksService } from './scheduled-tasks.service';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule],
  providers: [ScheduledTasksService, NHLAPIService]
})
export class ScheduledTasksModule {}
