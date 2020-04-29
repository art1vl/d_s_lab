import {Injectable} from "@angular/core";
import {SignInService} from "../sign-in.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignInModel} from "../../modules/models/signInModel";
import {UserModel} from "../../modules/models/userModel";

@Injectable()
export class SignInServiceImpl implements SignInService {

  constructor(private http: HttpClient) {
  }

  signIn(user: UserModel): Observable<SignInModel> {
    return this.http.post<SignInModel>("/api/sign/in", user);
  }

  findUserByToken(token: string): Observable<UserModel> {
    return this.http.get<UserModel>("/api/sign/in/" + token);
  }
}
