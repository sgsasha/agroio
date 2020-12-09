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
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const device_schema_1 = require("./device.schema");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("../auth/auth.service");
let DevicesController = class DevicesController {
    constructor(devicesService, authService, moistureService) {
        this.devicesService = devicesService;
        this.authService = authService;
        this.moistureService = moistureService;
    }
    async setDevice(device, req, res) {
        const authenticatedUserEmail = this.authService.getUserFromToken(req);
        const deviceToCreate = {
            deviceId: device.deviceId,
            user: authenticatedUserEmail,
            isOnline: false,
            isPumpRunning: false,
            temperature: 0,
            moisture: 0,
            isMoistureThresholdEnabled: false,
            minMoistureThreshold: 0,
            maxMoistureThreshold: 0,
            waterLevel: 0
        };
        try {
            await this.devicesService.create(deviceToCreate);
            res.sendStatus(200);
        }
        catch (e) {
            res.sendStatus(409);
        }
    }
    async updateDevice(device, req) {
        const deviceToChange = await this.devicesService.findOne({ deviceId: device.deviceId });
        const deviceToUpdate = Object.assign(Object.assign({}, device), { user: deviceToChange.user });
        await this.devicesService.update(deviceToUpdate);
        const lastMoistureReport = await this.moistureService.getLatest({ deviceId: device.deviceId });
        if (lastMoistureReport) {
            const lastActivityDate = lastMoistureReport.date;
            if (date_fns_1.differenceInMinutes(new Date(), new Date(lastActivityDate)) > 4) {
                this.addMoisture(deviceToUpdate);
            }
        }
        else {
            this.addMoisture(deviceToUpdate);
        }
    }
    async updateDeviceUser(data, req, res) {
        const authenticatedUserEmail = this.authService.getUserFromToken(req);
        const deviceToChange = await this.devicesService.findOne({ deviceId: data.deviceId });
        if (!deviceToChange) {
            res.sendStatus(404);
            return;
        }
        const deviceToUpdate = Object.assign(Object.assign({}, JSON.parse(JSON.stringify(deviceToChange))), { user: data.user });
        if (!deviceToChange) {
            res.sendStatus(404);
            return;
        }
        if (deviceToChange.user !== authenticatedUserEmail) {
            res.sendStatus(401);
        }
        else {
            await this.devicesService.update(deviceToUpdate);
            res.sendStatus(200);
        }
    }
    async getDeviceList(req) {
        const authenticatedUserEmail = this.authService.getUserFromToken(req);
        const allDevices = await this.devicesService.findAll(authenticatedUserEmail);
        await this.checkOnlineStatus(allDevices);
        return await this.devicesService.findAll(authenticatedUserEmail);
    }
    async getFilteredDeviceList(device, req) {
        const authenticatedUserEmail = this.authService.getUserFromToken(req);
        const allDevices = await this.devicesService.getFilteredList({ user: authenticatedUserEmail }, device.filters.paging);
        await this.checkOnlineStatus(allDevices);
        return await this.devicesService.getFilteredList({ user: authenticatedUserEmail }, device.filters.paging);
    }
    async deleteDevice(params, req, res) {
        const authenticatedUserEmail = this.authService.getUserFromToken(req);
        const device = await this.devicesService.findOne({ deviceId: params.id });
        console.log(device);
        if (!device) {
            res.sendStatus(404);
            return;
        }
        if (device.user !== authenticatedUserEmail) {
            res.sendStatus(401);
        }
        else {
            this.checkOnlineStatus([device]);
            const deviceToSend = await this.devicesService.findOne({ deviceId: params.id });
            res.json(deviceToSend);
        }
    }
    async getDeviceById(params, req, res) {
        const authenticatedUserEmail = this.authService.getUserFromToken(req);
        const device = await this.devicesService.findOne({ deviceId: params.id });
        if (!device) {
            res.sendStatus(404);
            return;
        }
        if (device.user !== authenticatedUserEmail) {
            res.sendStatus(401);
        }
        else {
            this.devicesService.delete({ deviceId: params.id });
            res.sendStatus(204);
        }
    }
    async checkOnlineStatus(devices) {
        const promisesArray = [];
        for (const device of devices) {
            promisesArray.push(new Promise(async (resolve) => {
                const lastMoistureReport = await this.moistureService.getLatest({ deviceId: device.deviceId, date: { $exists: true } });
                if (lastMoistureReport) {
                    const lastActivityDate = lastMoistureReport.date;
                    if (date_fns_1.differenceInMinutes(new Date(), new Date(lastActivityDate)) > 5) {
                        this.devicesService.update({
                            deviceId: device.deviceId,
                            isOnline: false
                        });
                    }
                    else {
                        this.devicesService.update({
                            deviceId: device.deviceId,
                            isOnline: true
                        });
                    }
                }
                else {
                    this.devicesService.update({
                        deviceId: device.deviceId,
                        isOnline: false
                    });
                }
                resolve();
            }));
        }
        await Promise.all(promisesArray);
    }
    ;
    addMoisture(device) {
        if (device.moisture) {
            this.moistureService.create({
                moisture: device.moisture,
                deviceId: device.deviceId,
                date: new Date()
            });
        }
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('create'),
    __param(0, common_1.Body()), __param(1, common_1.Req()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [device_schema_1.ICreateDeviceData, Object, Object]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "setDevice", null);
__decorate([
    common_1.Post('update'),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [device_schema_1.DeviceDto, Object]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "updateDevice", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('changeUser'),
    __param(0, common_1.Body()), __param(1, common_1.Req()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [device_schema_1.IChangeDeviceUserData, Object, Object]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "updateDeviceUser", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('list'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiResponse({ status: 200, type: device_schema_1.DeviceDto, isArray: true }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "getDeviceList", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('list2'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiResponse({ status: 200, type: device_schema_1.DeviceDto, isArray: true }),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [device_schema_1.IDeviceListReqData, Object]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "getFilteredDeviceList", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(':id'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiResponse({ status: 200, type: device_schema_1.DeviceDto }),
    __param(0, common_1.Param()), __param(1, common_1.Req()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "deleteDevice", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(':id'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiResponse({ status: 204 }),
    __param(0, common_1.Param()), __param(1, common_1.Req()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "getDeviceById", null);
DevicesController = __decorate([
    common_1.Controller('devices'),
    __metadata("design:paramtypes", [devices_service_1.DevicesService,
        auth_service_1.AuthService,
        moisture_service_1.MoistureService])
], DevicesController);
exports.DevicesController = DevicesController;
//# sourceMappingURL=devices.controller.js.map