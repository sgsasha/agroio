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
exports.MoistureSchema = exports.MoistureRequestDto = exports.MoistureFilterDto = exports.MoistureDto = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let MoistureDto = class MoistureDto {
};
__decorate([
    mongoose_1.Prop(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], MoistureDto.prototype, "moisture", void 0);
__decorate([
    mongoose_1.Prop(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], MoistureDto.prototype, "date", void 0);
__decorate([
    mongoose_1.Prop(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], MoistureDto.prototype, "deviceId", void 0);
MoistureDto = __decorate([
    mongoose_1.Schema()
], MoistureDto);
exports.MoistureDto = MoistureDto;
class MoistureFilterDto {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], MoistureFilterDto.prototype, "deviceId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], MoistureFilterDto.prototype, "fromDate", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], MoistureFilterDto.prototype, "toDate", void 0);
exports.MoistureFilterDto = MoistureFilterDto;
class MoistureRequestDto {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", MoistureFilterDto)
], MoistureRequestDto.prototype, "filters", void 0);
exports.MoistureRequestDto = MoistureRequestDto;
exports.MoistureSchema = mongoose_1.SchemaFactory.createForClass(MoistureDto);
//# sourceMappingURL=moisture.schema.js.map