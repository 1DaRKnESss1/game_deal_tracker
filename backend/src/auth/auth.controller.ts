import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return await this.authService.register(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        return await this.authService.login(dto);
    }

    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@Request() req) {
      return req.user;
    }
}
