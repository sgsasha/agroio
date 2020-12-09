"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoistureModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const device_schema_1 = require("../devices/device.schema");
const devices_service_1 = require("../devices/devices.service");
const moisture_controller_1 = require("./moisture.controller");
const moisture_schema_1 = require("./moisture.schema");
const moisture_service_1 = require("./moisture.service");
const auth_module_1 = require("../auth/auth.module");
let MoistureModule = class MoistureModule {
};
MoistureModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Moisture', schema: moisture_schema_1.MoistureSchema },
                { name: 'Device', schema: device_schema_1.DeviceSchema }
            ]),
            auth_module_1.AuthModule
        ],
        controllers: [
            moisture_controller_1.MoistureController
        ],
        providers: [
            moisture_service_1.MoistureService,
            devices_service_1.DevicesService,
        ]
    })
], MoistureModule);
exports.MoistureModule = MoistureModule;
//# sourceMappingURL=moisture.module.js.map