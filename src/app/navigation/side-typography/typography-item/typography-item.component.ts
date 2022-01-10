import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-typography-item',
  templateUrl: './typography-item.component.html',
  styleUrls: ['./typography-item.component.css']
})
export class TypographyItemComponent implements OnInit {

  @Input() index!:number

  font!:{font:string,size:number,font_type:string,color:string}

  fontlist = ['Barlow Medium','Basic','Caudex','Comic Sans MS']
  constructor() { }

  
  ngOnInit(): void {
  }

}
