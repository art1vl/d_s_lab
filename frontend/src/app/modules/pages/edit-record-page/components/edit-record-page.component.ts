import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, Subscription} from "rxjs";
import {RosterServiceImpl} from "../../../../services/impl/roster.service.impl";
import {rosterModel} from "../../../models/rosterModel";
// @ts-ignore
import {CookieService} from "ngx-cookie-service";
import {UserServiceImpl} from "../../../../services/impl/user.service.impl";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: "app-edit-record-page",
  templateUrl: "./edit-record-page.component.html",
  styleUrls: ["./edit-record-page.component.css"]
})

export class EditRecordPageComponent implements OnInit, OnDestroy {
  roster: rosterModel;
  playerId: string;
  myForm: FormGroup;
  errors: Map<string, string> = new Map<string, string>();
  minDate: Date;
  maxDate: Date;

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
    this.playerId = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 18250);
    this.maxDate.setDate(this.maxDate.getDate() - 1826);
    this.myForm = new FormGroup({
      "playerid": new FormControl("", [
      Validators.required,
      Validators.pattern('^[a-z]{1,255}')
    ]),
      "jersey": new FormControl("", [
      Validators.required,
      Validators.pattern('^[1-9]{1}|[1-9][0-9]+$')
    ]),
      "userName": new FormControl("", [
      Validators.required,
      Validators.pattern('^[A-Z]{1}[a-z]+$')
    ]),
      "userSurname": new FormControl("", [
      Validators.required,
      Validators.pattern('^[A-Z]{1}[a-z]+$')
    ]),
      "position": new FormControl("", [
      Validators.required,
      Validators.pattern('^[A-Z]{1,2}$')
    ]),
      "date": new FormControl("", [
      Validators.required,
    ]),
      "weight": new FormControl("", [
      Validators.required,
      Validators.pattern('^([2-9][0-9])$|^([1-3][0-9][0-9])$')
    ]),
      "height": new FormControl("", [
      Validators.required,
      Validators.pattern('^[12][0-9]{2}$')
    ]),
      "birthcity": new FormControl("", [
      Validators.required,
      Validators.pattern('^[A-Z]{1}[a-z]{1,49}$')
    ]),
      "birthstate": new FormControl("", [
      Validators.required,
      Validators.pattern('^[A-Z]{2}$')
    ]),
    });
    this.subscriptions.push(this.rosterService.findByPlayerId(this.playerId).subscribe(roster => {
      this.roster = roster;
      console.log(roster);
      this.myForm = new FormGroup({
        "playerid": new FormControl(roster.playerid, [
          Validators.required,
          Validators.pattern('^[a-z]{1,255}')
        ]),
        "jersey": new FormControl(roster.jersey, [
          Validators.required,
          Validators.pattern('^[1-9]{1}|[1-9][0-9]+$')
        ]),
        "userName": new FormControl(roster.fname, [
          Validators.required,
          Validators.pattern('^[A-Z]{1}[a-z]+$')
        ]),
        "userSurname": new FormControl(roster.sname, [
          Validators.required,
          Validators.pattern('^[A-Z]{1}[a-z]+$')
        ]),
        "position": new FormControl(roster.position, [
          Validators.required,
          Validators.pattern('^[A-Z]{1,2}$')
        ]),
        "date": new FormControl("", [
          Validators.required,
        ]),
        "weight": new FormControl(roster.weight, [
          Validators.required,
          Validators.pattern('^([2-9][0-9])$|^([1-3][0-9][0-9])$')
        ]),
        "height": new FormControl(roster.height, [
          Validators.required,
          Validators.pattern('^[12][0-9]{2}$')
        ]),
        "birthcity": new FormControl(roster.birthcity, [
          Validators.required,
          Validators.pattern('^[A-Z]{1}[a-z]{1,49}$')
        ]),
        "birthstate": new FormControl(roster.birthstate, [
          Validators.required,
          Validators.pattern('^[A-Z]{2}$')
        ]),
      });
    }));
  }

  edit(playerid: string, jersey: number, name: string, surname: string,
       position: string, date: string, weight: number, height: number,
       birthcity: string, birthstate: string): void {
    this.roster = new rosterModel();
    this.roster.playerid = playerid;
    this.roster.jersey = jersey;
    this.roster.fname = name;
    this.roster.sname = surname;
    this.roster.position = position;
    this.roster.birthday = new Date(date);
    this.roster.weight = weight;
    this.roster.height = height;
    this.roster.birthcity = birthcity;
    this.roster.birthstate = birthstate;
    this.subscriptions.push(this.rosterService.editRecord(this.roster).subscribe(roster => {
     this.router.navigate(["/table"]);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
