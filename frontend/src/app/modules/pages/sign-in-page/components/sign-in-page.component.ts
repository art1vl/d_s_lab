import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {SignInServiceImpl} from "../../../../services/impl/sign-in.service.impl";
import {UserModel} from "../../../models/userModel";
import {UserServiceImpl} from "../../../../services/impl/user.service.impl";
import {Router} from "@angular/router";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: "app-sign-in-page",
  templateUrl: "./sign-in-page.component.html",
  styleUrls: ["./sign-in-page.component.css"]
})

export class SignInPageComponent implements OnInit, OnDestroy {
  signIn: FormGroup;
  errors: string;

  private subscriptions: Subscription[] = [];

  constructor(private signInService: SignInServiceImpl,
              private userServiceImpl: UserServiceImpl,
              private router: Router,
              private cookieService: CookieService) {
  }

  ngOnInit() {
    this.signIn = new FormGroup({
      "email": new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      "password": new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern("^[0-9a-zA-Z]+$")
      ])
    });
  }

  submit(email: string, password: string): void {
    const user = new UserModel();
    user.email = email;
    user.password = password;
    this.subscriptions.push(this.signInService.signIn(user).subscribe(signInModel => {
      if (signInModel.errors == null) {
        this.errors = null;
        this.cookieService.put("token", signInModel.token);
        UserServiceImpl.token = signInModel.token;
        this.userServiceImpl.user = signInModel.user;
        this.router.navigate(["/table"]);
      } else {
        this.errors = signInModel.errors;
        this.signIn.reset();
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
