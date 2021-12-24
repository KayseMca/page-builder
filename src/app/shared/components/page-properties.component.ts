import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PagePropertyServiceService } from '../service/page-property-service.service';

@Component({
  selector: 'app-page-properties',
  templateUrl: './page-properties.component.html',
  styleUrls: ['./page-properties.component.css']
})
export class PagePropertiesComponent implements OnInit {

  constructor(private pageService:PagePropertyServiceService) { }

  closeTab!:Boolean
  ngOnInit(): void {

  }


  closeTabs(){
    this.closeTab = false
    this.pageService.closeComponentsTab(this.closeTab).subscribe(res=>console.log(res))
  }
}
