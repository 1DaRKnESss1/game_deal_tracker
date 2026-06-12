import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './guards/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ 
        summary: 'Register new user to app'
    })
    @ApiResponse({ status: 201, description: 'User successfully created' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    @ApiResponse({ status: 409, description: 'Email already exists' })
    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return await this.authService.register(dto);
    }
    
    @ApiOperation({ 
        summary: 'Login user, user gets access and referesh tokens'
    })
    @ApiResponse({ status: 200, description: 'Returns access and refresh tokens' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    @Post('login')
    async login(@Body() dto: LoginDto) {
        return await this.authService.login(dto);
    }

    @ApiOperation({ 
        summary: 'Get self user check'
    })
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@Request() req) {
      return req.user;
    }
}
