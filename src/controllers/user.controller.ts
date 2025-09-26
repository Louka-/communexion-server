import {
  Body, Controller, Get, Param, Req,
  Res, Post, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { RegistrationReqModel } from 'src/dtos/registration.req.model';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  getUsers() {
    return this.userService.findAll();
  }

  @Get('one/:id')
  getUser(@Param('id') id: string) {
    return this.userService.find(id);
  }

  @Post('register')
  register(@Body() userData: RegistrationReqModel) {
    return this.userService.registerUser(userData);
  }

  @Post('delete/:id')
  delete(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.userService.getJwtToken(req.user);
    const refreshToken = await this.userService.getRefreshToken(req.user.id);

    res.cookie('auth-cookie', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    return {
      success: true,
      user: req.user,
      token,
      refreshToken,
    };
  }

  @Get('refresh-token')
  @UseGuards(AuthGuard('refresh'))
  async regenerateTokens(@Req() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.userService.getJwtToken(req.user);
    const refreshToken = await this.userService.getRefreshToken(req.user.id);

    res.cookie('auth-cookie', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    return {
      success: true,
      token,
      refreshToken,
    };
  }

}
