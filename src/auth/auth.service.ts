import {Injectable, Req} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {UserDto} from "../users/user.schema";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(email: string, pass: string): Promise<any> {
      const user = await this.usersService.findOne(email);
      if (user && await this.comparePasswords(pass, user.password)) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }

    async login(user: UserDto) {
      const payload = { email: user.email, sub: user.id };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }

    async signUp(user: UserDto) {
      const userInDatabase = await this.usersService.findOne(user.email);
      if (userInDatabase) {
          throw new Error("User exists");
      }
      const newUser = {
        email: user.email,
        password: await this.hashPassword(user.password)
      };
      await this.usersService.create(newUser);
      return await this.login(newUser);
    }

    hashPassword(password: string): Promise<string> {
      return bcrypt.hash(password, 12);
    }

    comparePasswords(newPassword: string, passwordHash: string): Promise<boolean> {
      return bcrypt.compare(newPassword, passwordHash);
    }

    getUserFromToken(@Req() req) {
        const token = req.headers.authorization.replace("Bearer ","");
        const decodedToken = this.jwtService.decode(token);
        return decodedToken["email"];
    }
}