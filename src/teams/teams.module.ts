import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamSchema } from './team.model';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Team', schema: TeamSchema }]), HttpModule],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
