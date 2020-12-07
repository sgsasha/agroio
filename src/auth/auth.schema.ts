import { ApiProperty } from "@nestjs/swagger";

export abstract class AuthResponseDto {
    @ApiProperty()
    accessToken: string;
}