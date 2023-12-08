export class MessageModel{
    private _id:string;
    private _text:string;
    private _sender:string;
    private _date:Date;

    constructor(){
        this._id = "";
        this._text = "";
        this._sender = "";
        this._date = new Date();
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
}