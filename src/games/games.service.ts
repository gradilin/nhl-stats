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

  async convertDtoToGame(rawGameDto: RawGameDTO, gameDateString: string): Promise<CreateGameDto> {
    const {
      link,
      gameType,
      season,
    } = rawGameDto;
    const homeScore =  rawGameDto.teams.home.score;
    const awayScore =  rawGameDto.teams.away.score;
    const homeRecord = rawGameDto.teams.home.leagueRecord;
    const awayRecord = rawGameDto.teams.away.leagueRecord;
    const homeTeam = await this.teamsService.getTeamObjectIdByTeamId(rawGameDto.teams.home.team.id);
    const awayTeam = await this.teamsService.getTeamObjectIdByTeamId(rawGameDto.teams.away.team.id);
    const gamePk = rawGameDto.gamePk;
    const venue = rawGameDto.venue.name;
    const gameDate = new Date(gameDateString);
    const game: CreateGameDto = {
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
      venue
    }
    return game;
  }

  async findGameByGameId(id: number): Promise<Game[]> {
    const game = this.gameModel.find({ gamePk: id });
    return game;
  }

  async createGame(game: Game): Promise<Game> {
    console.log(game);
    const createdGame = new this.gameModel(game);
    const result = await createdGame.save();
    return result;
  }

  async upsertGameById(game: CreateGameDto): Promise<Game> {

    const filter = { gamePk: game.gamePk };
    const upsertedTeam = this.gameModel.findOneAndUpdate(filter, game, {
      new: true,
      upsert: true, // Make this update into an upsert
    });
    return upsertedTeam;
  }
}
