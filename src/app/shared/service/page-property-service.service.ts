import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { data } from './data';
@Injectable({
  providedIn: 'root'
})
export class PagePropertyServiceService {

  constructor() { }

  pageData:Observable<any> = new BehaviorSubject<any>(data)
  

  getData():Observable<any>{
    return this.pageData
  }
}
