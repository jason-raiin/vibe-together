import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Item } from 'src/dtos/item.dto';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  users: string[];

  @Prop()
  topArtists: Item[];

  @Prop()
  topTracks: Item[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
