import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WhitelistRequestDocument = WhitelistRequest & Document;

@Schema()
export class WhitelistRequest {
  @Prop()
  email: string;

  @Prop()
  timestamp: Date;
}

export const WhitelistRequestSchema =
  SchemaFactory.createForClass(WhitelistRequest);
