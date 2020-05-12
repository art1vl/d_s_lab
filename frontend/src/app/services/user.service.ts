import {UserModel} from "../modules/models/userModel";
import {Observable} from "rxjs";

export interface UserService {
  register(user: UserModel): Observable<void>;

  getUserInfo(email: String): Observable<UserModel>;

  isUserLoggedIn(): boolean;
}
