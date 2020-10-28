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
exports.DevicesController = void 0;
const common_1 = require("@nestjs/common");
const devices_service_1 = require("./devices.service");
const moisture_service_1 = require("../moisture/moisture.service");
const date_fns_1 = require("date-fns");
let DevicesController = class DevicesController {
    constructor(devicesService, moistureService) {
        this.devicesService = devicesService;
        this.moistureService = moistureService;
    }
    setDevice(req) {
        this.devicesService.create(req.body);
    }
    updateDevice(req) {
        this.devicesService.update(req.body);
        if (req.body.moisture) {
            this.moistureService.create(req.body);
        }
    }
    async getDeviceList() {
        const allDevices = await this.devicesService.findAll();
        await this.checkOnlineStatus(allDevices);
        return await this.devicesService.findAll();
    }
    async getDeviceById(params) {
        const device = await this.devicesService.findOne({ deviceId: params.id });
        this.checkOnlineStatus([device]);
        return await this.devicesService.findOne({ deviceId: params.id });
    }
    async checkOnlineStatus(devices) {
        const promisesArray = [];
        devices.forEach(async (device) => {
            promisesArray.push(new Promise(async (resolve) => {
                const lastMoistureReport = await this.moistureService.getLatest({ deviceId: device.deviceId });
                const lastActivityDate = lastMoistureReport.date;
                if (date_fns_1.differenceInMinutes(new Date(), new Date(lastActivityDate)) > 5) {
                    this.devicesService.update({
                        deviceId: device.deviceId,
                        isOnline: false
                    });
                    resolve();
                }
                else {
                    this.devicesService.update({
                        deviceId: device.deviceId,
                        isOnline: true
                    });
                    resolve();
                }
            }));
        });
        await Promise.all(promisesArray);
    }
    ;
};
__decorate([
    common_1.Post('set'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DevicesController.prototype, "setDevice", null);
__decorate([
    common_1.Post('update'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DevicesController.prototype, "updateDevice", null);
__decorate([
    common_1.Get('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "getDeviceList", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "getDeviceById", null);
DevicesController = __decorate([
    common_1.Controller('devices'),
    __metadata("design:paramtypes", [devices_service_1.DevicesService,
        moisture_service_1.MoistureService])
], DevicesController);
exports.DevicesController = DevicesController;
//# sourceMappingURL=devices.controller.js.map