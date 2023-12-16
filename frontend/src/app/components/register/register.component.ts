import {Component,OnInit,inject} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {SwitchLoginRegisterFormService} from "../../services/switchloginregisterform.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css"
})

export class RegisterComponent implements OnInit{
  private _message:string;
  private authService:AuthService;
  private actualview:SwitchLoginRegisterFormService;

  constructor(private router:Router){
    this._message = "";
    this.authService = inject(AuthService);
    this.actualview = inject(SwitchLoginRegisterFormService);
  }

  public get message():string{
    return this._message;
  }

  public ngOnInit():void{}

  public doRegister(form:NgForm):void{
    if(form.valid){
      this.authService.registerRequest(form.value).subscribe({
        next:(response:any) => {
          this._message = response.message;
        },
        error:(error:HttpErrorResponse) => {
          this._message = error.statusText + " (" + error.status + "): User registration error.";
        }
      });
    }
  }

  public gotoLogin():void{
    this.actualview.setLoginView(true);
  }
}
