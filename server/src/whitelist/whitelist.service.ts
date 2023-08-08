import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WhitelistRequest } from './whitelist.schema';
import { Model } from 'mongoose';

@Injectable()
export class WhitelistService {
  constructor(
    @InjectModel(WhitelistRequest.name, 'core')
    private whitelistRequestModel: Model<WhitelistRequest>,
  ) {}

  async requestWhitelist(email: string, timestamp: Date) {
    const request = new this.whitelistRequestModel({ email, timestamp });
    return await request.save();
  }
}
