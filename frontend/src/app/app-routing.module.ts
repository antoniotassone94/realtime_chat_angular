import {NgModule} from "@angular/core";
import {RouterModule,Routes} from "@angular/router";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {PrivateComponent} from "./components/private/private.component";
import {authGuard} from "./services/auth.guard";

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomepageComponent},
  {path:"private",component:PrivateComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
