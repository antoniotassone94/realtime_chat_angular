import {Injectable} from "@angular/core";
import {Observable,BehaviorSubject} from "rxjs";

@Injectable({
  providedIn:"root"
})

export class PrintMessageService{
  private nextsystemmessage:BehaviorSubject<string>;
  private observablesystem:Observable<string>;
  private nextexceptionmessage:BehaviorSubject<string>;
  private observableexception:Observable<string>;
  private nextclientsmessage:BehaviorSubject<string>;
  private observableclients:Observable<string>;

  constructor(){
    this.nextsystemmessage = new BehaviorSubject<string>("");
    this.observablesystem = this.nextsystemmessage.asObservable();
    this.nextexceptionmessage = new BehaviorSubject<string>("");
    this.observableexception = this.nextexceptionmessage.asObservable();
    this.nextclientsmessage = new BehaviorSubject<string>("");
    this.observableclients = this.nextclientsmessage.asObservable();
  }

  public getNextSystemMessage():Observable<string>{
    return this.observablesystem;
  }

  public setNextSystemMessage(message:string):void{
    this.nextsystemmessage.next(message);
  }

  public getNextExceptionMessage():Observable<string>{
    return this.observableexception;
  }

  public setNextExceptionMessage(message:string):void{
    this.nextexceptionmessage.next(message);
  }

  public getNextClientsMessage():Observable<string>{
    return this.observableclients;
  }

  public setNextClientsMessage(message:string):void{
    this.nextclientsmessage.next(message);
  }
}
