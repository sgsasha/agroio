import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';

@Injectable()
export class MoistureService {
  constructor(@InjectModel('Moisture') private moistureModel: Model<any>) {}

  public async create(moistureDto: IMoistureData): Promise<void> {
    const createdMoistureModel = new this.moistureModel(moistureDto);
    return createdMoistureModel.save();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async findAll(query: Object = {}): Promise<IMoistureData[]> {
    return this.moistureModel.find(query).exec();
  }

  public async getGroupedByDayMoistures(): Promise<IMoistureData[]> {
    return this.moistureModel.aggregate([
      {
        $project:
          {
            // year: { $year: "$date" },
            // month: { $month: "$date" },
            // day: { $dayOfMonth: "$date" },
            yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            _id: "$id",
            value: "$moisture"
          }
      },
      {
        $group:
          {
            _id: "$yearMonthDay",
            moisture: { $avg: "$value" }
          }
      }
    ]);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async getLatest(query: Object = {}): Promise<IMoistureData> {
    const moistureData = await this.moistureModel.find(query).limit(1).sort({$natural:-1}).exec();
    // console.log(moistureData);
    return moistureData[0];
  }

  public getFilterQuery (body: any) {
    const query = {};
    if (body.filters) {
      const filters = body.filters;
      if (filters.deviceId) {
        query["deviceId"] = filters.deviceId;
      }
      if (filters.fromDate && filters.toDate) {
        query["date"] = {
          $gte: new Date(filters.fromDate).toISOString(),
          $lte: new Date(filters.toDate).toISOString()
        }
      }
    }
    return query;
  }
}
