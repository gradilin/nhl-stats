import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsModule } from './teams/teams.module';
import { ScheduledTasksModule } from './scheduled-tasks/scheduled-tasks.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // using configService to pull values from .env file in order to inject connections string
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      // configService returns a null unless it is injected
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useFindAndModify: false,
      }),
    }),
    ScheduleModule.forRoot(),
    TeamsModule,
    ScheduledTasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
