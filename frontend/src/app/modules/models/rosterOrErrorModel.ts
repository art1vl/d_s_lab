import {rosterModel} from "./rosterModel";

export class rosterOrErrorModel {
  rosterModel: rosterModel;
  errors: Map<string, string>;
  id: string;
  conditions: string;
}
