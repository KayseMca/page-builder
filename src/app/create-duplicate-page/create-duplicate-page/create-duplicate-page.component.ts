
import {  ApplicationRef, Component, ComponentFactoryResolver, createNgModuleRef, Injector, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { PageDataService } from 'src/app/shared/services/page-data-service/page-data.service';
import { PagePropertyServiceService } from 'src/app/shared/services/page-property/page-property-service.service';
import { PageData } from 'src/app/_interfaces/_page';
import { DynamicLoadComponent } from '../dynamic-load/dynamic-load.component';

@Component({
  selector: 'app-create-duplicate-page',
  template: `
  
  `,
  styles: [
  ]
})
export  class  CreateDuplicatePageComponent  {

  //@ViewChild('dynamicPages') template!:ViewContainerRef
  // private compiler!:Compiler;
  // private myServiceC:MyServiceC;
  //private created_page!:PageData
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

     

    this.pages.allPagesData.subscribe(res=>{
      this.allPages = res
    })
   }

  // ngOnInit(): void {
  // }

    createNewPage(){
    console.log("creating new page", this.allPages.length)
    console.log("created this new page")
    let  page_data = this.newPageData()
    
    this.pages.creatNewPage(page_data)

    // generate the component of this and the route url
    this.createComponent(page_data)
  }

   dublicatePage(){

  }


  // intiliazing page data for some static data and id
  private newPageData():PageData{

    let len = this.allPages.length
    let styleClass = 'p'+len
    let newPage: PageData = new PageData()
    let settings = ['Settings','SEO Basics','Social Share','Rename','Dublicate','Edit Page','Hide','Delete']
    //creating new page with some values
    let html = `<div class='${styleClass}'>Hello this a new created dynamic component</div>`
    newPage = {
      name: 'New Page',
      home_page : false,
      // id:1,
      id:len,
      hide:false,
      settings:settings,
      page_settings:{seo_basics:{},advanced_seo:{},page_info:{},social_share:{}},
      page_styles : {...this.allPages[0].page_styles, html:html},
      
      page_url : `newpage${len+1}`
    }
    return newPage
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

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //this.createComponent(this.created_page)
    
  }


  private createComponent(page:PageData){
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
   console.log(page)
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
  console.log(module)

  // this.compile.compileModuleAndAllComponentsAsync(componentModule).then(module=>{
  //   const appRoutes = [...this.router.config]

  //   const route = {
  //     path:`${page.page_url}`,
  //     // loadChildren(){return module}
  //   }
  //   appRoutes.push(route)
  //   this.router.resetConfig(appRoutes)
  //   this.router.navigateByUrl(`${page.name}`)
  // })
  }

  
}


// configureRoutes(routes) {
//   var potentialComponents = [ OtherComponent ];
//   routes.forEach((route) => {
//     route.component = potentialComponents.find((component) => {
//       return component.name === route.component;
//     })
//   });
// }