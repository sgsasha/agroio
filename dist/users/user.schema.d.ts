import { Document } from 'mongoose';
export declare type UserDocument = UserDto & Document;
export declare class UserDto {
    id?: number;
    email: string;
    password: string;
}
export declare const UserSchema: import("mongoose").Schema<any>;
