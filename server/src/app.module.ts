import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [UsersModule, ConfigModule.forRoot({ isGlobal: true }), RoomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}