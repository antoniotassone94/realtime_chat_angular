import {Directive,ElementRef,OnInit,Input} from "@angular/core";

@Directive({
  selector:"[appStylecontainermessage]"
})

export class StyleContainerMessageDirective implements OnInit{
  @Input() appStylecontainermessage:boolean = false;

  constructor(private element:ElementRef){}
  
  public ngOnInit():void{
    if(this.appStylecontainermessage === true){
      this.element.nativeElement.style.justifyContent = "flex-start";
      this.element.nativeElement.style.justifyContent = "flex-end";
    }
  }
}
