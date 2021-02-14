import { Injectable, UseFilters } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { MongoExceptionFilter } from 'src/mongo.exception.filter';
import { TeamsService } from 'src/teams/teams.service';
import { RawGameDTO } from './dto/raw-game-dto';
import { Game, GameDocument } from './game.model';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel('Game') private gameModel: Model<GameDocument>,
    private readonly teamsService: TeamsService,
  ) {}

  async getGameObjectIdByTeamId(gameId: number): Promise<ObjectId> {
    return (await this.gameModel.findOne({ gamePk: gameId }))._id;
  }

  async convertDtoToGame(
    rawGameDto: RawGameDTO,
    gameDateString: string,
  ): Promise<Game> {
    const { link, gameType, season } = rawGameDto;
    const homeScore = rawGameDto.teams.home.score;
    const awayScore = rawGameDto.teams.away.score;
    const homeRecord = rawGameDto.teams.home.leagueRecord;
    const awayRecord = rawGameDto.teams.away.leagueRecord;
    const homeTeam = await this.teamsService.getTeamObjectIdByTeamId(
      rawGameDto.teams.home.team.id,
    );
    const awayTeam = await this.teamsService.getTeamObjectIdByTeamId(
      rawGameDto.teams.away.team.id,
    );
    const gamePk = rawGameDto.gamePk;
    const venue = rawGameDto.venue.name;
    const gameDate = new Date(gameDateString);
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
      venue,
    };
    return game;
  }

  async getOldestGameByDate(): Promise<Game> {
    // sorts the games by date - oldest to newest then takes the top result
    const result = this.gameModel.findOne({}, {}, { sort: { gameDate: 1 } });
    return result;
  }

  async findGameByGameId(id: number): Promise<Game[]> {
    const game = this.gameModel.find({ gamePk: id });
    return game;
  }

  async createGame(game: Game): Promise<Game> {
    const createdGame = new this.gameModel(game);
    console.log(createdGame);
    try {
      const result = await createdGame.save();
      return result;
    } catch (error) {
      console.log(error);
      return game;
    }
  }

  async upsertGameById(game: Game): Promise<Game> {
    const filter = { gamePk: game.gamePk };

    const upsertedTeam = this.gameModel
      .findOneAndUpdate(filter, game, {
        new: true,
        upsert: true, // Make this update into an upsert
      });

    return upsertedTeam;
  }
}
