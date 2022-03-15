
import {  ApplicationRef, Component, ComponentFactoryResolver, createNgModuleRef, Injector, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { PageDataService } from 'apps/page-builder/src/app/shared/services/page-data-service/page-data.service';
import { PagePropertyServiceService } from 'apps/page-builder/src/app/shared/services/page-property/page-property-service.service';
import { PageData } from '@sognando-casa/api-interfaces';
import { DynamicLoadComponent } from '../dynamic-load/dynamic-load.component';

@Component({
  selector: 'app-create-duplicate-page',
  template: `
  
  `,
  styles: [
  ]
})
export  class  CreateDuplicatePageComponent  {

  private pageHTML = ''
  subs:Subscription = new Subscription()
  private allPages!:PageData[]
  constructor(
    private pages:PageDataService,
    private property:PagePropertyServiceService,
    private resolver:ComponentFactoryResolver,
    //private compile:Compiler,
    private route:Router,
    private appref:ApplicationRef,
    private injector:Injector,
    ///private module:createNgModuleRef
    ) {
    this.subs.add(
      (this.pages.allPagesData.subscribe(res=>{
        // console.log("re calling before created")
      this.allPages = res['content']['pages']
      // console.log(this.allPages)
    })
    ))

    this.subs.add(this.property.selectedPageHTML.subscribe(res=>{
      console.log(res)
      this.pageHTML =res
    })
    )
   }
    

   //    private guidGenerator() {
//     var S4 = function() {
//        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
//     };
//     return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
// }
  // ngOnInit(): void {
  // }

    createNewPage(){
    
    
    let  page_data = this.newPageData()
    
    this.pages.creatNewPage(page_data)

    // generate the component of this and the route url
    this.createComponent(page_data)
  }

   duplicatePage(page:PageData){
    
     //this.duplicateContent(page)

     // get value of the duplicated page to save
     let  page_data = this.duplicateContent(page)
    
     // save page content
    this.pages.creatNewPage(page_data)

    // generate the component of this and the route url
    this.createComponent(page_data)
  }


  // intiliazing page data for some static data and id
  private newPageData():PageData{
    let random = Math.floor(Math.random() * (3 - 1 + 1) + 1)
    console.log("###creaeing new page data")
    console.log(this.allPages)
    let len = this.allPages.length+1
    let styleClass = 'p'+random
    let newPage: PageData = new PageData()
    let settings = ['Settings','SEO Basics','Social Share','Rename','Duplicate','Edit Page','Hide','Delete']
    //creating new page with some values
    let html = `<div class='${styleClass}'>Hello this a new created dynamic component</div>`
    let robots_tags = this.allPages[0].page_settings?.advanced_seo?.robots_meta_tags
    newPage = {
      name: 'New Page',
      home_page : false,
      // id:1,
      id:len*2,
      hide:false,
      settings:settings,
      page_settings:{seo_basics:{},advanced_seo:{robots_meta_tags:robots_tags},page_info:{},social_share:{}},
      page_styles : {...this.allPages[0].page_styles, html:html},
      page_url : `newpage${len+1}`
    }
    
    
    return newPage
  }


  private duplicateContent(page:PageData){
    let id = (this.allPages.length + 1)*2
     let duplicatePage: PageData = new PageData()
     duplicatePage = { ...page }
     duplicatePage.id = id
     duplicatePage.name = 'Copy of ' + duplicatePage.name
     duplicatePage.page_url = 'copy'+duplicatePage.name.replace(/ /g,'')
     duplicatePage.page_styles!['html'] = this.pageHTML
     if(duplicatePage.home_page){
       duplicatePage.home_page = false
       duplicatePage.settings.push('Delete')
     }

     
     return duplicatePage
  }
  // resetConfig(url:any){
  //   const appRoutes = [...this.route.config]
  //   const route = {
  //         path:`${url}`,
  //         // loadChildren(){return module}
  //       }
  //       appRoutes.push(route)
  //       this.router.resetConfig(appRoutes)
  //       this.router.navigateByUrl(`${url}`)
  // }



  private createComponent(page:PageData){
    console.log("########### creating component")
    console.log(page)
    let newPageData = this.allPages.find(pages=>pages.id===page.id)
    let componentFactory = this.resolver.
    resolveComponentFactory(DynamicLoadComponent)
    .create(this.injector)

    // let childComponentRef = this.vc.createComponent(componentFactory1);
    this.appref.detachView(componentFactory.hostView);
    // adding routing for this created component
    let allroutes = this.route.config;
    allroutes.unshift({
      path: page.page_url,
      component: DynamicLoadComponent,
      data:newPageData
    });
    //this.property.selectedPage.next(page)

  }


 private createComponentd(page:PageData){
   
   // create first the page tempate <for now as a test>
   const template = `<div> created new page ${page.name}{{data}}</div>`

  //  const moduleRef = createNgModuleRef(module, this.injector);

  const component = Component({template:template, styles:['']})(class {
    data!:string
    constructor(){}
  })
  const routes = [{path:`${page.page_url}`, component:component}]

  const componentModule = NgModule({
    imports:[RouterModule.forChild(routes)],
    declarations:[component]
  })(class{
    
  })

  let module = createNgModuleRef(componentModule, this.injector)
  

  
  }

  
  // testing find component its url
  configureRoutes(routes:any[]) {
    var potentialComponents = [ DynamicLoadComponent ];
    routes.forEach((route) => {
      route.component = potentialComponents.find((component) => {
        return component.name === route.component;
      })
    });
  }
}

