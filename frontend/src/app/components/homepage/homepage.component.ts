import {Component,OnInit, inject} from "@angular/core";
import {SwitchLoginRegisterFormService} from "../../services/switchloginregisterform.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrl: "./homepage.component.css"
})

export class HomepageComponent implements OnInit{
  private _loginView:boolean;
  private actualview:SwitchLoginRegisterFormService;

  constructor(){
    this.actualview = inject(SwitchLoginRegisterFormService);
    this._loginView = this.actualview.getLoginView();
  }

  public get loginView():boolean{
    this._loginView = this.actualview.getLoginView();
    return this._loginView;
  }

  public ngOnInit():void{}
}
