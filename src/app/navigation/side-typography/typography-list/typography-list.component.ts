import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-typography-list',
  templateUrl: './typography-list.component.html',
  styleUrls: ['./typography-list.component.css']
})
export class TypographyListComponent implements OnInit {

  @Input() index!:number
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

  openFont(){
    this.show = false
    console.log("open the fonts")
    this.show = !this.show
    console.log(this.index)
  }
}
