import {Injectable} from "@angular/core";
import {UserModel} from "../../modules/models/userModel";
import {UserService} from "../user.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class UserServiceImpl implements UserService {
  static token: String = "";
  user: UserModel;

  constructor(private http: HttpClient) {
  }

  register(user: UserModel): Observable<void> {
    return this.http.post<void>("/api/user/register", user);
  }

  getUserInfo(email: String): Observable<UserModel> {
    return this.http.get<UserModel>("/api/user/info/" + email);
  }
}
