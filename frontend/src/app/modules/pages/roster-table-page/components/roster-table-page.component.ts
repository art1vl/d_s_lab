import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subject, Subscription} from "rxjs";
import {RosterServiceImpl} from "../../../../services/impl/roster.service.impl";
import {rosterModel} from "../../../models/rosterModel";
import {UserServiceImpl} from "../../../../services/impl/user.service.impl";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: "app-roster-table",
  templateUrl: "./roster-table-page.component.html",
  styleUrls: ["./roster-table-page.component.css"]
})

export class RosterTablePageComponent implements OnInit, OnDestroy {
  rosters: rosterModel[];
  role: string;

  private subscriptions: Subscription[] = [];

  constructor(private rosterService: RosterServiceImpl,
              private userServiceImpl: UserServiceImpl,
              private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit() {
    if (!this.userServiceImpl.isUserLoggedIn()) {
      this.router.navigate(["/sign/in"]);
    }
    this.role = this.userServiceImpl.user.role;
    this.loadAllRoster();
  }

  loadAllRoster() {
    this.subscriptions.push(this.rosterService.findAll().subscribe(list => {
      this.rosters = list as rosterModel[];
    }));
  }

  edit(playedId: string): void {
    this.router.navigate(["/edit/" + playedId]);
  }

  add(): void {
    this.router.navigate(["/new/record"]);
  }

  delete(playerId: string): void {
    this.subscriptions.push(this.rosterService.deleteRecord(playerId).subscribe(() => {
      this.loadAllRoster();
    }));
  }

  isSignIn(): boolean {
    return this.userServiceImpl.user != null;
  }

  logOut(): void {
    this.cookieService.deleteAll();
    UserServiceImpl.token = "";
    this.userServiceImpl.user = null;
    this.router.navigate(["/sign/in"]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
