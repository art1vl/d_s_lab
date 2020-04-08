import {HttpClient} from "@angular/common/http";
import {UserServiceImpl} from "./impl/user.service.impl";
// @ts-ignore
import {CookieService} from "ngx-cookie-service";
import {UserModel} from "../modules/models/userModel";

export function initApp(http: HttpClient,
                        userServiceImpl: UserServiceImpl,
                        cookieService: CookieService) {
  return () => {
    if (cookieService.get("token") != null) {
      return http.get<UserModel>("/api/sign/in/" + cookieService.get("token"))
        .toPromise()
        .then((resp) => {
          userServiceImpl.user = resp;
        }, errorResponse => {
          if (errorResponse.status === "500") {
            console.log("lol");
            console.log(errorResponse);
            localStorage.removeItem("token");
          } else {
            console.log("12333", errorResponse);
          }
        });
    }
  };
}


