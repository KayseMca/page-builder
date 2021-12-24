import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { PagePropertyServiceService } from 'src/app/shared/service/page-property-service.service';
import { PageData } from 'src/app/_interfaces/_page';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  previousIndex!:number
  openDropdown:Boolean = false
  settingType!: string[]
  pageData!:PageData[]


  openTabs:Boolean = false

  @HostListener('window:mousedown', ['$event'])
  onMouseUp(event: any) {
    let target = ['fa fa-ellipsis-h','mat-button-wrapper','mat-focus-indicator mat-button mat-button-base ng-star-inserted','dropdown-content-active']
    // let list = event.target.classList
    // let value = (event.target as Element).className
    // console.log(list)
    // if(!target.includes(value)) this.openDropdown = false
    let value = (event.target as Element).className
    if(!target.includes(value)) {
      // this.openTabs = false
      this.openDropdown=false
    }
  }

  // constructor
  constructor(private observer:BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private pageProperties:PagePropertyServiceService
    ) { 
      this.pageProperties.getData().subscribe((res:PageData[])=>{
        this.pageData = res
        })
    }

  ngOnInit(): void {
  }



  showData(index:number){
    if(index!==this.previousIndex){
      this.openDropdown =true
    }
    // else{
    //   this.openDropdown = !this.openDropdown
    // }
    let page = this.pageData[index]

    this.settingType = Object.keys(page['page_settings'])
    
  }

  settings(event:any){
    this.openDropdown = !this.openDropdown
    this.openTabs = true
    this.pageProperties.closeComponentsTab(this.openTabs).subscribe(res=>{
      this.openTabs = res
    })
    console.log(event)
    // this.openDropdown = !this.openDropdown
    // e.preventDefault();
  }
}
