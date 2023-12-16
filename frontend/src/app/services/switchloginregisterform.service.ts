import {Injectable} from "@angular/core";

@Injectable({
  providedIn:"root"
})

export class SwitchLoginRegisterFormService{
  private loginView:boolean;

  constructor(){
    this.loginView = true;
  }

  public getLoginView():boolean{
    return this.loginView;
  }

  public setLoginView(loginView:boolean):void{
    this.loginView = loginView;
  }
}
