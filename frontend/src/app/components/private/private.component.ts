import {Component,OnInit, inject} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {HttpRequestService} from "../../services/httprequest.service";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: "app-private",
  templateUrl: "./private.component.html",
  styleUrl: "./private.component.css"
})

export class PrivateComponent implements OnInit{
  private _message:string;
  private _token:string;
  private httprequest:HttpRequestService;
  private authservice:AuthService;

  constructor(){
    this._message = "";
    this._token = <string>localStorage.getItem("token");
    this.httprequest = inject(HttpRequestService);
    this.authservice = inject(AuthService);
  }

  public get message():string{
    return this._message;
  }

  public get token():string{
    return this._token;
  }

  public ngOnInit():void{}

  public doLogout():void{
    this.authservice.logout();
  }

  public sendMessage(form:NgForm):void{
    if(form.valid){
      this.httprequest.httpPostRequest(environment.serverUrl + "message/send",form.value).subscribe({
        next: (response:any) => {
          console.log(response);
        },
        error: (error:HttpErrorResponse) => {
          if(error.status === 401 || error.status === 403){
            this.authservice.logout();
          }else{
            const errorMessage:string = error.statusText + " (" + error.status + ")";
            this._message = errorMessage;
          }
        }
      });
    }
  }
}
