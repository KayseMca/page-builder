import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreakPoints } from 'src/app/_interfaces/_breakpoints';

@Component({
  selector: 'app-breakpoint-list',
  templateUrl: './breakpoint-list.component.html',
  styleUrls: ['./breakpoint-list.component.css']
})
export class BreakpointListComponent implements OnInit {

  
  min_value = 320
  breakpoints$:Observable<BreakPoints[]> = new BehaviorSubject<BreakPoints[]>([
    {type:'mobile', value:{min:this.min_value, max:768},editable:false},
    {type:'mobile', value:{min:769, max:1024}, editable:false},
    {type:'desktop', value:{min:1025, max:1920}, editable:false},
    {type:'mobile', value:{min:this.min_value, max:450}, editable:true},
  ]) 
  constructor() { }

  ngOnInit(): void {
  }


  close(){}
}
