import { Module } from '@nestjs/common';
import { ComputeService } from './compute.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from 'src/rooms/rooms.schema';
import { User, UserSchema } from 'src/users/users.schema';
import { SpotifyModule } from 'src/spotify/spotify.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Room.name, schema: RoomSchema },
        { name: User.name, schema: UserSchema },
      ],
      'core',
    ),
    SpotifyModule,
  ],
  providers: [ComputeService],
  exports: [ComputeService],
})
export class ComputeModule {}
