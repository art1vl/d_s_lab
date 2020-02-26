import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { ModalModule } from "ngx-bootstrap/modal";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {Ng4LoadingSpinnerModule} from "ng4-loading-spinner";
import {RouterModule, Routes} from "@angular/router";
import {StartPageModule} from "./modules/pages/start-page/start-page.module";
import {StartPageComponent} from "./modules/pages/start-page/components/start-page.component";
import {RosterServiceImpl} from "./services/impl/roster.service.impl";
import {RosterTablePageComponent} from "./modules/pages/roster-table-page/components/roster-table-page.component";
import {RosterTablePageModule} from "./modules/pages/roster-table-page/roster-table-page.module";

const appRoutes: Routes = [
  {path: "", component: StartPageComponent},
  {path: "table", component: RosterTablePageComponent}
  // {path: "**", component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StartPageModule,
    RosterTablePageModule,
    Ng4LoadingSpinnerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    RosterServiceImpl
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
