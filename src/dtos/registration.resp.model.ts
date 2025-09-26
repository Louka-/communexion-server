import { User } from "src/entities/user.entity";

export class RegistrationRespModel {
  successStatus: boolean;
  message: string;
  user: User
}