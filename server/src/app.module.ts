import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpotifyModule } from './spotify/spotify.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [SpotifyModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
