import {Component,OnInit,inject} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MessagesManagerService} from "../../services/messagesmanager.service";
import {PrintMessageService} from "../../services/printmessage.service";

@Component({
  selector: "app-private",
  templateUrl: "./private.component.html",
  styleUrl: "./private.component.css"
})

export class PrivateComponent implements OnInit{
  private _errorMessage:string;
  private _token:string;
  private _messagesreceived:string[];
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

  public get messagesreceived():string[]{
    return this._messagesreceived;
  }

  public ngOnInit():void{
    this.messagesmanager.receiveMessage();
    this.printmessage.getNextSystemMessage().subscribe({
      next: (textmessage:string) => {
        if(textmessage !== ""){
          this._messagesreceived.push("System: " + textmessage);
        }
      }
    });
    this.printmessage.getNextClientsMessage().subscribe({
      next: (textmessage:string) => {
        if(textmessage !== ""){
          this._messagesreceived.push("Another user: " + textmessage);
        }
      }
    });
  }

  public doLogout():void{
    this.authservice.logout();
  }

  public sendMessage(form:NgForm):void{
    if(form.valid){
      this.messagesmanager.sendMessage(form.value.text);
    }
  }
}
