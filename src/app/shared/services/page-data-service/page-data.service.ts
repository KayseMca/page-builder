import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { PageData } from 'src/app/_interfaces/_page';
import { data } from '../data';

@Injectable({
  providedIn: 'root'
})
export class PageDataService {


  private dataSource =  new BehaviorSubject<PageData[]>(data)
  readonly allPagesData: Observable<PageData[]> = this.dataSource.asObservable()

  constructor() {
    console.log("service constructor")
    console.log(this.dataSource)
  }


  // getAllPageData():Observable<PageData[]>{

  //   return this.allPagesData
  // }


  creatNewPage(page:PageData){
    let pages:any[] = this.dataSource.getValue()
    pages.push(page)
  }

  updatePageData(data: PageData) {

    let oldData: any[] = this.dataSource.value
    let id;

    oldData.forEach((item: PageData) => {
      id = item.id === data.id ? true : false
      // check and change  the other items home_page value 
      if (data.home_page) {
        if (item.home_page && !id) {
          item.home_page = false
        }
      }else{
        // spreading object data to sourceData
        // and checking which page data modifying
        if(id){
          console.log(data)
          item.page_settings.permissions = {...item.page_settings?.permissions ,...data?.page_settings?.permissions}
          item.page_settings.seo_basics = {...item.page_settings.seo_basics ,...data?.page_settings?.seo_basics}
          item.page_settings.social_share = {...item.page_settings.social_share,...data?.page_settings?.social_share}
          item.page_settings.additional_seo = {...item.page_settings.additional_seo,...data?.page_settings?.additional_seo}
          item.name = data.name
        }
      }
    })

    console.log(oldData)
    // this.dataSource.next(oldData)
  }
}
