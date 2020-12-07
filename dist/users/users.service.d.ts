import { UserDto } from "./user.schema";
import { Model } from "mongoose";
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<any>);
    private readonly users;
    findOne(email: string): Promise<UserDto>;
    create(userDto: UserDto): Promise<void>;
}
