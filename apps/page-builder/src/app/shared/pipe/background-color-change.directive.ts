import { Directive, Input, SimpleChanges } from '@angular/core';
import { TypographyService } from '../services/typography/typography.service';

@Directive({
  selector: '[appBackgroundColorChange]'
})
export class BackgroundColorChangeDirective {

  @Input() color_variable!:string
 

  constructor( private typography:TypographyService) { }
 
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes['color_variable'].currentValue){
      
      const value = changes['color_variable'].currentValue
      this.typography.setColor(value)
    }
  }
}
