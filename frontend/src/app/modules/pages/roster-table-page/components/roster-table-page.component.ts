import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subject, Subscription} from "rxjs";
import {RosterServiceImpl} from "../../../../services/impl/roster.service.impl";
import {rosterModel} from "../../../models/rosterModel";

@Component({
  selector: "app-roster-table",
  templateUrl: "./roster-table-page.component.html",
  styleUrls: ["./roster-table-page.component.css"]
})

export class RosterTablePageComponent implements OnInit, OnDestroy {
  rosters: rosterModel[];

  private subscriptions: Subscription[] = [];

  constructor(private rosterService: RosterServiceImpl) {
  }

  ngOnInit() {
    this.loadAllRoster();
  }

  loadAllRoster() {
    this.subscriptions.push(this.rosterService.findAll().subscribe(list => {
      this.rosters = list as rosterModel[];
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
