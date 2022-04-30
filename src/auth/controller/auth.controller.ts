import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() loginDTO: LoginDto): Promise<{ access_token: string }> {
    const { name, pass } = loginDTO;
    const valid = await this.authService.validateUser(name, pass);
    if (!valid) {
      throw new UnauthorizedException();
    }
    return await this.authService.generateAccessToken(name);
  }
}
