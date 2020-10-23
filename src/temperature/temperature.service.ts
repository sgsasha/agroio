import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TemperatureService {
  constructor(@InjectModel('Temperature') private temperatureModel: Model<any>) {}

  async create(temperatureDto: ITemperatureData): Promise<void> {
    const createdTemperatureModel = new this.temperatureModel(temperatureDto);
    return createdTemperatureModel.save();
  }

  async findAll(query: Object = {}): Promise<ITemperatureData[]> {
    return this.temperatureModel.find(query).exec();
  }

  async getLatest(): Promise<ITemperatureData[]> {
    return this.temperatureModel.find().limit(1).sort({$natural:-1}).exec();
  }
}
