import { Body, Controller, Post } from '@nestjs/common';
import { WhitelistService } from './whitelist.service';

@Controller('whitelist')
export class WhitelistController {
  constructor(private whitelistService: WhitelistService) {}

  @Post()
  async requestWhitelist(
    @Body('email') email: string,
    @Body('timestamp') timestamp: Date,
  ) {
    return await this.whitelistService.requestWhitelist(email, timestamp);
  }
}
