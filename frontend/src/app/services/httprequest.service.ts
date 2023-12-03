import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn:"root"
})

export class HttpRequestService{
  constructor(private httpclient:HttpClient){}

  public httpGetRequest(url:string):Observable<any>{
    return this.httpclient.get(url);
  }

  public httpPostRequest(url:string,body:object):Observable<any>{
    return this.httpclient.post(url,body);
  }
}
