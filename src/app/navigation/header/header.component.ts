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
ngOnChanges(changes: SimpleChanges): void {
  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.
  console.log(changes)
}
  ngOnInit(): void {
    console.log("heeading")
    console.log(this.sidenavOpened)
  }

  onToggleSidenav(){
    this.sidenavToggle.emit()
    // this.pageService.toggle()
    this.pageService.closeComponentsTab(false).subscribe((res:any)=>{
       console.log(res)
     })
    
  }


  toggleUnderline(event:string){
    this.toggleLine = event
  }
}
