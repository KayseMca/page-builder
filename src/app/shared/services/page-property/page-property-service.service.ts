import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { PageData } from 'src/app/_interfaces/_page';

@Injectable({
  providedIn: 'root'
})
export class PagePropertyServiceService {

  constructor() { }

  private closeTab= new Subject<Boolean>(); 

  selectedPage = new BehaviorSubject({page: new PageData(), tab!:''})
  


  closeComponentsTab(event:Boolean):Observable<Boolean>{
    this.closeTab.next(event)
    return this.closeTab
  }

  
  singlePageChoose(page:PageData, tab?:string) {
    this.selectedPage.next({page,tab:tab||''});
}


}
