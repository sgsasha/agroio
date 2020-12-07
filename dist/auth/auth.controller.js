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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const users_service_1 = require("../users/users.service");
const user_schema_1 = require("../users/user.schema");
const local_auth_guard_1 = require("./local-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const auth_schema_1 = require("./auth.schema");
let AuthController = class AuthController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async login(user) {
        const foundedUser = await this.usersService.findOne(user.email);
        return this.authService.login(foundedUser);
    }
    async signUp(user, response) {
        try {
            const data = await this.authService.signUp(user);
            response.json(data);
        }
        catch (e) {
            response.sendStatus(409);
        }
    }
};
__decorate([
    common_1.UseGuards(local_auth_guard_1.LocalAuthGuard),
    common_1.Post('login'),
    swagger_1.ApiResponse({ status: 200, type: auth_schema_1.AuthResponseDto }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.UserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post('signUp'),
    swagger_1.ApiResponse({ status: 200, type: auth_schema_1.AuthResponseDto }),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.UserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map