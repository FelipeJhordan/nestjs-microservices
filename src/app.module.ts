import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { PlayersModule } from './players/players.module';
import { mongoUrlWithParams } from './utils/getMongoUrl';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(mongoUrlWithParams()),
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
