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
  private nextclientsmessagereceived:BehaviorSubject<string>;
  private observableclientsreceived:Observable<string>;
  private nextclientsmessagesended:BehaviorSubject<string>;
  private observableclientssended:Observable<string>;

  constructor(){
    this.nextsystemmessage = new BehaviorSubject<string>("");
    this.observablesystem = this.nextsystemmessage.asObservable();
    this.nextexceptionmessage = new BehaviorSubject<string>("");
    this.observableexception = this.nextexceptionmessage.asObservable();
    this.nextclientsmessagereceived = new BehaviorSubject<string>("");
    this.observableclientsreceived = this.nextclientsmessagereceived.asObservable();
    this.nextclientsmessagesended = new BehaviorSubject<string>("");
    this.observableclientssended = this.nextclientsmessagesended.asObservable();
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

  public getNextClientsMessageReceived():Observable<string>{
    return this.observableclientsreceived;
  }

  public setNextClientsMessageReceived(message:string):void{
    this.nextclientsmessagereceived.next(message);
  }

  public getNextClientsMessageSended():Observable<string>{
    return this.observableclientssended;
  }

  public setNextClientsMessageSended(message:string):void{
    this.nextclientsmessagesended.next(message);
  }
}
