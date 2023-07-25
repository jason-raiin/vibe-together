import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WhitelistRequest, WhitelistRequestDocument } from './whitelist.schema';
import { Model } from 'mongoose';

@Injectable()
export class WhitelistService {
  constructor(
    @InjectModel(WhitelistRequest.name)
    private whitelistRequestModel: Model<WhitelistRequestDocument>,
  ) {}

  async requestWhitelist(email: string, timestamp: Date) {
    const request = new this.whitelistRequestModel({ email, timestamp });
    await request.save();
  }
}
