import { AfterViewInit,ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import {BreakpointObserver} from '@angular/cdk/layout'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'page-builder';
  @ViewChild(MatSidenav) sidenav!:MatSidenav;

  constructor(private observer:BreakpointObserver,private cdr: ChangeDetectorRef){

  }
  ngAfterViewInit(){
    this.observer.observe(['max-width:800px']).subscribe(res=>{
      if(res.matches){
        this.sidenav.mode ='over'
        this.sidenav.close()
      }else{
        this.sidenav.mode = 'side'
        this.sidenav.open()
      }
    })
    this.cdr.detectChanges();
  }
}
