import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PagePropertyServiceService } from 'src/app/shared/services/page-property/page-property-service.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //contionue here for adding output an event
  @Output() public sidenavToggle = new EventEmitter();
  @Input()sidenavOpened!:Boolean 
  constructor(private pageService:PagePropertyServiceService) { }

  ngOnInit(): void {
  }

  onToggleSidenav(){
    this.sidenavToggle.emit()
    this.pageService.closeComponentsTab(false).subscribe((res:any)=>{
      console.log(res)
    })
  }

}
