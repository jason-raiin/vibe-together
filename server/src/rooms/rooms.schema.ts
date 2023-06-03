import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/users.schema';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  users: string[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
