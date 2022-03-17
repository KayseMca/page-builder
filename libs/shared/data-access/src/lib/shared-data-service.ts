import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  PageData, TemplateApi } from '@sognando-casa/api-interfaces';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export class PagesData extends TemplateApi{}
@Injectable({
  providedIn: 'root'
})
export class SharedDataService{

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // all the data of pages from the backend
  dataSource = new BehaviorSubject<PagesData>(new PagesData())
  // just to access the pages data to not modify
  readonly allPagesData: Observable<PagesData> = this.dataSource.asObservable()
  private selectedPage = new BehaviorSubject(new PageData());

  // selected page accessing outside
  current_page = this.selectedPage.asObservable();

  // the backend url
  private readonly url = 'http://localhost:3000/users/';
  constructor(private http: HttpClient) {}

  getTemplates() {
    return this.http.get(this.url + '1');
  }

  getPage(id: number) {
    return this.http.get(this.url + id);
  }

  setSelectedPage(s: PageData) {
    console.log("slected page")
    this.selectedPage.next(s);
  }


  // saving data to server when it published
  saveTemplate(template:TemplateApi):Observable<TemplateApi>{
    return this.http.post<TemplateApi>(this.url, template)
  }
}
