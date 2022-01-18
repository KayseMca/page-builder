import {  Component, HostBinding, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable, take } from 'rxjs';
import { PageDataService } from './shared/services/page-data-service/page-data.service';
import { PagePropertyServiceService } from './shared/services/page-property/page-property-service.service';


import { TypographyService } from './shared/services/typography/typography.service';
import { PageData } from './_interfaces/_page';
import { Typograph } from './_interfaces/_typograph';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  @HostBinding('style.--background-color') backgroundColor!:string|undefined
   public sidenav!: MatSidenav 

  title = 'page-builder';
  page_selected!:PageData
  

  constructor(
    
    private typography:TypographyService,
    private pageService:PageDataService,
    private propertyService:PagePropertyServiceService
    ){
   
  }

  
  ngOnInit(): void {
    

    // handle this it causes some "Violation changes"
    this.pageService.allPagesData.subscribe(res=>{
      // waiting until first value initiliazed to use and change then (from style.css)
      setTimeout(() => {
        
        this.backgroundColor = res[0].page_styles?.background_color;
      }, 0);

      })
  }
  

  onToggleSidenav(event:MatSidenav){
   
    this.sidenav = event
    return this.sidenav.toggle()
  }
 

}