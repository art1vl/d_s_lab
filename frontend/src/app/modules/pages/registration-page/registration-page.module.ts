import { NgModule } from "@angular/core";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RegistrationPageComponent} from "./components/registration-page.component";


@NgModule({
  declarations: [
    RegistrationPageComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [],
  exports: [RegistrationPageComponent]
})
export class RegistrationPageModule {}
