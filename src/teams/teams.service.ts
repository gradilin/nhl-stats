import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RawTeamDto } from './dto/raw-team.dto';
import { Team, TeamDocument } from './team.model';

@Injectable()
export class TeamsService {
  constructor(@InjectModel('Team') private teamModel: Model<TeamDocument>) {}

  async create(team: Team): Promise<Team> {
    const createdTeam = new this.teamModel(team);
    const result = await createdTeam.save();
    return result;
  }

  async findAll(): Promise<Team[]> {
    return this.teamModel.find().exec();
  }

  async findByTeamId(teamId: number): Promise<Team> {
    return this.teamModel.findOne({ id: teamId });
  }

  async upsertTeamById(team: Team): Promise<Team> {
    const filter = { teamPk: team.teamPk };
    const upsertedTeam = this.teamModel.findOneAndUpdate(filter, team, {
      new: true,
      upsert: true, // Make this update into an upsert
    });
    return upsertedTeam;
  }

  convertTeamDtoToTeam(rawTeam: RawTeamDto): Team {
    const {
      id,
      name,
      link,
      abbreviation,
      teamName,
      locationName,
      firstYearOfPlay,
      division,
      conference,
      franchise,
      shortName,
      officialSiteUrl,
      franchiseId,
      active,
    } = rawTeam;
    const teamPk = id;
    // console.log(rawTeam);
    const team: Team = {
      teamPk,
      name,
      link,
      abbreviation,
      teamName,
      locationName,
      firstYearOfPlay,
      division,
      conference,
      franchise,
      shortName,
      officialSiteUrl,
      franchiseId,
      active,
    };
    return team;
  }
  // async wipeData(): Promise<string> {
  //   const destroy = await this.teamModel.deleteMany();
  //   return destroy;
  // }
}
