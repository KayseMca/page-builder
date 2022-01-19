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
  @HostBinding('style.--heading1-font') heading1_font:any
  @HostBinding('style.--heading1-size') heading1_size:any
  @HostBinding('style.--heading1-style') heading1_style:any

  title = 'page-builder';
  page_selected!:PageData
  

  constructor(
    
    private typography:TypographyService,
    private pageService:PageDataService,
    private propertyService:PagePropertyServiceService
    ){
   // handle this it causes some "Violation changes"
   this.pageService.allPagesData.subscribe(res=>{
     console.log("###############called again")
    // waiting until first value initiliazed to use and change then (from style.css)
    //setTimeout(() => {
      this.page_selected = res[0]
      this.backgroundColor = res[0].page_styles?.background_color;
      this.updateTypographyClasses()
   // }, 0);
    
  })
  }

  
  ngOnInit(): void {
    

    
    console.log(this.updateTypographyClasses())
  }
  

  onToggleSidenav(event:MatSidenav){
   
    this.sidenav = event
    return this.sidenav.toggle()
  }
 

  updateTypographyClasses(){
   let typography = this.page_selected.page_styles?.typography

   console.log("##########again and again")
   console.log(typography)
   typography?.map(typo=>{
     if(typo.name==='heading1'){
       console.log("here inside")
       this.heading1_size = typo.size+'px'
       this.heading1_font = typo.font
       this.heading1_style = typo.style
     }
   })
   console.log(this.heading1_size)
  }
}