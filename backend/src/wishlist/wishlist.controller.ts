import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { WishlistService } from './wishlist.service';
import { addToWishlistDto } from './dto/add-to-wishlist.dto';

@UseGuards(JwtGuard)
@Controller('wishlist')
export class WishlistController {
    constructor(private readonly wishlist: WishlistService) {}

    @Post()
    async addGame(
        @Request() req,
        @Body() dto: addToWishlistDto
    ){
        return await this.wishlist.addGame(req.user.id, dto)
    }

    @Get()
    async getAll(@Request() req){
        return await this.wishlist.getAll(req.user.id)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.wishlist.remove(id)
    }

}
