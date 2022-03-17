import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  PageData, publish, TemplateApi } from '@sognando-casa/api-interfaces';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export class PagesData extends TemplateApi{}
@Injectable({
  providedIn: 'root'
})
export class SharedDataService{

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // all the data of pages from the backend
  dataSource!:Observable<PagesData>
  // just to access the pages data to not modify
  readonly allTemplates!: Observable<PagesData>
  private selectedPage = new BehaviorSubject(new PageData());
  // selected page accessing outside
  current_page = this.selectedPage.asObservable();

  /**
   * set true or false publish variable depending on  the  project  using this service
   */
  pub = new publish()

  // current template that editing or publishing
  current_template:Observable<PagesData> = new BehaviorSubject(new PagesData())
  // the backend url
  private readonly url = 'http://localhost:3000/users/';
  constructor(private http: HttpClient) {
    this.dataSource = this.getTemplates()
    this.allTemplates = this.dataSource
  }


  /**
   * Get all templates
   * @returns 
   */
  getTemplates() {
    return this.http.get<PagesData>(this.url+'all');
  }


  /**
   * get simple template 
   * @param id 
   * @returns 
   */
  getTemplate(id: string) {
    const template = this.http.get<PagesData>(this.url + id);
    this.current_template = template
    return this.current_template
  }


  /**
   * set a selected page 
   * @param page
   */
  setSelectedPage(page: PageData) {
    console.log("slected page")
    this.selectedPage.next(page);
  }


  // saving data to server when it published and clicked publish button
  saveTemplate(template:TemplateApi):Observable<TemplateApi>{
    return this.http.post<TemplateApi>(this.url, template)
  }
}
