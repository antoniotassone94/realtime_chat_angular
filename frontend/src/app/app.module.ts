import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";

import {AuthService} from "./services/auth.service";
import {HttpRequestService} from "./services/httprequest.service";

import {MainComponent} from "./components/main/main.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {PrivateComponent} from "./components/private/private.component";

@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    PrivateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    HttpRequestService
  ],
  bootstrap: [MainComponent]
})

export class AppModule{}
