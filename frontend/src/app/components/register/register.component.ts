import {Component,OnInit,inject} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css"
})

export class RegisterComponent implements OnInit{
  private _errorMessage:string;
  private authService:AuthService;

  constructor(private router:Router){
    this._errorMessage = "";
    this.authService = inject(AuthService);
  }

  public get errorMessage():string{
    return this._errorMessage;
  }

  public ngOnInit():void{}

  public doRegister(form:NgForm):void{
    if(form.valid){
      this.authService.registerRequest(form.value).subscribe({
        next:(response:object) => {
          console.log(response)
        },
        error:(error:HttpErrorResponse) => {
          this._errorMessage = error.statusText + " (" + error.status + "): User registration error.";
        }
      });
    }
  }
}
