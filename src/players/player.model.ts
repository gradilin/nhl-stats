import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
  @Prop()
  playerPk: number;
  @Prop()
  fullName: string;
  @Prop()
  link: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  primaryNumber: string;
  @Prop()
  birthDate: string;
  @Prop()
  currentAge: number;
  @Prop()
  birthCity: string;
  @Prop()
  birthStateProvince: string;
  @Prop()
  birthCountry: string;
  @Prop()
  nationality: string;
  @Prop()
  height: string;
  @Prop()
  weight: number;
  @Prop()
  active: boolean;
  @Prop()
  alternateCaptain: boolean;
  @Prop()
  captain: boolean;
  @Prop()
  rookie: boolean;
  @Prop()
  shootsCatches: string;
  @Prop()
  rosterStatus: string;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Team' })
  currentTeam: MongooseSchema.Types.ObjectId;
  @Prop(
    raw({
      code: { type: String },
      name: { type: String },
      type: { type: String },
      abbreviation: { type: String },
    }),
  )
  primaryPosition: Record<string, any>;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
