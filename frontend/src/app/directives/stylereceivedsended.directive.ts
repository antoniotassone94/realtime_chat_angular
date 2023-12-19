import {Directive,ElementRef,Input,OnInit} from "@angular/core";

@Directive({
  selector:"[appStylereceivedsended]"
})

export class StyleReceivedSendedDirective implements OnInit{
  @Input() appStylereceivedsended:boolean = false;

  constructor(private element:ElementRef){}

  public ngOnInit():void{
    if(this.appStylereceivedsended === true){
      this.element.nativeElement.style.backgroundColor = "#99ff99";
    }else{
      this.element.nativeElement.style.backgroundColor = "#ffcc99";
    }
  }
}
