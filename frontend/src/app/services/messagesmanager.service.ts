import {Injectable,inject} from "@angular/core";
import {Socket} from "ngx-socket-io";
import {PrintMessageService} from "./printmessage.service";
import {MessageModel} from "../models/message.model";

@Injectable({
  providedIn:"root"
})

export class MessagesManagerService{
  private printmessage:PrintMessageService;

  constructor(private socket:Socket){
    this.printmessage = inject(PrintMessageService);
  }

  public sendMessage(message:MessageModel){
    return this.socket.emit("send",JSON.stringify(message));
  }

  public extractMessages(){
    return this.socket.emit("extract",JSON.stringify({token:localStorage.getItem("token")}));
  }

  public receiveMessage(){
    this.socket.on("exception",(message:string) => {
      this.printmessage.setNextExceptionMessage(message);
    });
    this.socket.on("systemResponse",(message:string) => {
      this.printmessage.setNextSystemMessage(message);
    });
    this.socket.on("receiveClients",(message:string) => {
      this.printmessage.setNextClientsMessage(message);
    });
  }
}
