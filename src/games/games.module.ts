import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamSchema } from 'src/teams/team.model';
import { TeamsModule } from 'src/teams/teams.module';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Game', schema: TeamSchema }]),
    HttpModule,
    TeamsModule
  ],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule {}
