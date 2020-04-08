import { NgModule } from "@angular/core";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CookieService} from "angular2-cookie/core";
import {UserComponent} from "./components/user-page.component";

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [CookieService],
  exports: [UserComponent]
})
export class UserPageModule {}
