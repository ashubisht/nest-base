import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Credentials } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post("/signup")
  signUp(@Body(ValidationPipe) credential: Credentials) {
    return this.authService.signUp(credential);
  }

  @Post("signin")
  signIn(@Body(ValidationPipe) credential: Credentials) {
    return this.authService.signIn(credential);
  }

}
