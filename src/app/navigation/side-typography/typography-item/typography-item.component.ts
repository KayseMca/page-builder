import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PagePropertyServiceService } from 'src/app/shared/services/page-property/page-property-service.service';
import { Typograph } from 'src/app/_interfaces/_typograph';

@Component({
  selector: 'app-typography-item',
  templateUrl: './typography-item.component.html',
  styleUrls: ['./typography-item.component.css']
})
export class TypographyItemComponent implements OnInit {

  _typograph!:Typograph
  @Input() set typograph(value:Typograph){
     this._typograph = value
  }

  get typograph():Typograph{
    return this._typograph
  }

  //typograph!:Typograph

  all_fonts!:Observable<string[]>
  constructor(private pagePropertyService:PagePropertyServiceService) { 
    this.all_fonts = pagePropertyService.allFonts
  }

  
  ngOnInit(): void {
   
  }

}
