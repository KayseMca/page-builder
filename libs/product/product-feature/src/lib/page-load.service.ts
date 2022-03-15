import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageLoadService {

  public selected: Subject<any> = new Subject();

  page = this.selected.asObservable();
  private readonly url = 'http://localhost:3000/users/';
  constructor(private http: HttpClient) {}

  getTemplates() {
    return this.http.get(this.url + '1');
  }

  getPage(id: any) {
    return this.http.get(this.url + id);
  }

  selectedPage(s: any) {
    console.log("slected page")
    this.selected.next(s);
  }
}
