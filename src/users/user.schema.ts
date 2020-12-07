import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";

export type UserDocument = UserDto & Document;

@Schema()
export class UserDto {
    @Prop()
    id?: number;

    @ApiProperty()
    @Prop()
    email: string;

    @ApiProperty()
    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDto);