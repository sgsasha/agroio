import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MoistureService {
  constructor(@InjectModel('Moisture') private moistureModel: Model<any>) {}

  async create(moistureDto: IMoistureData): Promise<void> {
    const createdMoistureModel = new this.moistureModel(moistureDto);
    return createdMoistureModel.save();
  }

  async findAll(): Promise<IMoistureData[]> {
    return this.moistureModel.find().exec();
  }

  async getLatest(): Promise<IMoistureData[]> {
    return this.moistureModel.find().limit(1).sort({$natural:-1}).exec();
  }
}
