import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PageData } from 'src/app/_interfaces/_page';
import { data } from './data';
@Injectable({
  providedIn: 'root'
})
export class PagePropertyServiceService {

  constructor() { }

  closeTab= new Subject<Boolean>();
  pageData:Observable<PageData[]> = new BehaviorSubject<any>(data)
  

  getData():Observable<PageData[]>{
    return this.pageData
  }

  closeComponentsTab(event:Boolean):Observable<Boolean>{
    this.closeTab.next(event)
    return this.closeTab
  }
}
