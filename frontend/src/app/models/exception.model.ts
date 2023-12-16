export class ExceptionModel{
    private _message: string;
    private _code: number;
    private _check: boolean;

    constructor(_message:string,_code:number,_check:boolean){
        this._message = _message;
        this._code = _code;
        this._check = _check;
    }

    public get message(): string {
        return this._message;
    }

    public set message(value: string) {
        this._message = value;
    }

    public get code(): number {
        return this._code;
    }

    public set code(value: number) {
        this._code = value;
    }

    public get check(): boolean {
        return this._check;
    }

    public set check(value: boolean) {
        this._check = value;
    }
}