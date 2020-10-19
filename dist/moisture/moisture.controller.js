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
let MoistureController = class MoistureController {
    constructor(moistureService) {
        this.moistureService = moistureService;
        this.temperature = 0;
    }
    setTemperature(req) {
        console.log(req.body.moisture);
        this.temperature = req.body.moisture;
        const payload = {
            moisture: req.body.moisture < 0 ? 0 : req.body.moisture,
            date: new Date()
        };
        this.moistureService.create(payload);
    }
    async getTemperature() {
        const list = await this.moistureService.getLatest();
        return list[0];
    }
    async getTemperatureList() {
        return await this.moistureService.findAll();
    }
};
__decorate([
    common_1.Post('set'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MoistureController.prototype, "setTemperature", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MoistureController.prototype, "getTemperature", null);
__decorate([
    common_1.Get('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MoistureController.prototype, "getTemperatureList", null);
MoistureController = __decorate([
    common_1.Controller('moisture'),
    __metadata("design:paramtypes", [moisture_service_1.MoistureService])
], MoistureController);
exports.MoistureController = MoistureController;
//# sourceMappingURL=moisture.controller.js.map