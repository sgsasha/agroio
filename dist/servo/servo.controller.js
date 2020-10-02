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
exports.ServoController = void 0;
const common_1 = require("@nestjs/common");
var ServoStatuses;
(function (ServoStatuses) {
    ServoStatuses["START"] = "start";
    ServoStatuses["STOP"] = "stop";
})(ServoStatuses || (ServoStatuses = {}));
let ServoController = class ServoController {
    constructor() {
        this.runServo = false;
    }
    setTemperature(req, res) {
        const status = req.body.status;
        let isError = false;
        if (status === ServoStatuses.START || status === ServoStatuses.STOP) {
            console.log(`Updating status with value: '${req.body.status}'`);
            this.runServo = req.body.status === ServoStatuses.START;
        }
        else {
            isError = true;
            console.error(`ERROR: unknown status: '${req.body.status}'`);
        }
        res.status(isError ? common_1.HttpStatus.NOT_ACCEPTABLE : common_1.HttpStatus.OK).send();
    }
    getTemperature(res) {
        res.status(common_1.HttpStatus.OK).json({ runServo: this.runServo });
    }
};
__decorate([
    common_1.Post('updateStatus'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ServoController.prototype, "setTemperature", null);
__decorate([
    common_1.Get('status'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ServoController.prototype, "getTemperature", null);
ServoController = __decorate([
    common_1.Controller('servo')
], ServoController);
exports.ServoController = ServoController;
//# sourceMappingURL=servo.controller.js.map