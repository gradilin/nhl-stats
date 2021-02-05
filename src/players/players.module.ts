import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from './player.model';
import { TeamsModule } from 'src/teams/teams.module';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Player', schema: PlayerSchema}]), TeamsModule],
  providers: [PlayersService],
  controllers: [PlayersController],
  exports: [PlayersService]
})
export class PlayersModule {}
