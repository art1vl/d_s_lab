import {Observable} from "rxjs";
import {SignInModel} from "../modules/models/signInModel";
import {UserModel} from "../modules/models/userModel";

export interface SignInService {
  signIn(user: UserModel): Observable<SignInModel>;
}
