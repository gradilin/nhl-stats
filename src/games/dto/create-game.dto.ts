import { ObjectId } from 'mongoose';
import { LeagueRecord } from './raw-game-dto';

export class CreateGameDto {
  gamePk: number;
  link: string;
  gameType: string;
  season: string;
  gameDate: Date;
  homeTeam: ObjectId;
  homeScore: number;
  homeRecord: LeagueRecord;
  awayTeam: ObjectId;
  awayScore: number;
  awayRecord: LeagueRecord;
}
