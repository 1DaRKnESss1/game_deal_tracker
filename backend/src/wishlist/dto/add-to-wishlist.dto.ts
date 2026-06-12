import { IsNumber, IsString, IsUrl } from "class-validator";

export class addToWishlistDto{
    @IsString()
    gameId!: string;

    @IsString()
    title!: string;

    @IsNumber()
    price!: number;

    @IsUrl()
    thumb!: string;
}