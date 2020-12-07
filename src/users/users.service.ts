import { Injectable } from '@nestjs/common';
import {UserDto} from "./user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<any>) {}

    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
        },
    ];

    async findOne(email: string): Promise<UserDto> {
      return this.userModel.findOne({email: email}).exec();
    }

    async create(userDto: UserDto): Promise<void> {
      const createdUserModel = new this.userModel(userDto);
      return createdUserModel.save();
    }
}