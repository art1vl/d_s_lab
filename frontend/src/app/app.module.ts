import { BrowserModule } from "@angular/platform-browser";
import {APP_INITIALIZER, NgModule} from "@angular/core";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { ModalModule } from "ngx-bootstrap/modal";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {Ng4LoadingSpinnerModule} from "ng4-loading-spinner";
import {RouterModule, Routes} from "@angular/router";
import {StartPageModule} from "./modules/pages/start-page/start-page.module";
import {StartPageComponent} from "./modules/pages/start-page/components/start-page.component";
import {RosterServiceImpl} from "./services/impl/roster.service.impl";
import {RosterTablePageComponent} from "./modules/pages/roster-table-page/components/roster-table-page.component";
import {RosterTablePageModule} from "./modules/pages/roster-table-page/roster-table-page.module";
import {SignInPageModule} from "./modules/pages/sign-in-page/sign-in-page.module";
import {RegistrationPageModule} from "./modules/pages/registration-page/registration-page.module";
import {RegistrationPageComponent} from "./modules/pages/registration-page/components/registration-page.component";
import {SignInPageComponent} from "./modules/pages/sign-in-page/components/sign-in-page.component";
import {UserServiceImpl} from "./services/impl/user.service.impl";
import {SignInServiceImpl} from "./services/impl/sign-in.service.impl";
// @ts-ignore
import {CookieService} from "ngx-cookie-service";
import {AuthInterceptor} from "./services/AuthInterceptor";
import {initApp} from "./services/app.initialiser";
import {UserPageModule} from "./modules/pages/user-page/user-page.module";
import {UserComponent} from "./modules/pages/user-page/components/user-page.component";
import {OauthDummyPageModule} from "./modules/pages/oauth-dummy-page/oauth-dummy-page.module";
import {OauthDummyPageComponent} from "./modules/pages/oauth-dummy-page/components/oauth-dummy-page.component";

const appRoutes: Routes = [
  {path: "", component: StartPageComponent},
  {path: "table", component: RosterTablePageComponent},
  {path: "registration", component: RegistrationPageComponent},
  {path: "sign/in", component: SignInPageComponent},
  {path: "user", component: UserComponent},
  {path: "oauth", component: OauthDummyPageComponent}
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
    SignInPageModule,
    UserPageModule,
    RegistrationPageModule,
    OauthDummyPageModule,
    Ng4LoadingSpinnerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    RosterServiceImpl,
    UserServiceImpl,
    SignInServiceImpl,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: []
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [HttpClient,
            UserServiceImpl,
            CookieService
      ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
