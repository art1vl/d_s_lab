import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {SignInServiceImpl} from "../../../../services/impl/sign-in.service.impl";
import {UserServiceImpl} from "../../../../services/impl/user.service.impl";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: "app-oauth",
  templateUrl: "./oauth-dummy-page.component.html"
})

export class OauthDummyPageComponent implements OnInit, OnDestroy {
  token: string;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private signInService: SignInServiceImpl,
              private userServiceImpl: UserServiceImpl,
              private cookieService: CookieService) {
  }

  ngOnInit() {
    this.token = this.router.url.substring(this.router.url.lastIndexOf("?") + 7);
    this.cookieService.put("token", this.token);
    UserServiceImpl.token = this.token;
    this.subscriptions.push(this.signInService.findUserByToken(this.token).subscribe(userModel => {
      this.userServiceImpl.user = userModel;
      this.router.navigate(["/"]);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
