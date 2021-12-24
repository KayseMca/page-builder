import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-properties',
  templateUrl: './page-properties.component.html',
  styleUrls: ['./page-properties.component.css']
})
export class PagePropertiesComponent implements OnInit {

  constructor() { }

  @Input() close!:Boolean
  @Output() closeTab = new EventEmitter()
  ngOnInit(): void {

  }


  closeTabs(){
    this.close = !this.close
    this.closeTab.emit(this.close)
  }
}
