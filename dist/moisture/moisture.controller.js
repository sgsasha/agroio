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
const swagger_1 = require("@nestjs/swagger");
const moisture_schema_1 = require("./moisture.schema");
const auth_service_1 = require("../auth/auth.service");
let MoistureController = class MoistureController {
    constructor(moistureService, authService, devicesService) {
        this.moistureService = moistureService;
        this.authService = authService;
        this.devicesService = devicesService;
    }
    async setMoisture(req) {
        const moisture = req.body.moisture < 0 ? 0 : req.body.moisture;
        const payload = {
            moisture: moisture,
            deviceId: req.body.deviceId,
            date: new Date()
        };
        await this.moistureService.create(payload);
        await this.devicesService.update({
            deviceId: req.body.deviceId,
            moisture: moisture
        });
        const deviceData = await this.devicesService.findOne({ deviceId: req.body.deviceId });
        if (deviceData.isMoistureThresholdEnabled) {
            if (moisture <= deviceData.minMoistureThreshold) {
                this.devicesService.update({
                    deviceId: req.body.deviceId,
                    isPumpRunning: true
                });
            }
            if (moisture >= deviceData.maxMoistureThreshold) {
                this.devicesService.update({
                    deviceId: req.body.deviceId,
                    isPumpRunning: false
                });
            }
        }
    }
    async getMoistureList(params) {
        return await this.moistureService.findAll({ deviceId: params.id });
    }
    async getGroupedMoistures(params) {
        return await this.moistureService.getGroupedByDayMoistures();
    }
    async getFilteredMoistureList(data, req, res) {
        console.log(data);
        const query = this.moistureService.getFilterQuery(data);
        const authenticatedUserEmail = this.authService.getUserFromToken(req);
        const device = await this.devicesService.findOne({ deviceId: data.filters.deviceId });
        if (device.user !== authenticatedUserEmail) {
            res.sendStatus(401);
        }
        else {
            const moistureToSend = await this.moistureService.findAll(query);
            res.json(moistureToSend);
        }
    }
};
__decorate([
    swagger_1.ApiExcludeEndpoint(),
    common_1.Post('set'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MoistureController.prototype, "setMoisture", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiResponse({ status: 200, type: moisture_schema_1.MoistureDto }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MoistureController.prototype, "getMoistureList", null);
__decorate([
    common_1.Get('device/:id'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiResponse({ status: 200, type: moisture_schema_1.MoistureDto }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MoistureController.prototype, "getGroupedMoistures", null);
__decorate([
    common_1.Post('list'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiResponse({ status: 200, type: moisture_schema_1.MoistureDto, isArray: true }),
    __param(0, common_1.Body()), __param(1, common_1.Req()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [moisture_schema_1.MoistureRequestDto, Object, Object]),
    __metadata("design:returntype", Promise)
], MoistureController.prototype, "getFilteredMoistureList", null);
MoistureController = __decorate([
    common_1.Controller('moisture'),
    __metadata("design:paramtypes", [moisture_service_1.MoistureService,
        auth_service_1.AuthService,
        devices_service_1.DevicesService])
], MoistureController);
exports.MoistureController = MoistureController;
//# sourceMappingURL=moisture.controller.js.map