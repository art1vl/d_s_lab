import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {UserServiceImpl} from "../../../../services/impl/user.service.impl";
import {UserModel} from "../../../models/userModel";

@Component({
  selector: "app-registration-page",
  templateUrl: "./registration-page.component.html",
  styleUrls: ["./registration-page.component.css"]
})

export class RegistrationPageComponent implements OnInit, OnDestroy {
  registration: FormGroup;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private userServiceImpl: UserServiceImpl) {
  }

  ngOnInit() {
    this.registration = new FormGroup({
      "email": new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      "password": new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern("^[0-9a-zA-Z]+$")
      ]),
      "repeatPassword": new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^[0-9a-zA-Z]+$'),
      ]),
    });
  }

  submit(email: string, password: string): void {
    const user: UserModel = new UserModel();
    user.email = email;
    user.password = password;
    this.subscriptions.push(this.userServiceImpl.register(user).subscribe(() => {
      this.router.navigate(["/sign/in"]);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
