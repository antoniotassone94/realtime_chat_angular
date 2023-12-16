import {Component,OnInit,inject} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MessagesManagerService} from "../../services/messagesmanager.service";
import {PrintMessageService} from "../../services/printmessage.service";
import {MessageModel} from "../../models/message.model";
import {ExceptionModel} from "../../models/exception.model";

@Component({
  selector: "app-private",
  templateUrl: "./private.component.html",
  styleUrl: "./private.component.css"
})

export class PrivateComponent implements OnInit{
  private _errorMessage:string;
  private _token:string;
  private _messagesreceived:MessageModel[];
  private authservice:AuthService;
  private messagesmanager:MessagesManagerService;
  private printmessage:PrintMessageService;

  constructor(){
    this._errorMessage = "";
    this._token = <string>localStorage.getItem("token");
    this._messagesreceived = [];
    this.authservice = inject(AuthService);
    this.messagesmanager = inject(MessagesManagerService);
    this.printmessage = inject(PrintMessageService);
  }

  public get errorMessage():string{
    return this._errorMessage;
  }

  public get token():string{
    return this._token;
  }

  public get messagesreceived():MessageModel[]{
    return this._messagesreceived;
  }

  public ngOnInit():void{
    this.messagesmanager.receiveMessage();
    this.printmessage.getNextSystemMessage().subscribe({
      next: (textmessage:string) => {
        if(textmessage !== ""){
          const jsonarray:any[] = JSON.parse(textmessage);
          for(let i = 0;i < jsonarray.length;i++){
            const messagereceived:MessageModel = new MessageModel();
            messagereceived.id = jsonarray[i]._id;
            messagereceived.sender = jsonarray[i].sender;
            messagereceived.date = new Date(jsonarray[i].date);
            messagereceived.text = jsonarray[i].text;
            this._messagesreceived.push(messagereceived);
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
    this.printmessage.getNextClientsMessage().subscribe({
      next: (textmessage:string) => {
        if(textmessage !== ""){
          const jsonmessage:any = JSON.parse(textmessage);
          const messagereceived:MessageModel = new MessageModel();
          messagereceived.id = jsonmessage._id;
          messagereceived.sender = jsonmessage.sender;
          messagereceived.date = new Date(jsonmessage.date);
          messagereceived.text = jsonmessage.text;
          this._messagesreceived.push(messagereceived);
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
      const message:MessageModel = new MessageModel();
      message.date = new Date();
      message.sender = <string>localStorage.getItem("token");
      message.text = form.value.text;
      this.messagesmanager.sendMessage(message);
    }
  }
}
