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

  async findAll(query: Object = {}): Promise<IMoistureData[]> {
    return this.moistureModel.find(query).exec();
  }

  async getLatest(query: Object = {}): Promise<IMoistureData> {
    const moistureData = await this.moistureModel.find(query).limit(1).sort({$natural:-1}).exec();
    // console.log(moistureData);
    return moistureData[0];
  }
}
