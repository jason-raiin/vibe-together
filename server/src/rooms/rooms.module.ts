import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './rooms.schema';
import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/users/users.schema';
import { ComputeModule } from 'src/compute/compute.module';

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
    ComputeModule,
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
