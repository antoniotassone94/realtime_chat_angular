import {Injectable,inject} from "@angular/core";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpRequestService} from "./httprequest.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn:"root"
})

export class AuthService{
  private httprequest:HttpRequestService;

  constructor(private router:Router){
    this.httprequest = inject(HttpRequestService);
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
    this.router.navigate([""]);
  }
}
