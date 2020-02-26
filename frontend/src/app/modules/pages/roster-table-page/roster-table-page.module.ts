import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RosterTablePageComponent} from "./components/roster-table-page.component";


@NgModule({
  declarations: [
    RosterTablePageComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [],
  exports: [RosterTablePageComponent]
})
export class RosterTablePageModule {}
