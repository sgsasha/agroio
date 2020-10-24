import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DevicesService {
  constructor(@InjectModel('Device') private deviceModel: Model<any>) {}

  async create(deviceDto: IDevice): Promise<void> {
    const createdTemperatureModel = new this.deviceModel(deviceDto);
    return createdTemperatureModel.save();
  }

  async update(deviceData: Partial<IDevice>): Promise<void> {
    const query = { 
      deviceId: deviceData.deviceId
    };
    const options = {
      upsert: true
    };
    return await this.deviceModel.findOneAndUpdate(query, deviceData, options);
  }

  async findAll(): Promise<IDevice[]> {
    return this.deviceModel.find().exec();
  }

  async findOne(query: Object): Promise<IDevice> {
    return this.deviceModel.findOne(query).exec();
  }
}
