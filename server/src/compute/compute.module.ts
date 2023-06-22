import { Module } from '@nestjs/common';
import { ComputeService } from './compute.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from 'src/rooms/rooms.schema';
import { User, UserSchema } from 'src/users/users.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Room.name, schema: RoomSchema },
        { name: User.name, schema: UserSchema },
      ],
      'core',
    ),
    UsersModule,
  ],
  providers: [ComputeService],
  exports: [ComputeService],
})
export class ComputeModule {}
