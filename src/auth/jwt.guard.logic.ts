import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AuthRepository } from "./auth.repository";
import { InjectRepository } from "@nestjs/typeorm";
import * as config from "config";
import { UnauthorizedException, Injectable } from "@nestjs/common";

@Injectable()
export class JWTImpl extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret" // config.get("jwt-secret")
    })
  }

  async validate(token: { username: string }) {
    console.log("Inside validator: ", token.username);
    const user = await this.authRepository.findOne({ username: token.username });
    if (!user) {
      throw new UnauthorizedException();
    }
    // console.log("Decorator findings: ", user);
    return user;

  }

}