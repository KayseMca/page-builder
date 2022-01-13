import { AfterViewInit,ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { take } from 'rxjs';
import { PagePropertyServiceService } from './shared/services/page-property/page-property-service.service';
import { PageData } from './_interfaces/_page';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

   public sidenav!: MatSidenav 

  title = 'page-builder';
  page_selected!:PageData
  background_color!:string|undefined
  constructor(private sidenavService:PagePropertyServiceService){
    this.sidenavService.selectedPage.subscribe(res=>{
      this.page_selected = res.page
     this.background_color = this.page_selected.page_styles?.background_color
    })
  }

  
  ngOnInit(): void {

    console.log(this.background_color)
    
  }
  

  onToggleSidenav(event:MatSidenav){
   
    this.sidenav = event
    return this.sidenav.toggle()
  }
 
}