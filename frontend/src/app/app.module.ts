import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {SocketIoModule,SocketIoConfig} from "ngx-socket-io";

import {AuthService} from "./services/auth.service";
import {HttpRequestService} from "./services/httprequest.service";
import {MessagesManagerService} from "./services/messagesmanager.service";
import {PrintMessageService} from "./services/printmessage.service";
import {SwitchLoginRegisterFormService} from "./services/switchloginregisterform.service";

import {MainComponent} from "./components/main/main.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {PrivateComponent} from "./components/private/private.component";

import {environment} from "../environments/environment";

const config:SocketIoConfig = {
  url: environment.websocketUrl,
  options: {}
}

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
    CommonModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    HttpRequestService,
    MessagesManagerService,
    PrintMessageService,
    SwitchLoginRegisterFormService
  ],
  bootstrap: [MainComponent]
})

export class AppModule{}
