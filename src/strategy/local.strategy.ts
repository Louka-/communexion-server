import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private userService: UserService) {
    super({ usernameField: 'login' });
  }

  async validate(login: string, password: string): Promise<User> {
    console.log('Tentative de login :', login, password);
    let user = await this.userService.validateUserCredentials(login, password);

    if (user == null) {
      throw new UnauthorizedException();
    }

    return user;
  }
}