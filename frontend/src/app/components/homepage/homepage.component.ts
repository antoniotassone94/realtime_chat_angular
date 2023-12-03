import {Component,OnInit} from "@angular/core";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrl: "./homepage.component.css"
})

export class HomepageComponent implements OnInit{
  private _loginView:boolean;

  constructor(){
    this._loginView = true;
  }

  public get loginView():boolean{
    return this._loginView;
  }

  public ngOnInit():void{}

  public switchLoginRegister():void{
    this._loginView = !this._loginView;
  }
}
