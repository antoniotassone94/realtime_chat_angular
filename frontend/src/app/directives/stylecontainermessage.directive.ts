import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appStylecontainermessage]'
})
export class StylecontainermessageDirective implements OnInit{

  @Input() appStylecontainermessage: boolean = false

  constructor(private element: ElementRef) { }
  
  
  ngOnInit(): void {
  if(this.appStylecontainermessage === true){
    // this.element.nativeElement.style.marginLeft = "50px"
    this.element.nativeElement.style.justifyContent = "flex-start"
    // this.element.nativeElement.style.marginRight = "50px"
    this.element.nativeElement.style.justifyContent = "flex-end"

  }
  }

}
