import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    cellPhone: { type: String, unique: true },
    email: { type: String, unique: true },
    name: { type: String },
    ranking: { type: String },
    rankingPosition: { type: Number },
    urlPhotoPlayer: { type: String },
  },
  { timestamps: true, collection: 'players' },
);
