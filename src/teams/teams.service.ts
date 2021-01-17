import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { rawTeamDto } from './dto/create-team.dto';
import { Team, TeamDocument } from './team.model';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel('Team') private readonly teamModel: Model<TeamDocument>,
  ) {}

  async create(createTeamDto: rawTeamDto): Promise<Team> {
    const createdTeam = new this.teamModel(createTeamDto);
    return createdTeam.save();
  }

  async findAll(): Promise<Team[]> {
    return this.teamModel.find().exec();
  }
}
