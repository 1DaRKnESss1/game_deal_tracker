import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addToWishlistDto } from './dto/add-to-wishlist.dto';

@Injectable()
export class WishlistService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll(userId: string) {
        return this.prisma.wishList.findMany({
            where: { userId }
        })
    }

    async addGame(userId: string, dto: addToWishlistDto){
        return this.prisma.wishList.create({
            data: {
                userId,
                ...dto
            }
        })
    }

    async remove(id: string) {
        return this.prisma.wishList.delete({
            where: { id }
        })
    }
}
