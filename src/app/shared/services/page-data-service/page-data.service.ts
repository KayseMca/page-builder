import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PageData } from 'src/app/_interfaces/_page';
import { data } from '../data';

@Injectable({
  providedIn: 'root'
})
export class PageDataService {


  private dataSource = new BehaviorSubject<any>(data)
  readonly allPagesData: Observable<PageData[]> = this.dataSource.asObservable()

  constructor() {
    console.log("service constructor")
    console.log(this.dataSource)
  }


  // getAllPageData():Observable<PageData[]>{

  //   return this.allPagesData
  // }





  updatePageData(data: PageData) {


    let oldData: any[] = this.dataSource.value
    let id;
    console.log(data)
    console.log("update datasource")
    console.log(this.dataSource)

    oldData.forEach((item: PageData) => {
      id = item.id === data.id ? true : false

      // check and change  the other items home_page value 
      if (data.home_page) {
        if (item.home_page && !id) {
          console.log(item)
          item.home_page = false
          console.log(item)
        }
      }else{
        if(id){
          item.page_settings.permissions = data.page_settings.permissions
        }
      }


    })
  }
}
