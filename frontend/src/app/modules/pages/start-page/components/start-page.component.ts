import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, Subscription} from "rxjs";
import {RosterServiceImpl} from "../../../../services/impl/roster.service.impl";
import {rosterModel} from "../../../models/rosterModel";

@Component({
  selector: "app-start-page",
  templateUrl: "./start-page.component.html",
  styleUrls: ["./start-page.component.css"]
})

export class StartPageComponent implements OnInit, OnDestroy {
  roster: rosterModel;
  myForm: FormGroup;
  errors: Map<string, string> = new Map<string, string>();
  minDate: Date;
  maxDate: Date;
  idError: string;
  conditionsError: string;

  private newRosterFlag = new Subject<boolean>();
  public newRosterFlag$ = this.newRosterFlag.asObservable();
  private rosterIdFreeFlag = new Subject<boolean>();
  public rosterIdFreeFlag$ = this.rosterIdFreeFlag.asObservable();
  private rosterSatisfiesConditionsFlag = new Subject<boolean>();
  public rosterSatisfiesConditionsFlag$ = this.rosterSatisfiesConditionsFlag.asObservable();

  private subscriptions: Subscription[] = [];

  constructor(private rosterService: RosterServiceImpl) {
  }

  ngOnInit() {
    this.newRosterFlag.next(false);
    this.rosterIdFreeFlag.next(false);
    this.rosterSatisfiesConditionsFlag.next(false);
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
    },);
  }

  submit(playerid: string, jersey: number, name: string, surname: string,
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
    this.subscriptions.push(this.rosterService.saveRoster(this.roster).subscribe(addedRoster => {
      this.rosterIdFreeFlag.next(false);
      this.rosterSatisfiesConditionsFlag.next(false);
      if (addedRoster.errors == null && addedRoster.conditions == undefined
            && addedRoster.id == undefined) {
        this.errors = new Map<string, string>();
        this.newRosterFlag.next(true);
      } else {
        this.errors = addedRoster.errors;
        this.conditionsError = addedRoster.conditions;
        this.idError = addedRoster.id;
        if (this.idError != undefined) {
          this.rosterIdFreeFlag.next(true);
        }
        if (this.conditionsError != undefined) {
          this.rosterSatisfiesConditionsFlag.next(true);
        }
      }
    }));
  }

  changeNewRosterFlag() {
    this.myForm.reset();
    this.newRosterFlag.next(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
