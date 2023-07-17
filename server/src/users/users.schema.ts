import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AudioFeatures } from 'src/dtos/features.dto';
import { Genre } from 'src/dtos/genre.dto';
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

  @Prop()
  topGenres: Genre[];

  @Prop()
  trackFeatures: AudioFeatures;
}

export const UserSchema = SchemaFactory.createForClass(User);
