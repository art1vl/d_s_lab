import {UserModel} from "./userModel";

export class SignInModel {
  user: UserModel;
  errors: string;
  token: string;
}
