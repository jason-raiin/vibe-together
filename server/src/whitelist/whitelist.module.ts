import { Module } from '@nestjs/common';
import { WhitelistController } from './whitelist.controller';
import { WhitelistService } from './whitelist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WhitelistRequest, WhitelistRequestSchema } from './whitelist.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: WhitelistRequest.name, schema: WhitelistRequestSchema }],
      'core',
    ),
  ],
  controllers: [WhitelistController],
  providers: [WhitelistService],
})
export class WhitelistModule {}
