import {rosterModel} from "../modules/models/rosterModel";
import {Observable} from "rxjs";
import {rosterOrErrorModel} from "../modules/models/rosterOrErrorModel";

export interface RosterService {
  saveRoster(roster: rosterModel): Observable<rosterOrErrorModel>;

  findAll(): Observable<rosterModel[]>;
}
