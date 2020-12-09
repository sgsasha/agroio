import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { UserDto } from "../users/user.schema";
import { JwtService } from "@nestjs/jwt";
export declare class AuthController {
    private authService;
    private jwtService;
    private usersService;
    constructor(authService: AuthService, jwtService: JwtService, usersService: UsersService);
    login(user: UserDto): Promise<{
        accessToken: string;
    }>;
    signUp(user: UserDto, response: any): Promise<void>;
}
