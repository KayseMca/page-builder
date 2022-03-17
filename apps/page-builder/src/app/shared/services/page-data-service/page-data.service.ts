import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, map, Observable, of } from 'rxjs';
import { PageData, Style,TemplateApi,Typograph } from '@sognando-casa/api-interfaces';
import { data } from '../data';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from '@sognando-casa/shared/data-access';

export class PagesData extends TemplateApi{}


@Injectable({
  providedIn: 'root',

})
export class PageDataService {

  url = 'http://localhost:3000/users/'

  dataSource = new BehaviorSubject<any>(new PagesData())
  readonly allPagesData: Observable<any> = this.dataSource.asObservable()


  constructor( private router:Router, private http:HttpClient, private sharedData:SharedDataService) {
    //this.ppd.singlePageChoose(data[0], '')
    this.sharedData.pub.published = false
  }


 

  // return a page values
  getPage(name:string):PageData{
    let newData:PageData[] = data
    let page = newData.filter((page:PageData)=> page.page_url === name) 
    return page[0]
  }

  // creating new empty page
  creatNewPage(page: PageData) {
    let data: TemplateApi= {...this.dataSource.value}
    let pages = data.content.pages
    // let pages: any[] = [...this.getPages().]
    pages.push({...page})
    //
    data.content.pages = pages
    

    this.http.post(this.url, data).subscribe(res=>{
      this.dataSource.next(res)
    })
  }


  // all the updates goes here of page
  updatePageData(data: PageData) {
    let oldData: TemplateApi = {...this.dataSource.value}
    let pages = oldData['content']['pages']
    let id;

    pages.forEach((item: PageData) => {
      id = item.id === data.id ? true : false
      
      // check and change  the other items home_page value 
      if (data.home_page) {

        if (item.home_page && !id) {
          item.home_page = false
        }
      } else {
        // spreading object data to sourceData
        // and checking which page data modifying
        let social_url = data.page_settings?.seo_basics?.url 
        let seo_url = data.page_settings?.social_share?.url
        let pageURl = item.page_url
        let newURL = seo_url? seo_url:social_url
        if (id) {
          item!.page_settings!.permissions = { ...item?.page_settings?.permissions, ...data?.page_settings?.permissions }
          item!.page_settings!.seo_basics = { ...item?.page_settings?.seo_basics, ...data?.page_settings?.seo_basics }
          item!.page_settings!.social_share = { ...item.page_settings?.social_share, ...data?.page_settings?.social_share }
          item!.page_settings!.advanced_seo = { ...item.page_settings?.advanced_seo, ...data?.page_settings?.advanced_seo }

          item.name = this.assign(data.name, item.name)
          item.home_page = this.assign(data.home_page, item.home_page)
          item.page_url = newURL
          if(newURL)this.updatePageUrl(pageURl, newURL)
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
    oldData.content.pages = pages
    this.dataSource.next(oldData)
   return this.http.post('http://localhost:3000/users/', oldData)
  }


  validate(name: any) {
    return !!name
  }

  assign(data: any, old: any) {
    if (!!data) return data
    return old
  }


  /**
   * to save every page styles making some configuration here; to not overwrite the exist page style if just updated one element
   * @param itemTypo 
   * @param newTypo 
   * @returns 
   */
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
    console.log(value)
    if(value){
      let routes = this.router.config
      let a = routes.map(route=>{
        if(route.path===pageUrl){
          route.path = value
          console.log(route)
          // console.log(route)
          return route
        } 
        return route
      })
      console.log(a)
    }

  }
  
  deletePage(id: number) {
    let data = this.dataSource.getValue()

    let pageId = data.findIndex((res:any) => res.id === id)
    data.splice(pageId, 1)

    this.dataSource.next(data)
  }
}
