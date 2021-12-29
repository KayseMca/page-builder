import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, of, Subject } from 'rxjs';
import { PageData } from 'src/app/_interfaces/_page';

@Injectable({
  providedIn: 'root'
})
export class PagePropertyServiceService {

  constructor() { }

  private closeTab= new Subject<Boolean>(); 

  createdPage = new BehaviorSubject({page: new PageData(), tab:''})
  


  

  closeComponentsTab(event:Boolean):Observable<Boolean>{
    this.closeTab.next(event)
    return this.closeTab
  }

  
  singlePageChoose(page:PageData, tab:string) {
    this.createdPage.next({page,tab});
}
  
  // singlePAgeChoose(index:number):Observable<Boolean>{
  //   this.createdPage.next()
  //   return this.closeTab
  // }





}
