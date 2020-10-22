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
exports.PumpController = void 0;
const common_1 = require("@nestjs/common");
const pump_service_1 = require("./pump.service");
let PumpController = class PumpController {
    constructor(pumpService) {
        this.pumpService = pumpService;
    }
    async setPumpStatus(req) {
        return await this.pumpService.create(req.body);
    }
    async getPumpStatus(params) {
        return await this.pumpService.getDevicePumpStatus(params.id);
    }
};
__decorate([
    common_1.Post('update'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PumpController.prototype, "setPumpStatus", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PumpController.prototype, "getPumpStatus", null);
PumpController = __decorate([
    common_1.Controller('pumpStatus'),
    __metadata("design:paramtypes", [pump_service_1.PumpService])
], PumpController);
exports.PumpController = PumpController;
//# sourceMappingURL=pump.controller.js.map