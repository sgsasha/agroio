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
exports.MoistureController = void 0;
const common_1 = require("@nestjs/common");
const moisture_service_1 = require("./moisture.service");
const devices_service_1 = require("../devices/devices.service");
let MoistureController = class MoistureController {
    constructor(moistureService, devicesService) {
        this.moistureService = moistureService;
        this.devicesService = devicesService;
    }
    async setMoisture(req) {
        const moisture = req.body.moisture < 0 ? 0 : req.body.moisture;
        const payload = {
            moisture: moisture,
            deviceId: req.body.deviceId,
            date: new Date()
        };
        this.moistureService.create(payload);
        this.devicesService.update({
            deviceId: req.body.deviceId,
            moisture: moisture
        });
        const deviceData = await this.devicesService.findOne({ deviceId: req.body.deviceId });
    }
    async getLatestMoisture() {
        const list = await this.moistureService.getLatest();
        return list[0];
    }
    async getMoistureList(params) {
        return await this.moistureService.findAll({ deviceId: params.id });
    }
};
__decorate([
    common_1.Post('set'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MoistureController.prototype, "setMoisture", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MoistureController.prototype, "getLatestMoisture", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MoistureController.prototype, "getMoistureList", null);
MoistureController = __decorate([
    common_1.Controller('moisture'),
    __metadata("design:paramtypes", [moisture_service_1.MoistureService,
        devices_service_1.DevicesService])
], MoistureController);
exports.MoistureController = MoistureController;
//# sourceMappingURL=moisture.controller.js.map