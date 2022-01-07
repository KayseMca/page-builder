import { AfterViewInit,ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { PagePropertyServiceService } from './shared/services/page-property/page-property-service.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

   public sidenav!: MatSidenav 

  title = 'page-builder';
  constructor(private sidenavService:PagePropertyServiceService){}

  
  ngOnInit(): void {
    console.log("######")
    
  }
  
  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    console.log(this.sidenav)
    
  }

  onToggleSidenav(event:MatSidenav){
    this.sidenav = event
    
    return this.sidenav.toggle()
  }
  setSidenav(nav:MatSidenav){
    this.sidenav = nav
    nav.open()
    this.sidenavService.setSidenav(nav)
  }
}