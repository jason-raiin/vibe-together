import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoomsModule } from './rooms/rooms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SpotifyModule } from './spotify/spotify.module';
import { ComputeModule } from './compute/compute.module';
import { WhitelistModule } from './whitelist/whitelist.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get('NODE_ENV') === 'test'
            ? configService.get('TEST_DB_URI')
            : configService.get('CORE_DB_URI'),
      }),
      connectionName: 'core',
    }),
    UsersModule,
    RoomsModule,
    SpotifyModule,
    ComputeModule,
    WhitelistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
