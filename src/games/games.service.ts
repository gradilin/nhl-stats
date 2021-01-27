import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from 'src/teams/team.model';
import { CreateGameDTO } from './dto/create-game.dto';
import { Game, GameDocument } from './dto/game.model';

@Injectable()
export class GamesService {
  constructor(@InjectModel('Game') private gameModel: Model<GameDocument>) {}

  async findGameById(id: string): Promise<Game[]> {
    const game = this.gameModel.find({ gamePk: id });
    return game;
  }

  async CreateGame(game: CreateGameDTO): Promise<Game> {

  }
}
