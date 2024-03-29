"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_module_1 = require("@nestjs/mongoose/dist/mongoose.module");
const moisture_module_1 = require("./moisture/moisture.module");
const devices_module_1 = require("./devices/devices.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_module_1.MongooseModule.forRoot('mongodb+srv://alex:manulkushaettravku@cluster0.04jpx.mongodb.net/agroio?retryWrites=true&w=majority'),
            config_1.ConfigModule.forRoot(),
            moisture_module_1.MoistureModule,
            devices_module_1.DevicesModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule
        ],
        controllers: [
            app_controller_1.AppController,
        ],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map