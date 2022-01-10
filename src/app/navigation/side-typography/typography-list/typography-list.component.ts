import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-typography-list',
  templateUrl: './typography-list.component.html',
  styleUrls: ['./typography-list.component.css']
})
export class TypographyListComponent implements OnInit {

  @Input() index!:number
  show:Boolean = false
  clicked = null
  @HostListener('window:mousedown', ['$event'])
  onMouseUp(event: any) {

    let target = ['fa']
    // let list = event.target.classList
    // let value = (event.target as Element).className
    // console.log(list)
    // if(!target.includes(value)) this.openDropdown = false
    let value = (event.target as Element).className
    if (!target.includes(value)) {
      // this.openTabs = false
      this.show = false

    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  openFont(){
    this.show = false
    console.log("open the fonts")
    this.show = !this.show
    console.log(this.index)
  }
}
