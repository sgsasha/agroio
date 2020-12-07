import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from "../users/user.schema";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: UserDto): Promise<{
        accessToken: string;
    }>;
    signUp(user: UserDto): Promise<{
        accessToken: string;
    }>;
    hashPassword(password: string): Promise<string>;
    comparePasswords(newPassword: string, passwordHash: string): Promise<boolean>;
}
