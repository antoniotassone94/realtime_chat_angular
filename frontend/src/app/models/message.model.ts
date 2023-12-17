export class MessageModel{
    private _id:string;
    private _text:string;
    private _sender:string;
    private _date:Date;
    private _sended:boolean;

    constructor(_sended:boolean){
        this._id = "";
        this._text = "";
        this._sender = "";
        this._date = new Date();
        this._sended = _sended;
    }

    public get id():string{
        return this._id;
    }

    public set id(_id:string){
        this._id = _id;
    }

    public get text():string{
        return this._text;
    }

    public set text(_text:string){
        this._text = _text;
    }

    public get sender():string{
        return this._sender;
    }

    public set sender(_sender:string){
        this._sender = _sender;
    }

    public get date():Date{
        return this._date;
    }

    public set date(_date:Date){
        this._date = _date;
    }

    public get sended():boolean{
        return this._sended;
    }

    public set sended(value:boolean){
        this._sended = value;
    }
}