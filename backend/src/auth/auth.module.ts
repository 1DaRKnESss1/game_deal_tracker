import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrat } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JWTStrat],
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '15m' }
  })]
})
export class AuthModule {}
