import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { JWTImpl } from './jwt.guard.logic';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }), // Not sure what this line means or wants to do
    JwtModule.register({ secret: "secret" }),
    TypeOrmModule.forFeature([AuthRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTImpl], // Why JwtModule added as a provider: to be used in notes module? Somehowit was working good earlier
  exports: [
    JWTImpl,
    PassportModule
  ]
})
export class AuthModule { }
