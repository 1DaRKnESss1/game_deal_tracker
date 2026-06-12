import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService
    ) {}

    async register(dto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10)
        try{
            const user = await this.prisma.user.create({data: {
            username: dto.username,
            email: dto.email,
            password: hashedPassword
        }})
        
        const {password, ...userWithoutPassword} = user 
        
        return userWithoutPassword;

        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException('Email or username already exists')
            }
            throw error
        }
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email } 
        })

        if (!user) 
            throw new UnauthorizedException('Cannot find user with this email.')
        
        const isValidPass = await bcrypt.compare(dto.password, user.password)
        if (!isValidPass)
            throw new UnauthorizedException('Incorrect password')

        const accessToken = await this.jwt.signAsync({ 
            sub: user.id, 
            email: user.email 
        })

        const refreshToken = await this.jwt.signAsync(
            {
                sub: user.id, 
                email: user.email 
            },
            {
                expiresIn: '7d', 
                secret: process.env.JWT_REFRESH_TOKEN
            })


        return { accessToken: accessToken, refreshToken }

    }
}
