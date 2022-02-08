import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { PageData, Style } from 'src/app/_interfaces/_page';
import { Typograph } from 'src/app/_interfaces/_typograph';
import { data } from '../data';


@Injectable({
  providedIn: 'root',

})
export class PageDataService {


  private dataSource = new BehaviorSubject<PageData[]>(data)
  readonly allPagesData: Observable<PageData[]> = this.dataSource.asObservable()


  constructor( private router:Router) {
    //this.ppd.singlePageChoose(data[0], '')
  }



  // return a page values
  getPage(name:string):PageData{
    let newData:PageData[] = data
    let page = newData.filter((page:PageData)=> page.page_url === name) 
    return page[0]
  }

  // creating new empty page
  creatNewPage(page: PageData) {
    let pages: any[] = [...this.dataSource.value]
    pages.push({...page})
    //
    this.dataSource.next(pages)
  }


  // all the updates goes here of page
  updatePageData(data: PageData) {
    let oldData: any[] = [...this.dataSource.value]
    let id;

    oldData.forEach((item: PageData) => {
      id = item.id === data.id ? true : false
      
      // check and change  the other items home_page value 
      if (data.home_page) {

        if (item.home_page && !id) {
          item.home_page = false
        }
      } else {
        // spreading object data to sourceData
        // and checking which page data modifying
        let pageURl = item.page_url
        let newURL = data.page_settings?.seo_basics?.url
        if (id) {
          item!.page_settings!.permissions = { ...item?.page_settings?.permissions, ...data?.page_settings?.permissions }
          item!.page_settings!.seo_basics = { ...item?.page_settings?.seo_basics, ...data?.page_settings?.seo_basics }
          item!.page_settings!.social_share = { ...item.page_settings?.social_share, ...data?.page_settings?.social_share }
          item!.page_settings!.advanced_seo = { ...item.page_settings?.advanced_seo, ...data?.page_settings?.advanced_seo }

          item.name = this.assign(data.name, item.name)
          item.home_page = this.assign(data.home_page, item.home_page)
          item.page_url = item.page_settings!.seo_basics.url = data.page_settings?.seo_basics?.url
          this.updatePageUrl(pageURl, newURL)
        }

        // change all the pages styles background color
        let item_style = item.page_styles
        let data_style = data.page_styles
        let style = data_style?.typography
        
        item.page_styles={
          html:data.page_styles?.html? data.page_styles?.html: item_style?.html,
           background_color:data_style?.background_color ? data_style?.background_color : item_style?.background_color,
           typography: style ?[...this.updatePageStyles(item_style?.typography, data_style?.typography)]:item_style?.typography
          }
      }

    })


    //saving data
    
    this.dataSource.next(oldData)
  }


  validate(name: any) {
    return !!name
  }

  assign(data: any, old: any) {
    if (!!data) return data
    return old
  }

  updatePageStyles(itemTypo:any, newTypo:any):Typograph[]{
    
    let newElement = newTypo[0]
    

    for (let index = 0; index < itemTypo.length; index++) {
      const element = itemTypo[index]['style_type'];
      if(element === newElement['style_type']){
        
        //
        itemTypo[index] = newElement
        break
      }
      
    }
    
    return itemTypo
  }
 

  /**
   ** updating page url if changed
   * @param pageUrl 
   * @param value 
   */
  updatePageUrl(pageUrl:string|undefined, value?:string){
    if(value){
      let routes = this.router.config
      let a = routes.map(route=>{
        if(route.path===pageUrl) {
          route.path = value
        }
      })
    }

  }
  
  deletePage(id: number) {
    let data = this.dataSource.getValue()

    let pageId = data.findIndex(res => res.id === id)
    data.splice(pageId, 1)

    this.dataSource.next(data)
  }
}
