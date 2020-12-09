import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviceDto } from "./device.schema";

@Injectable()
export class DevicesService {
  constructor(@InjectModel('Device') private deviceModel: Model<any>) {}

  async create(deviceDto: DeviceDto): Promise<void> {
    const createdTemperatureModel = new this.deviceModel(deviceDto);
    try {
      await createdTemperatureModel.save();
    } catch (e) {
      throw new Error("Duplicated device");
    }
  }

  async update(deviceData: Partial<DeviceDto>): Promise<void> {
    const query = { 
      deviceId: deviceData.deviceId
    };
    const options = {
      upsert: false
    };
    return await this.deviceModel.findOneAndUpdate(query, deviceData, options);
  }

  async findAll(email: string): Promise<DeviceDto[]> {
    return this.deviceModel.find({user: email}).exec();
  }

  async findOne(query: any): Promise<DeviceDto> {
    return this.deviceModel.findOne(query).exec();
  }
}
