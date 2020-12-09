"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const moisture_schema_1 = require("../moisture/moisture.schema");
const moisture_service_1 = require("../moisture/moisture.service");
const device_schema_1 = require("./device.schema");
const devices_controller_1 = require("./devices.controller");
const devices_service_1 = require("./devices.service");
const auth_module_1 = require("../auth/auth.module");
let DevicesModule = class DevicesModule {
};
DevicesModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Moisture', schema: moisture_schema_1.MoistureSchema },
                { name: 'Device', schema: device_schema_1.DeviceSchema }
            ]),
            auth_module_1.AuthModule
        ],
        controllers: [devices_controller_1.DevicesController],
        providers: [
            devices_service_1.DevicesService,
            moisture_service_1.MoistureService
        ]
    })
], DevicesModule);
exports.DevicesModule = DevicesModule;
//# sourceMappingURL=devices.module.js.map