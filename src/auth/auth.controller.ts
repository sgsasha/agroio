import {Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { UserDto } from "../users/user.schema";
import { LocalAuthGuard } from "./local-auth.guard";
import { ApiResponse } from "@nestjs/swagger";
import { AuthResponseDto } from "./auth.schema";
import {JwtService} from "@nestjs/jwt";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
                private jwtService: JwtService,
                private usersService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiResponse({ status: 200, type: AuthResponseDto })
    async login(@Body() user: UserDto) {
      const foundedUser = await this.usersService.findOne(user.email);
      return this.authService.login(foundedUser);
    }

    @Post('signUp')
    @ApiResponse({ status: 200, type: AuthResponseDto })
    async signUp(@Body() user: UserDto, @Res() response) {
      try {
        const data = await this.authService.signUp(user);
        response.json(data);
      } catch (e) {
        response.sendStatus(409);
      }
    }
}
