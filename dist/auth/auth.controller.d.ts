import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { UserDto } from "../users/user.schema";
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(user: UserDto): Promise<{
        accessToken: string;
    }>;
    signUp(user: UserDto, response: any): Promise<void>;
}
