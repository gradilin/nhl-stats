import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamsModule } from 'src/teams/teams.module';
import { GameSchema } from './game.model';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Game', schema: GameSchema }]),
    HttpModule,
    TeamsModule
  ],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule {}
