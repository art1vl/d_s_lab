import {Injectable} from "@angular/core";
import {RosterService} from "../roster.service";
import {rosterModel} from "../../modules/models/rosterModel";
import {Observable} from "rxjs";
import {rosterOrErrorModel} from "../../modules/models/rosterOrErrorModel";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class RosterServiceImpl implements RosterService {

  constructor(private http: HttpClient) {
  }

  saveRoster(roster: rosterModel): Observable<rosterOrErrorModel> {
    return this.http.post<rosterOrErrorModel>('/api/roster', roster);
  }

  findAll(): Observable<rosterModel[]> {
    return this.http.get<rosterModel[]>('/api/roster/all');
  }
}
