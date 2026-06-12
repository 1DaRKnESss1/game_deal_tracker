import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { WishlistService } from './wishlist.service';
import { addToWishlistDto } from './dto/add-to-wishlist.dto';
import { ApiBearerAuth, ApiDefaultGetter, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('wishlist')
@UseGuards(JwtGuard)
@Controller('wishlist')
export class WishlistController {
    constructor(private readonly wishlist: WishlistService) {}

    @ApiOperation({ 
        summary: "Add a game to user wishlist"
    })
    @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'Game added to wishlist' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Post()
    async addGame(
        @Request() req,
        @Body() dto: addToWishlistDto
    ){
        return await this.wishlist.addGame(req.user.id, dto)
    }

    @ApiOperation({ 
        summary: "Get all games from user wishlist"
    })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'List of games in wishlist' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Get()
    async getAll(@Request() req){
        return await this.wishlist.getAll(req.user.id)
    }

    @ApiOperation({ 
        summary: "Delete game from user wishlist"
    })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Deleted successfully' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    @ApiResponse({ status: 404, description: 'Cannot find game to delete' })
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.wishlist.remove(id)
    }

}
