import { ElementRef, Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import {  Typograph } from 'apps/page-builder/src/app/_interfaces/_typograph';
import { PageData } from 'apps/page-builder/src/app/_interfaces/_page';
import { fontList } from './allFonts';
import { typographs } from './typograph';

@Injectable({
  providedIn: 'root'
})
export class PagePropertyServiceService {

  constructor() { }

  private closeTab= new Subject<Boolean>(); 

  // style typograph list [heading1..heading6, p1...p3]
  public typographList:Observable<Typograph[]> = of(typographs)

  // all fonts lists
  public allFonts = of(fontList)

  // current page to modify or change styles
  selectedPage = new BehaviorSubject({page: new PageData(), tab!:''})
  
  private pageHTML = new BehaviorSubject<string>("")
  selectedPageHTML = this.pageHTML.asObservable()

  // page tabs[setting, basic SEO....]
  closeComponentsTab(event:Boolean):Observable<Boolean>{
    this.closeTab.next(event)
    return this.closeTab
  }

  setPageHTML(el:string){
    this.pageHTML.next(el)
  }
  // updating current page
  singlePageChoose(page:PageData, tab?:string) {
    this.selectedPage.next({page,tab:tab||''});
}



}
