import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUrl } from "class-validator";

export class addToWishlistDto{
    @ApiProperty()
    @IsString()
    gameId!: string;

    @ApiProperty()
    @IsString()
    title!: string;

    @ApiProperty()
    @IsNumber()
    price!: number;

    @ApiProperty()
    @IsUrl()
    thumb!: string;
}