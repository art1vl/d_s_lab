import { NgModule } from "@angular/core";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SignInPageComponent} from "./components/sign-in-page.component";
import {CookieService} from "angular2-cookie/core";

@NgModule({
  declarations: [
    SignInPageComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [CookieService],
  exports: [SignInPageComponent]
})
export class SignInPageModule {}
