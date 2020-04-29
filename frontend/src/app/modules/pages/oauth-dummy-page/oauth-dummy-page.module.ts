import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OauthDummyPageComponent} from "./components/oauth-dummy-page.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    OauthDummyPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [],
  exports: [OauthDummyPageComponent]
})
export class OauthDummyPageModule {}
