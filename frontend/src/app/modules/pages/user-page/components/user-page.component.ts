import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {UserServiceImpl} from "../../../../services/impl/user.service.impl";

@Component({
  selector: "app-user-page",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.css"]
})

export class UserComponent implements OnInit, OnDestroy {
  email: String;

  private subscriptions: Subscription[] = [];

  constructor(private userServiceImpl: UserServiceImpl) {
  }

  ngOnInit() {
    this.subscriptions.push(this.userServiceImpl.getUserInfo(this.userServiceImpl.user.email).subscribe(signInModel => {
      this.email = signInModel.email;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
