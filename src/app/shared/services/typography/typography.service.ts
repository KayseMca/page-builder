import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypographyService {

  private _current_color = new Subject<string>()
  background_color = this._current_color.asObservable()

  constructor() { }
  

  setColor(color:string){
    
    this._current_color.next(color)
  }
}
