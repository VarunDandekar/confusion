import { Directive ,ElementRef,Renderer2,HostListener} from '@angular/core';
import { ElementDef } from '@angular/core/src/view';

@Directive({
  selector: '[appHightlight]'
})
export class HightlightDirective {

  constructor(private el: ElementRef , private renderer:Renderer2) { }

  @HostListener('mouseenter') onmouseenter(){
    this.renderer.addClass(this.el.nativeElement ,'highlight');

  }

  @HostListener('mouseleave') onmouseleave(){
    this.renderer.removeClass(this.el.nativeElement ,'highlight');

  }
}
