import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  private readonly logger = new Logger(PlayersService.name);

  async createAndUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;

    const playerExist = this.find(Object.keys({ email }).pop(), email);

    if (!playerExist) return this.create(createPlayerDto);

    this.update(playerExist, createPlayerDto);
  }

  async getPlayers(): Promise<Player[]> {
    return this.players;
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    const wordSearch = 'email';
    const player = this.find(wordSearch, email);
    if (!player) {
    }
    return player;
  }

  async deletePlayer(email: string): Promise<void> {
    const player = this.find('email', email);

    if (player) {
      throw new NotFoundException(`Player with email ${email} not found.`);
    }
    this.players.splice(
      this.players.findIndex((p) => p.email === email),
      1,
    );
  }

  private create(createPlayerDto: CreatePlayerDto): void {
    const { name, cellPhone, email } = createPlayerDto;

    const player: Player = {
      _id: uuidv4(),
      name,
      cellPhone,
      email,
      ranking: 'A',
      rankingPosition: 1,
      urlPhotoPlayer: 'www.google.com.br/foto123.jpg',
    };
    this.logger.log(`createAndUpdatePlayerDTO ${JSON.stringify(player)}`);

    this.players.push(player);
  }

  private update(findedPlayer: Player, createPlayerDto: CreatePlayerDto): void {
    findedPlayer = { ...findedPlayer, ...createPlayerDto };
    const index = this.players.findIndex((p) => p._id === findedPlayer._id);
    this.players[index] = findedPlayer;
  }

  private find(attr, value): Player {
    return this.players.find((p) => p[attr] === value);
  }
}
