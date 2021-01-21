import { Prop, raw, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema()
export class Team {
  @Prop()
  id: number;
  @Prop()
  name: string;
  @Prop()
  link: string;
  @Prop()
  abbreviation: string;
  @Prop()
  teamName: string;
  @Prop()
  locationName: string;
  @Prop()
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
  @Prop()
  shortName: string;
  @Prop()
  officialSiteUrl: string;
  @Prop()
  franchiseId: number;
  @Prop()
  active: boolean;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
