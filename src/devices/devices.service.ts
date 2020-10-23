import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DevicesService {
  constructor(@InjectModel('Device') private deviceModel: Model<any>) {}

  async create(deviceDto: any): Promise<void> {
    const createdTemperatureModel = new this.deviceModel(deviceDto);
    return createdTemperatureModel.save();
  }

  async findAll(): Promise<IDevice[]> {
    return this.deviceModel.find().exec();
  }

  async findOne(query: Object): Promise<IDevice> {
    return this.deviceModel.findOne(query).exec();
  }
}
