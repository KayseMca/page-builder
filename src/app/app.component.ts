import { AfterViewInit,ChangeDetectorRef, Component, EventEmitter, HostBinding, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';

import { TypographyService } from './shared/services/typography/typography.service';
import { PageData } from './_interfaces/_page';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  @HostBinding('style.--background-color') backgroundColor!:string
   public sidenav!: MatSidenav 

  title = 'page-builder';
  page_selected!:PageData
  
  constructor(private typography:TypographyService, private cdr:ChangeDetectorRef){
   
  }

  
  ngOnInit(): void {
    
    this.typography.background_color.subscribe(res=>{
      // waiting until first value initiliazed to use and change then (from style.css)
      setTimeout(() => {
        
        this.backgroundColor = res;
      }, 0);

      })
  }
  

  onToggleSidenav(event:MatSidenav){
   
    this.sidenav = event
    return this.sidenav.toggle()
  }
 

}