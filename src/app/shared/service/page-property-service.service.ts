import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, of, Subject } from 'rxjs';
import { PageData, PageSettings } from 'src/app/_interfaces/_page';
import { data } from './data';
@Injectable({
  providedIn: 'root'
})
export class PagePropertyServiceService {

  constructor() { }

  private closeTab= new Subject<Boolean>();
  private allPagesData:Observable<PageData[]> = new BehaviorSubject<any>(data)
  

  createdPage:Subject<{page:{},tab:number}> = new BehaviorSubject({page:{},tab:0})


  getAllPageData():Observable<PageData[]>{
    return this.allPagesData
  }

  closeComponentsTab(event:Boolean):Observable<Boolean>{
    this.closeTab.next(event)
    return this.closeTab
  }

  
  
  singlePAgeChoose(page:any, tab:number) {
      this.createdPage.next({page,tab});
      return this.createdPage
  }
  // singlePAgeChoose(index:number):Observable<Boolean>{
  //   this.createdPage.next()
  //   return this.closeTab
  // }





}
