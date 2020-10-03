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
exports.TemperatureController = void 0;
const common_1 = require("@nestjs/common");
const temperature_service_1 = require("./temperature.service");
let TemperatureController = class TemperatureController {
    constructor(temperatureService) {
        this.temperatureService = temperatureService;
        this.temperature = 0;
    }
    setTemperature(req) {
        console.log(req.body.temperature);
        this.temperature = req.body.temperature;
        const payload = {
            temperature: req.body.temperature,
            date: new Date()
        };
        this.temperatureService.create(payload);
    }
    async getTemperature() {
        const list = await this.temperatureService.getLatest();
        return list[0];
    }
    async getTemperatureList() {
        return await this.temperatureService.findAll();
    }
};
__decorate([
    common_1.Post('setTemperature'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TemperatureController.prototype, "setTemperature", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TemperatureController.prototype, "getTemperature", null);
__decorate([
    common_1.Get('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TemperatureController.prototype, "getTemperatureList", null);
TemperatureController = __decorate([
    common_1.Controller('temperature'),
    __metadata("design:paramtypes", [temperature_service_1.TemperatureService])
], TemperatureController);
exports.TemperatureController = TemperatureController;
//# sourceMappingURL=temperature.controller.js.map