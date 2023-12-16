import {Injectable,inject} from "@angular/core";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpRequestService} from "./httprequest.service";
import {PrintMessageService} from "./printmessage.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn:"root"
})

export class AuthService{
  private httprequest:HttpRequestService;
  private printmessage:PrintMessageService;

  constructor(private router:Router){
    this.httprequest = inject(HttpRequestService);
    this.printmessage = inject(PrintMessageService);
  }

  public loginRequest(body:object):Observable<any>{
    return this.httprequest.httpPostRequest(environment.serverUrl + "auth/login",body);
  }

  public registerRequest(body:object):Observable<any>{
    return this.httprequest.httpPostRequest(environment.serverUrl + "auth/register",body);
  }

  public isLogged():boolean{
    return localStorage.getItem("token") != null;
  }

  public setLogged(result:any):boolean{
    localStorage.setItem("token",result.token);
    return true;
  }

  public logout():void{
    localStorage.removeItem("token");
    this.printmessage.setNextClientsMessage("");
    this.printmessage.setNextExceptionMessage("");
    this.printmessage.setNextSystemMessage("");
    this.router.navigate([""]);
  }
}
