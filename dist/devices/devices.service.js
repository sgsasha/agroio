"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let DevicesService = class DevicesService {
    constructor(deviceModel) {
        this.deviceModel = deviceModel;
    }
    async create(deviceDto) {
        const createdTemperatureModel = new this.deviceModel(deviceDto);
        try {
            await createdTemperatureModel.save();
        }
        catch (e) {
            throw new Error("Duplicated device");
        }
    }
    async update(deviceData) {
        const query = {
            deviceId: deviceData.deviceId
        };
        const options = {
            upsert: false
        };
        return await this.deviceModel.findOneAndUpdate(query, deviceData, options);
    }
    async findAll(email) {
        return this.deviceModel.find({ user: email }).exec();
    }
    async getTotal(query = {}) {
        return this.deviceModel.find(query).count().exec();
    }
    async getFilteredList(query, pagination, sorting) {
        return this.deviceModel
            .find(query)
            .sort({ [sorting === null || sorting === void 0 ? void 0 : sorting.sortBy]: (sorting === null || sorting === void 0 ? void 0 : sorting.sortDesc) ? -1 : 1 })
            .limit(pagination.pageSize)
            .skip(pagination.pageSize * pagination.page)
            .exec();
    }
    async delete(query) {
        return this.deviceModel
            .find(query)
            .remove()
            .exec();
    }
    async findOne(query) {
        return this.deviceModel.findOne(query).exec();
    }
};
DevicesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Device')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DevicesService);
exports.DevicesService = DevicesService;
//# sourceMappingURL=devices.service.js.map