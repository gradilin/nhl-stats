import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamsService } from 'src/teams/teams.service';
import { CreateGameDto } from './dto/create-game.dto';
import { RawGameDTO } from './dto/raw-game-dto';
import { Game, GameDocument } from './game.model';

@Injectable()
export class GamesService {
  constructor(@InjectModel('Game') private gameModel: Model<GameDocument>, private readonly teamsService: TeamsService) {}

  async convertDtoToGame(gameDto: RawGameDTO): Promise<CreateGameDto> {
    const {
      link,
      gameType,
      season,
      gameDate,
    } = gameDto;
    const homeScore =  gameDto.teams.home.score;
    const awayScore =  gameDto.teams.away.score;
    const homeRecord = gameDto.teams.home.leagueRecord;
    const awayRecord = gameDto.teams.away.leagueRecord;
    const homeTeam = await this.teamsService.findByTeamId(gameDto.teams.home.team.id)._id;
    const awayTeam = await this.teamsService.findByTeamId(gameDto.teams.away.team.id)._id;
    const gamePk = gameDto.gamePk;
    const game: Game = {
      gamePk,
      link,
      gameType,
      season,
      gameDate, 
      homeScore,
      awayScore, 
      homeRecord,
      awayRecord, 
      homeTeam,
      awayTeam,
    }
    return game;
  }

  async findGameByGameId(id: string): Promise<Game[]> {
    const game = this.gameModel.find({ gamePk: id });
    return game;
  }

  async createGame(game: Game): Promise<Game> {
    console.log(game);
    const createdGame = new this.gameModel(game);
    const result = await createdGame.save();
    return result;
  }
}
