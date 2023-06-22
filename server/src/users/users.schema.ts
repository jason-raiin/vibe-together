import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Artist, Track } from 'src/dtos/item.dto';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  displayName: string;

  @Prop()
  images: [];

  @Prop({ required: true })
  url: string;

  @Prop()
  topArtists: Artist[];

  @Prop()
  topTracks: Track[];
}

export const UserSchema = SchemaFactory.createForClass(User);
