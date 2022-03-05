import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Typograph } from 'src/app/_interfaces/_typograph';

@Component({
  selector: 'app-typography-list',
  templateUrl: './typography-list.component.html',
  styleUrls: ['./typography-list.component.scss']
})
export class TypographyListComponent implements OnInit {

  @Input() typograph!:Typograph
  
  show:Boolean = false
  clicked = null
  @HostListener('window:click', ['$event'])
  onMouseUp(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.show = false

    }
    
  }

  constructor(private eRef: ElementRef) { }

  ngOnInit(): void {
  }

  get style(){
    return {
      "font-family":this.typograph.font,
      "font-size":this.typograph.size,
      "font-style":this.typograph.style,
      "font-weight":this.typograph.weight,
      "opacity":0.1,
      "color" :this.typograph.color || 'black'
    }
  }
  onSelectTypography(){
    // first close already open font window
    this.show = false
    
    // reopen the new one selected
    this.show = !this.show
  }
}
