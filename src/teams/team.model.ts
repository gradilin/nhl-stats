import { Prop, raw, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema()
export class Team {
  @Prop()
  teamPk: number;
  @Prop({ unique: true, required: true })
  name: string;
  @Prop({ required: true })
  link: string;
  @Prop({ required: true })
  abbreviation: string;
  @Prop({ required: true })
  teamName: string;
  @Prop({ required: true })
  locationName: string;
  @Prop({ required: true })
  firstYearOfPlay: string;
  @Prop(
    raw({
      id: { type: Number },
      name: { type: String },
      link: { type: String },
    }),
  )
  division: Record<string, any>;
  @Prop(
    raw({
      id: { type: Number },
      name: { type: String },
      link: { type: String },
    }),
  )
  conference: Record<string, any>;
  @Prop(
    raw({
      franchiseId: { type: Number },
      teamName: { type: String },
      link: { type: String },
    }),
  )
  franchise: Record<string, any>;
  @Prop({ required: true })
  shortName: string;
  @Prop()
  officialSiteUrl: string;
  @Prop({ required: true })
  franchiseId: number;
  @Prop({ required: true })
  active: boolean;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
