import { Controller, Delete, Get, Param } from '@nestjs/common';
import { Player } from './player.model';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Get()
  async returnTeams(): Promise<Player[]> {
    return await this.playersService.FindAllPlayers();
  }

  @Get('getplayer/:id')
  async returnPlayerById(@Param() params): Promise<Player> {
    // console.log(params.id);
    const q = await this.playersService.findPlayerById(params.id);
    return q;
  }

  // @Delete()
  // async DeleteAll() {
  //   this.playersService.wipeData();
  //   return "not just the teams, the woteams and the chilteams too"
  // }
}
