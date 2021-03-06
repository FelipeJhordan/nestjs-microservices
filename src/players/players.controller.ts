import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('jogadores')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createAndUpdatePlayers(@Body() createPlayerDto: CreatePlayerDto) {
    await this.playersService.createAndUpdatePlayer(createPlayerDto);
  }

  @Get()
  async getPlayers(@Query('email') email: string): Promise<Player[] | Player> {
    if (!!email) return await this.playersService.getPlayerByEmail(email);
    return await this.playersService.getPlayers();
  }

  @Delete()
  async deletePlayer(@Query('email') email: string): Promise<void> {
    console.log(email);
    return await this.playersService.deletePlayer(email);
  }
}
