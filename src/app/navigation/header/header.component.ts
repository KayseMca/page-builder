import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { PagePropertyServiceService } from 'src/app/shared/services/page-property/page-property-service.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //contionue here for adding output an event
  @Output() public sidenavToggle = new EventEmitter();
  @Input() sidenavOpened!:any 

  toggleLine:string = 'desktop'
  constructor(public pageService:PagePropertyServiceService) {
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
  }
}
