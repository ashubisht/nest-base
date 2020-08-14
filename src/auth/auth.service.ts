import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from "@nestjs/jwt";
import { Credentials } from './dto/credentials.dto';
import * as bcrypt from "bcrypt";
import { User } from './entity/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(AuthRepository) private authRepository: AuthRepository,
    private jwtService: JwtService
  ) { }

  // Credential is already an exusting datatype with property id and type. Thus credentials (extra s)
  async signUp(credential: Credentials) {
    const user = new User();
    user.username = credential.username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(credential.password, user.salt);
    return await this.authRepository.signUp(user);
  }

  async signIn(credential: Credentials) {
    const user = await this.authRepository.findOne({ username: credential.username });

    if (!user || !this.validatePassword(credential.password, user.password, user.salt)) {
      throw new UnauthorizedException("Invalid credential");
    }

    const jwtBody = { username: user.username };
    const token = await this.jwtService.signAsync(jwtBody);

    return { token };
  }

  private async hashPassword(password: string, salt: string) {
    return await bcrypt.hash(password, salt);
  }

  async validatePassword(password: string, passwordHash: string, salt: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, salt);
    return hash === passwordHash;
  }

}
