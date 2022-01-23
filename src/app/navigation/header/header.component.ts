import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, SimpleChanges } from '@angular/core';

import { PagePropertyServiceService } from 'src/app/shared/services/page-property/page-property-service.service'
import { BreakPoints } from 'src/app/_interfaces/_breakpoints';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //contionue here for adding output an event
  @Output() public sidenavToggle = new EventEmitter();
  @Input() sidenavOpened!:any 

  breakpoints_show:Boolean = false
  // current_breakpoint:BreakPoints = {type:'desktop',value:'100%'}
  toggleLine:string = 'desktop'
  constructor(
    public pageService:PagePropertyServiceService, 
    // private breakpoint:BreakpointsService,
    @Inject(DOCUMENT) private document: any
    ) {
  //  this.sidenavOpened = this.pageService?.opened()
  
   }


  ngOnInit(): void {
    
    
  }

  onToggleSidenav(){
    this.sidenavToggle.emit()
    // this.pageService.toggle()
    this.pageService.closeComponentsTab(false).subscribe((res:any)=>{
       
     })
    
  }


  toggleUnderline(event:string){
    this.toggleLine = event
    console.log(event)
    if(event==='desktop'){
      // this.current_breakpoint = {value:'100%', type:'desktop'}
      // this.breakpoint.setBreakpoints(this.current_breakpoint)
      this.document.getElementById('theme')?.setAttribute('href','assets/css/desktop.css');
    }else if(event==='mobile'){
      // this.current_breakpoint = {value:'480px', type:'mobile'}
      // this.current_breakpoint = {value:'321px', type:'mobile'}
      // this.breakpoint.setBreakpoints(this.current_breakpoint)

      this.document.getElementById('theme')?.setAttribute('href','assets/css/mobile.css');
    }
  }
}
