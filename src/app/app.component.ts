import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
// import {  } from '@angular/common';
import {  ChangeDetectionStrategy, Component, HostBinding, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute,Event, NavigationEnd, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
// import { filter, map, mergeMap, Observable, Subscription, take } from 'rxjs';

import { PageDataService } from './shared/services/page-data-service/page-data.service';
import { PagePropertyServiceService } from './shared/services/page-property/page-property-service.service';
import { SeoService } from './shared/services/seo/seo.service';


import { TypographyService } from './shared/services/typography/typography.service';
import { PageData } from './_interfaces/_page';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy  {

  subscribe:Subscription = new Subscription()
  // @HostBinding('style.--background-color') backgroundColor!:string|undefined
  public sidenav!: MatSidenav 
  width:{width:string,position:string, margin?:string} = {width:'inherit',position:'static'}

  //title = 'page-builder';
  page_selected!:PageData
  resize: {width:string,margin?:string}={width:'100%'};

  // Update the css variable in typograpies
  @HostBinding('style')
  get style(){
   
    // set background
    let backgroundColor:any = this.page_selected.page_styles?.background_color;
    if (isPlatformBrowser(this.platformId)) {
      // Client only code.
      document.documentElement.style.setProperty(`--background-color`, backgroundColor)
      //
   }

   // binding css variables
    this.page_selected.page_styles?.typography?.map((typo:any)=>{
      let current;
      
      if(typo.name==='heading1'){
        this.setCssVariableValue(typo,'heading1')
      }else if(typo.name==='heading2'){
        this.setCssVariableValue(typo,'heading2')
      }else if(typo.name==='heading3'){
        this.setCssVariableValue(typo,'heading3')
      }else  if(typo.name==='heading4'){
        this.setCssVariableValue(typo,'heading4')
      }else  if(typo.name==='heading5'){
        this.setCssVariableValue(typo,'heading5')
      }else  if(typo.name==='heading6'){
        this.setCssVariableValue(typo,'heading6')
      }else  if(typo.name==='p1'){
        this.setCssVariableValue(typo,'p1')
      }else  if(typo.name==='p2'){
        this.setCssVariableValue(typo,'p2')
      }else  if(typo.name==='p3'){
        this.setCssVariableValue(typo,'p3')
      }
    }) 
    return 
  }


  // constructor
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private pageService:PageDataService,
    // private sanitizer: DomSanitizer,
    private seo:SeoService,
    private pProperty:PagePropertyServiceService,
    // private activatedRoute: ActivatedRoute,
    // private router:Router
    ){

   // handle this it causes some "Violation changes"
   this.subscribe.add(this.pageService.allPagesData.subscribe((res:PageData[])=>{
    // waiting until first value initiliazed to use and change then (from style.css)
    //setTimeout(() => {

    // * adding meta tags into index.html
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        this.seo.addMetaTags(element)
      }
      this.page_selected = res[0]
      // this.seo.addTitle(this.page_selected.name)
      // this.backgroundColor = res[0].page_styles?.background_color;
      // this.updateTypographyClasses()
   // }, 0);
    
  }))

  }

  ngOnInit(): void {

    
}
  
  
testchange($event:any){
  let pattern  = /_ngcontent\D+\w+\S+/gim
  let target = ($event['target'] as HTMLHtmlElement)
  let htmlContent:string = (target.lastElementChild?.innerHTML as string)
  htmlContent = htmlContent?.replace(pattern, '')
  

this.pProperty.setPageHTML(htmlContent)
}

  setCssVariableValue(typo:any,title:any){
    let stylesArray:any = {}
    let style = ['size','font','style','color']
    let current:string

    for (let index = 0; index < style.length; index++) {
      let value = `${typo[`${style[index]}`]}`
      current = `--${title}-${style[index]}`
    value = `${typo[`${style[index]}`]}`
      if(current.includes('size')) value = value+'px'
      // stylesArray[current] = value
      if (isPlatformBrowser(this.platformId)) {
        // Client only code.
        document.documentElement.style.setProperty(current,value)
        // 
     }
      // set the typography to the document
    }
  }


  onResize(event:any){
    
  }
  onToggleSidenav(event:MatSidenav){
   
    this.sidenav = event
    return this.sidenav.toggle()
  }
 
  

  // updateTypographyClasses(){
  //  let typography = this.page_selected.page_styles?.typography

  //  let style = ['size','font','style','color']
  //  typography?.map((typo, index)=>{
  //    if(typo.name==='heading1'){
  //      let current = `heading${index+1}_${style[index]}`
  //      this.heading1_size = typo.size+'px'
  //      this.heading1_font = typo.font
  //      this.heading1_style = typo.style
  //      this.heading1_color = typo.color
  //    }
  //  })
  //  
  // }


  ngOnDestroy(): void {
    if(this.subscribe){
      this.subscribe.unsubscribe()
    }
  }
}