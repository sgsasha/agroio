import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PumpService {
  constructor(@InjectModel('PumpStatus') private pumpModel: Model<any>) {}

  async create(pumpStatus: IPumpStatus): Promise<void> {
    const query = { 
      deviceId: pumpStatus.deviceId
    };
    const options = {
      upsert: true
    };
    return await this.pumpModel.findOneAndUpdate(query, pumpStatus, options);
  }

  async findAll(): Promise<IPumpStatus[]> {
    return this.pumpModel.find().exec();
  }

  async getDevicePumpStatus(id: string): Promise<IPumpStatus> {
    return this.pumpModel.findOne({deviceId: id}).exec();
  }

  async getLatest(): Promise<IPumpStatus[]> {
    return this.pumpModel.find().limit(1).sort({$natural:-1}).exec();
  }
}