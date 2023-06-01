import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './rooms.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Room.name, schema: RoomSchema }],
      'core',
    ),
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
