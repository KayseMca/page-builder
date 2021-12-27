import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, EventEmitter, HostListener, OnInit } from '@angular/core';
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
  allPagesData!:PageData[]

  pageSelected!:PageData

  choosedTab:Boolean =false
  openComponentTabs:Boolean = false

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
      this.pageProperties.getAllPageData().subscribe((res:PageData[])=>{
        this.allPagesData = res
        console.log(this.allPagesData)
        })
    }

  ngOnInit(): void {
    this.pageProperties.createdPage.subscribe(res=>{
      console.log(res)
    })
  }



  showData(index:number){
    console.log(index, this.previousIndex)
    if(index!==this.previousIndex){
      this.previousIndex = index
      this.openDropdown =true
      this.pageSelected = this.allPagesData[index]
    // console.log(this.pageIndex)
    this.settingType = Object.keys(this.pageSelected['page_settings'])

    }
    else{
       this.openDropdown = true
     }
    

    
  }

  settings(setting:number){

    // emit the page choosed
    this.choosedTab = true
   
    this.pageProperties.singlePAgeChoose(this.pageSelected, setting).subscribe(res=>{
      console.log(res)
    })
  
    // set dropdown true or false when it clicked
    this.openDropdown = !this.openDropdown

    //for tab components set true when it choosed one
    this.openComponentTabs = true
    this.pageProperties.closeComponentsTab(this.openComponentTabs).subscribe(res=>{
      this.openComponentTabs = res
    })
    
  }

}
