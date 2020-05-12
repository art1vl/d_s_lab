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

  findByPlayerId(playerId: string): Observable<rosterModel> {
    return this.http.get<rosterModel>('/api/roster/' + playerId);
  }

  deleteRecord(playerId: string): Observable<void> {
    return this.http.delete<void>('/api/roster/' + playerId);
  }

  editRecord(roster: rosterModel): Observable<rosterModel> {
    return this.http.put<rosterModel>('/api/roster/edit', roster);
  }
}
