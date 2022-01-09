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
  private sidenav!: MatSidenav ;
  selectedPage = new BehaviorSubject({page: new PageData(), tab:''})
  


  

  closeComponentsTab(event:Boolean):Observable<Boolean>{
    this.closeTab.next(event)
    return this.closeTab
  }

  
  singlePageChoose(page:PageData, tab:string) {
    this.selectedPage.next({page,tab});
}


public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
}

public open() {
    return this.sidenav.open();
}

// public opened(){
//   return this.sidenav.opened
// }

public close() {
    return this.sidenav.close();
}

public toggle(): void {
this.sidenav.toggle();
}



}
