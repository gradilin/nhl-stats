import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamsService } from 'src/teams/teams.service';
import { RawPlayerDto } from './dto/create-player.dto';
import { Player, PlayerDocument } from './player.model';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private playerModel: Model<PlayerDocument>,
    private teamsService: TeamsService,
  ) {}

  async FindAllPlayers(): Promise<Player[]> {
    const players = await this.playerModel.find();
    return players;
  }

  async CreatePlayer(rawPlayer: RawPlayerDto): Promise<Player> {
    const player = await this.convertRawPlayerToPlayerDoc(rawPlayer);
    const playerDoc = new this.playerModel(player);
    try {
      const result = await playerDoc.save();
      return result;
    } catch (error) {
      console.log(error);
      return player;
    }
  }

  async upsertPlayerById(rawPlayerDto: RawPlayerDto) {
    const player = await this.convertRawPlayerToPlayerDoc(rawPlayerDto);
    const filter = { playerPk: rawPlayerDto.id };
    const result = this.playerModel.findOneAndUpdate(filter, player, {
      new: true,
      upsert: true,
    });
    console.log(result);
    return result;
  }

  async convertRawPlayerToPlayerDoc(rawPlayer: RawPlayerDto): Promise<Player> {
    const {
      fullName,
      link,
      firstName,
      lastName,
      primaryNumber,
      birthDate,
      currentAge,
      birthCity,
      birthStateProvince,
      birthCountry,
      nationality,
      height,
      weight,
      active,
      alternateCaptain,
      captain,
      rookie,
      shootsCatches,
      rosterStatus,
    } = rawPlayer;

    const playerPk = rawPlayer.id;
    const primaryPosition = rawPlayer.primaryPosition;
    const currentTeam = await this.teamsService.getTeamObjectIdByTeamId(
      rawPlayer.currentTeam.id,
    );

    const player: Player = {
      playerPk,
      fullName,
      link,
      firstName,
      lastName,
      primaryNumber,
      birthDate,
      currentAge,
      birthCity,
      birthStateProvince,
      birthCountry,
      nationality,
      height,
      weight,
      active,
      alternateCaptain,
      captain,
      rookie,
      shootsCatches,
      rosterStatus,
      primaryPosition,
      currentTeam,
    };
    return player;
  }
}
