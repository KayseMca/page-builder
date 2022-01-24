import {  ChangeDetectionStrategy, Component, HostBinding, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';

import { PageDataService } from './shared/services/page-data-service/page-data.service';
import { PagePropertyServiceService } from './shared/services/page-property/page-property-service.service';


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

  title = 'page-builder';
  page_selected!:PageData
  resize: {width:string,margin?:string}={width:'100%'};

  // Update the css variable in typograpies
  // @HostBinding('style')
  // get style(){
  //   let style = ['size','font','style','color']
  //   //let index = 0
  //   let stylesArray:any = {}
  //   let count = 0
  //   let allcount=0;
  //   this.page_selected.page_styles?.typography?.map((typo:any)=>{
  //     let current;
  //     let value = `${typo[`${style[0]}`]}`
  //     let value1 = `${typo[`${style[1]}`]}`
  //     let value2 = `${typo[`${style[2]}`]}`
  //     let value3 = `${typo[`${style[3]}`]}`
  //     // console.log(typo)
  //     if(typo.name==='heading1'){
  //         current = `--heading1-${style[1]}`
  //       value = `${typo[`${style[1]}`]}`
  //       // value1 = `${typo[`${style[1]}`]}`
  //       // value2 = `${typo[`${style[2]}`]}`
  //       // value3 = `${typo[`${style[3]}`]}`
  //       stylesArray[current] = value
  //       // for (let index = 0; index < style.length; index++) {
  //       //   let value = `${typo[`${style[index]}`]}`
  //       //   if(current.includes('size')) value = value+'px'
  //       // }
       
  //     // }else if(typo.name==='heading2'){
  //     //   for (let index = 0; index < style.length; index++) {
  //     //     current = `--heading2-${style[index]}`
  //     //     let value = `${typo[`${style[index]}`]}`
  //     //     if(current.includes('size')) value = value+'px'
  //     //     stylesArray[current] = value
  //     //   }
       
  //     // }else if(typo.name==='heading3'){
  //     //   for (let index = 0; index < style.length; index++) {
  //     //     current = `--heading3-${style[index]}`
  //     //     let value = `${typo[`${style[index]}`]}`
  //     //     if(current.includes('size')) value = value+'px'
  //     //     stylesArray[current] = value
  //     //   }
  //     // }else  if(typo.name==='heading4'){
  //     //   for (let index = 0; index < style.length; index++) {
  //     //     current = `--heading4-${style[index]}`
  //     //     let value = `${typo[`${style[index]}`]}`
  //     //     if(current.includes('size')) value = value+'px'
  //     //     stylesArray[current] = value
  //     //   }
  //     // }else  if(typo.name==='heading5'){
  //     //   for (let index = 0; index < style.length; index++) {
  //     //     current = `--heading5-${style[index]}`
  //     //     let value = `${typo[`${style[index]}`]}`
  //     //     if(current.includes('size')) value = value+'px'
  //     //     stylesArray[current] = value
  //     //   }
  //     // }else  if(typo.name==='heading6'){
  //     //   for (let index = 0; index < style.length; index++) {
  //     //     current = `--heading6-${style[index]}`
  //     //     let value = `${typo[`${style[index]}`]}`
  //     //     if(current.includes('size')) value = value+'px'
  //     //     stylesArray[current] = value
  //     //   }
  //     // }else  if(typo.name==='p1'){
  //     //   for (let index = 0; index < style.length; index++) {
  //     //     current = `--p1-${style[index]}`
  //     //     let value = `${typo[`${style[index]}`]}`
  //     //     if(current.includes('size')) value = value+'px'
  //     //     stylesArray[current] = value
  //     //   }
  //     // }else  if(typo.name==='p2'){
  //     //   for (let index = 0; index < style.length; index++) {
  //     //     current = `--p2-${style[index]}`
  //     //     let value = `${typo[`${style[index]}`]}`
  //     //     if(current.includes('size')) value = value+'px'
  //     //     stylesArray[current] = value
  //     //   }
  //     // }else  if(typo.name==='p3'){
  //     //   // todo change later as this instead of for loop
        
  //     //   // console.log(value, value1, value2, value3)
  //     //   for (let index = 0; index < style.length; index++) {
  //     //     current = `--p3-${style[index]}`
  //     //     let value = `${typo[`${style[index]}`]}`
  //     //     if(current.includes('size')) value = value+'px'
  //     //     stylesArray[current] = value

  //     //   }
  //     }
  //   })

  //   console.log(stylesArray)
  //   return stylesArray  
  // }


  // constructor
  constructor(
    
    private typography:TypographyService,
    private pageService:PageDataService,
    private propertyService:PagePropertyServiceService,
    private sanitizer: DomSanitizer,

    ){

   // handle this it causes some "Violation changes"
   this.subscribe.add(this.pageService.allPagesData.subscribe(res=>{
    // waiting until first value initiliazed to use and change then (from style.css)
    //setTimeout(() => {
      this.page_selected = res[0]
      // this.backgroundColor = res[0].page_styles?.background_color;
      // this.updateTypographyClasses()
   // }, 0);
    
  }))

  }

  resizeObservable$!: Observable<Event>
  resizeSubscription$!: Subscription
  ngOnInit(): void {
   
    console.log("############resizing window")
    // this.resizeObservable$ = fromEvent(window, 'resize')
    // this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
    //   console.log('event: ', evt)
    // })
    // 
  }
  

  onResize(event:any){
    console.log(event)
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