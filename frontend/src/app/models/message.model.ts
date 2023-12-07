export class MessageModel{
    private _id:string;
    private _text:string;

    constructor(){
        this._id = "";
        this._text = "";
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
}