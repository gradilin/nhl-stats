import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type GameDocument = Game & Document;

@Schema()
export class Game {
  @Prop()
  gamePk: number;
  @Prop()
  link: string;
  @Prop()
  gameType: string;
  @Prop()
  season: string;
  @Prop()
  gameDate: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Team' })
  homeTeam: mongoose.ObjectId;
  @Prop()
  homeScore: number;
  @Prop(
    raw({
      wins: { type: Number },
      losses: { type: Number },
      ot: { type: Number },
      type: { type: String },
    }),
  )
  homeRecord: Record<string, any>;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Team' })
  awayTeam: mongoose.ObjectId;
  @Prop()
  awayScore: number;
  @Prop(
    raw({
      wins: { type: Number },
      losses: { type: Number },
      ot: { type: Number },
      type: { type: String },
    }),
  )
  awayRecord: Record<string, any>;
  @Prop()
  venue: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
