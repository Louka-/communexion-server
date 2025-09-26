import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { RegistrationReqModel } from 'src/dtos/registration.req.model';
import { RegistrationRespModel } from 'src/dtos/registration.resp.model';
import * as randomToken from 'rand-token';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  find(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  findOne(login: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { login } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  private async registrationValidation(
    regModel: RegistrationReqModel,
  ): Promise<string> {
    if (!regModel.login) {
      return "Le login ne peut pas être vide.";
    }

    const existingUser = await this.usersRepository.findOne({
      where: { login: regModel.login },
    });
    console.log('Utilisateur existant:', regModel.login);
    console.log('Utilisateur retour:', existingUser);

    if (existingUser) {
      return "Ce login est déjà utilisé.";
    }

    if (regModel.password !== regModel.confirmPassword) {
      return 'Le mot de passe de confirmation ne correspond pas.';
    }

    return '';
  }

  private async getPasswordHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async registerUser(
    regModel: RegistrationReqModel,
  ): Promise<RegistrationRespModel> {
    const result = new RegistrationRespModel();

    const errorMessage = await this.registrationValidation(regModel);
    if (errorMessage) {
      result.message = errorMessage;
      result.successStatus = false;
      return result;
    }

    const newUser = this.usersRepository.create({
      login: regModel.login,
      password: await this.getPasswordHash(regModel.password),
    });

    const createdUser = await this.usersRepository.save(newUser);

    result.user = createdUser;
    result.successStatus = true;
    result.message = 'Bienvenue !';

    return result;
  }

  async validateUserCredentials(
    login: string,
    password: string,
  ): Promise<User | null> {
    console.log('📌 validateUserCredentials() appelée');
    const user = await this.usersRepository.findOne({
      where: { login },
    });

    if (!user) return null;

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return null;

    return user;
  }

  async getJwtToken(user: User): Promise<string> {
    const payload = { sub: user.id, login: user.login };
    return this.jwtService.signAsync(payload);
  }

  async getRefreshToken(userId: string): Promise<string> {
    return randomToken.generate(16);
  }

  async validRefreshToken(userId: string, token: string): Promise<boolean> {
    return true;
  }
}
