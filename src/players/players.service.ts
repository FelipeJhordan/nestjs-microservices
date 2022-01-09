import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async createAndUpdatePlayer(
    createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    const { email } = createPlayerDto;

    const playerExist = await this.playerModel.findOne({ email }).exec();

    if (!playerExist) return await this.create(createPlayerDto);

    return await this.update(createPlayerDto);
  }

  async getPlayers(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  async deletePlayer(email: string): Promise<void> {
    const playerExist = await this.playerModel.findOne({ email: email }).exec();
    if (!playerExist) return;
    this.playerModel.deleteOne({ email }).exec();
  }

  private async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const createdPlayer = new this.playerModel(createPlayerDto);
    this.logger.log(`CreatePlayer ${JSON.stringify(createdPlayer)}`);
    return createdPlayer.save();
  }

  private async update(createPlayerDto: CreatePlayerDto): Promise<Player> {
    this.logger.log(`Update Player ${JSON.stringify(createPlayerDto)}`);
    return this.playerModel.findOneAndUpdate(
      { email: createPlayerDto.email },
      { createPlayerDto },
    );
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    const player = await this.playerModel.findOne({ email }).exec();
    if (!player) {
      throw new NotFoundException(`Jogador com email ${email} não encontrado.`);
    }
    return player;
  }
}
