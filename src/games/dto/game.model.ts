import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';

export type GameDocument = Game & Document;

@Schema()
export class Game {
  @Prop()
  gamePK: number;
  @Prop()
  link: string;
  @Prop()
  gameType: string;
  @Prop()
  season: number;
  @Prop()
  gameDate: Date;
}

export const GameSchema = SchemaFactory.createForClass(Game);
