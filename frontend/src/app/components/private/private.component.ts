import {Component,OnInit,inject} from "@angular/core";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {MessagesManagerService} from "../../services/messagesmanager.service";
import {PrintMessageService} from "../../services/printmessage.service";
import {HttpRequestService} from "../../services/httprequest.service";
import {MessageModel} from "../../models/message.model";
import {ExceptionModel} from "../../models/exception.model";
import {environment} from "../../../environments/environment";

@Component({
  selector: "app-private",
  templateUrl: "./private.component.html",
  styleUrl: "./private.component.css"
})

export class PrivateComponent implements OnInit{
  private _errorMessage:string;
  private _token:string;
  private _messageslist:MessageModel[];
  private authservice:AuthService;
  private messagesmanager:MessagesManagerService;
  private printmessage:PrintMessageService;
  private httprequest:HttpRequestService;

  constructor(){
    this._errorMessage = "";
    this._token = <string>localStorage.getItem("token");
    this._messageslist = [];
    this.authservice = inject(AuthService);
    this.messagesmanager = inject(MessagesManagerService);
    this.printmessage = inject(PrintMessageService);
    this.httprequest = inject(HttpRequestService);
  }

  public get errorMessage():string{
    return this._errorMessage;
  }

  public get token():string{
    return this._token;
  }

  public get messageslist():MessageModel[]{
    return this._messageslist;
  }

  public ngOnInit():void{
    this._messageslist.splice(0,this._messageslist.length);
    this.messagesmanager.receiveMessage();
    this.printmessage.getNextSystemMessage().subscribe({
      next: (textmessage:string) => {
        if(textmessage !== ""){
          if(this.authservice.isLogged() === true){
            this.httprequest.httpPostRequest(environment.serverUrl + "auth/getemail",{token:localStorage.getItem("token")}).subscribe({
              next: (response:any) => {
                const personalEmail:string = response.message;
                const jsonarray:any[] = JSON.parse(textmessage);
                for(let i = 0;i < jsonarray.length;i++){
                  if(jsonarray[i].sender === personalEmail){
                    const messagesended:MessageModel = new MessageModel(true);
                    messagesended.id = jsonarray[i]._id;
                    messagesended.sender = jsonarray[i].sender;
                    messagesended.date = new Date(jsonarray[i].date);
                    messagesended.text = jsonarray[i].text;
                    this._messageslist.push(messagesended);
                  }else{
                    const messagereceived:MessageModel = new MessageModel(false);
                    messagereceived.id = jsonarray[i]._id;
                    messagereceived.sender = jsonarray[i].sender;
                    messagereceived.date = new Date(jsonarray[i].date);
                    messagereceived.text = jsonarray[i].text;
                    this._messageslist.push(messagereceived);
                  }
                }
              },
              error: (error:HttpErrorResponse) => {
                this.authservice.logout();
              }
            });
          }
        }
      }
    });
    this.printmessage.getNextExceptionMessage().subscribe({
      next: (textmessage:string) => {
        if(textmessage !== ""){
          const exceptionReceived:any = JSON.parse(textmessage);
          const check:boolean = (exceptionReceived.check) ? true : false;
          const exception:ExceptionModel = new ExceptionModel(exceptionReceived.message,exceptionReceived.code,check);
          if(exception.code === 401 || exception.code === 403){
            this.authservice.logout();
          }else{

            //scrivere qui la gestione degli errori
            console.error(exception.message);

          }
        }
      }
    });
    this.printmessage.getNextClientsMessageReceived().subscribe({
      next: (textmessage:string) => {
        if(textmessage !== ""){
          const jsonmessage:any = JSON.parse(textmessage);
          const messagereceived:MessageModel = new MessageModel(false);
          messagereceived.id = jsonmessage._id;
          messagereceived.sender = jsonmessage.sender;
          messagereceived.date = new Date(jsonmessage.date);
          messagereceived.text = jsonmessage.text;
          this._messageslist.push(messagereceived);
        }
      }
    });
    this.printmessage.getNextClientsMessageSended().subscribe({
      next: (textmessage:string) => {
        if(textmessage !== ""){
          const jsonmessage:any = JSON.parse(textmessage);
          const messagesended:MessageModel = new MessageModel(true);
          messagesended.id = jsonmessage._id;
          messagesended.sender = jsonmessage.sender;
          messagesended.date = new Date(jsonmessage.date);
          messagesended.text = jsonmessage.text;
          this._messageslist.push(messagesended);
        }
      }
    });
    this.messagesmanager.extractMessages();
  }

  public doLogout():void{
    this.authservice.logout();
  }

  public sendMessage(form:NgForm):void{
    if(form.valid){
      const message:MessageModel = new MessageModel(true);
      message.date = new Date();
      message.sender = <string>localStorage.getItem("token");
      message.text = form.value.text;
      this.messagesmanager.sendMessage(message);
    }
  }
}
