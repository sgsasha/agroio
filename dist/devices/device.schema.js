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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceSchema = exports.IDeviceListReqData = exports.IDeviceFilters = exports.IPagination = exports.IChangeDeviceUserData = exports.ICreateDeviceData = exports.DeviceDto = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let DeviceDto = class DeviceDto {
};
__decorate([
    mongoose_1.Prop({
        unique: true,
        required: true
    }),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DeviceDto.prototype, "deviceId", void 0);
__decorate([
    mongoose_1.Prop(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DeviceDto.prototype, "user", void 0);
__decorate([
    mongoose_1.Prop(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], DeviceDto.prototype, "isOnline", void 0);
__decorate([
    mongoose_1.Prop(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], DeviceDto.prototype, "isPumpRunning", void 0);
__decorate([
    mongoose_1.Prop(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DeviceDto.prototype, "temperature", void 0);
__decorate([
    mongoose_1.Prop(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DeviceDto.prototype, "moisture", void 0);
__decorate([
    mongoose_1.Prop(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], DeviceDto.prototype, "isMoistureThresholdEnabled", void 0);
__decorate([
    mongoose_1.Prop(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DeviceDto.prototype, "minMoistureThreshold", void 0);
__decorate([
    mongoose_1.Prop(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DeviceDto.prototype, "maxMoistureThreshold", void 0);
__decorate([
    mongoose_1.Prop(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DeviceDto.prototype, "waterLevel", void 0);
DeviceDto = __decorate([
    mongoose_1.Schema()
], DeviceDto);
exports.DeviceDto = DeviceDto;
class ICreateDeviceData {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ICreateDeviceData.prototype, "deviceId", void 0);
exports.ICreateDeviceData = ICreateDeviceData;
class IChangeDeviceUserData {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], IChangeDeviceUserData.prototype, "deviceId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], IChangeDeviceUserData.prototype, "user", void 0);
exports.IChangeDeviceUserData = IChangeDeviceUserData;
class IPagination {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], IPagination.prototype, "page", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], IPagination.prototype, "pageSize", void 0);
exports.IPagination = IPagination;
class IDeviceFilters {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", IPagination)
], IDeviceFilters.prototype, "paging", void 0);
exports.IDeviceFilters = IDeviceFilters;
class IDeviceListReqData {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", IDeviceFilters)
], IDeviceListReqData.prototype, "filters", void 0);
exports.IDeviceListReqData = IDeviceListReqData;
exports.DeviceSchema = mongoose_1.SchemaFactory.createForClass(DeviceDto);
//# sourceMappingURL=device.schema.js.map