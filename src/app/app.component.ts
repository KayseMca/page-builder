import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
// import {  } from '@angular/common';
import {  ChangeDetectionStrategy, Component, HostBinding, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, Subscription, take } from 'rxjs';

import { PageDataService } from './shared/services/page-data-service/page-data.service';
import { PagePropertyServiceService } from './shared/services/page-property/page-property-service.service';
import { SeoService } from './shared/services/seo/seo.service';



import { TypographyService } from './shared/services/typography/typography.service';
import { PageData } from './_interfaces/_page';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy  {

  subscribe:Subscription = new Subscription()
  // @HostBinding('style.--background-color') backgroundColor!:string|undefined
  public sidenav!: MatSidenav 
  width:{width:string,position:string, margin?:string} = {width:'inherit',position:'static'}

  title = 'page-builder';
  all_pages!:PageData[]
  page_selected!:PageData
  resize: {width:string,margin?:string}={width:'100%'};

  // Update the css variable in typograpies
  // @HostBinding('style')
  // get style(){
   
  // //   // set background
  // //   let backgroundColor:any = this.page_selected.page_styles?.background_color;
  // //   if (isPlatformBrowser(this.platformId)) {
  // //     // Client only code.
  // //     document.documentElement.style.setProperty(`--background-color`, backgroundColor)
  // //     //
  // //  }

  //  // binding css variables
  //   this.page_selected.page_styles?.typography?.map((typo:any)=>{
  //     let current;
      
  //     if(typo.name==='heading1'){
  //       this.setCssVariableValue(typo,'heading1')
  //     }else if(typo.name==='heading2'){
  //       this.setCssVariableValue(typo,'heading2')
  //     }else if(typo.name==='heading3'){
  //       this.setCssVariableValue(typo,'heading3')
  //     }else  if(typo.name==='heading4'){
  //       this.setCssVariableValue(typo,'heading4')
  //     }else  if(typo.name==='heading5'){
  //       this.setCssVariableValue(typo,'heading5')
  //     }else  if(typo.name==='heading6'){
  //       this.setCssVariableValue(typo,'heading6')
  //     }else  if(typo.name==='p1'){
  //       this.setCssVariableValue(typo,'p1')
  //     }else  if(typo.name==='p2'){
  //       this.setCssVariableValue(typo,'p2')
  //     }else  if(typo.name==='p3'){
  //       this.setCssVariableValue(typo,'p3')
  //     }
  //   }) 
  //   return 
  // }


  // constructor
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private pageService:PageDataService,
    private pProperty:PagePropertyServiceService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private seo:SeoService

    ){

   // handle this it causes some "Violation changes"
   this.subscribe.add(this.pageService.allPagesData.subscribe(res=>{

    this.all_pages = res
  }))

  }

  ngOnInit(): void {
   
    console.log("############resizing window")
    // adding active page title and description
    
    // const appTitle = this.seo.getTitle();
    const page_meta:{title?:string, description?:string}= {}
    
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          
          while (child?.firstChild) {
            child = child.firstChild;
          }
          // if (child?.snapshot.data['title']) {
          // // console.log()
          // page_meta.title= child.snapshot.data['title']
          // page_meta.description = child.snapshot.data['description']
          //   // return child.snapshot.data['title'];
          //   return page_meta
            
          // }
          // return appTitle;
          let active_page = child?.snapshot.routeConfig?.path
          return this.getPage(active_page)
        })
      ).subscribe((page:any)=> {
        this.seo.addTitle(page['title'])
        this.seo.updateDescription(page['description'])
        // this.seo.addTitle(ttl);
      });
  }
  
  testchange($event:any){
    let pattern  = /_ngcontent\D+\w+\S+/gim
    let target = ($event['target'] as HTMLHtmlElement)
    let htmlContent:string = (target.lastElementChild?.innerHTML as string)
    htmlContent = htmlContent?.replace(pattern, '')
    
  
  this.pProperty.setPageHTML(htmlContent)
  }
  getPage(url:string|undefined){
    console.log(this.all_pages)
    let page_meta:any = {}
    let page_index = this.all_pages.findIndex(page=>{ 
      console.log(page.page_url)
      return page.page_url===url
    })
    console.log(page_index)
    
    console.log(page_meta)
    if(page_index !==-1){
      page_meta['title'] = this.all_pages[page_index]?.page_settings?.seo_basics?.page_title
    page_meta['description'] = this.all_pages[page_index]?.page_settings?.seo_basics?.meta_description
      return page_meta
    } 
    return
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
 
  



  ngOnDestroy(): void {
    if(this.subscribe){
      this.subscribe.unsubscribe()
    }
  }
}