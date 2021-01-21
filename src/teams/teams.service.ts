import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamDocument } from './team.model';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel('Team') private teamModel: Model<TeamDocument>,
  ) {}

  async create(team: Team): Promise<Team> {
    console.log(team);
    const createdTeam = new this.teamModel(team);
    const result = await createdTeam.save();
    console.log(result);
    return result;
  }
  
  async findAll(): Promise<Team[]> {
    return this.teamModel.find().exec();
  }

  // async wipeData(): Promise<string> {
  //   const destroy = await this.teamModel.deleteMany();
  //   return destroy;
  // }
}
