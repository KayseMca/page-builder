import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { PagePropertyServiceService } from 'src/app/shared/services/page-property/page-property-service.service'



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscriptions:Subscription = new Subscription()
  //contionue here for adding output an event
  @Output() public sidenavToggle = new EventEmitter();
  @Input() sidenavOpened!:any 

  breakpoints_show:Boolean = false
  // current_breakpoint:BreakPoints = {type:'desktop',value:'100%'}
  toggleLine:string = 'desktop'
  constructor(
    public pageService:PagePropertyServiceService, 
    // private breakpoint:BreakpointsService,
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: Object,
    ) {
  //  this.sidenavOpened = this.pageService?.opened()
  
   }


  ngOnInit(): void {
    
    
  }

  onToggleSidenav(){
    this.sidenavToggle.emit()
    // this.pageService.toggle()
    this.subscriptions.add(this.pageService.closeComponentsTab(false).subscribe((res:any)=>{
       
     })
    )
  }


  toggleUnderline(event:string){
    this.toggleLine = event
    
    if(event==='desktop'){
      // this.current_breakpoint = {value:'100%', type:'desktop'}
      // this.breakpoint.setBreakpoints(this.current_breakpoint)
      if (isPlatformBrowser(this.platformId)) {
      this.document.getElementById('theme')?.setAttribute('href','assets/css/desktop.css');
      }
    }else if(event==='mobile'){
      // this.current_breakpoint = {value:'480px', type:'mobile'}
      // this.current_breakpoint = {value:'321px', type:'mobile'}
      // this.breakpoint.setBreakpoints(this.current_breakpoint)
      if (isPlatformBrowser(this.platformId)) {
      this.document.getElementById('theme')?.setAttribute('href','assets/css/mobile.css');
      }
    }
  }

  ngOnDestroy(): void {
      if(this.subscriptions) this.subscriptions.unsubscribe()
  }
}
