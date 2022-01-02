import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, EventEmitter, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { PagePropertyServiceService } from 'src/app/shared/services/page-property/page-property-service.service';
import { PageDataService } from 'src/app/shared/services/page-data-service/page-data.service';
import { PageData } from 'src/app/_interfaces/_page';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  previousIndex!:number
  openDropdown:Boolean = false
  settingType!: any
  allPagesData!:PageData[]

  pageSelected!:PageData
  allSubscripitons!:Subscription
  openComponentTabs:Boolean = false

  // search specific page
  search:string =''

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
    private pageProperties:PagePropertyServiceService,
    private pageData:PageDataService
    ) { 
      this.pageData.allPagesData.pipe(take(1)).subscribe((res:PageData[])=>{
        this.allPagesData = res
        console.log('reading data')
        })
      
    }

  ngOnInit(): void {
    this.pageProperties.createdPage.pipe(take(1)).subscribe(res=>{
      console.log('reding data createdpage')
    })
    
  }



  showData(index:number){
    this.openComponentTabs = false
    this.pageProperties.closeComponentsTab(this.openComponentTabs).pipe(take(1)).subscribe(res=>{
      this.openComponentTabs = res
      
  })

    console.log(index, this.previousIndex)
    if(index!==this.previousIndex){
      this.previousIndex = index
      this.openDropdown =true
      this.pageSelected = this.allPagesData[index]
      // this.pageProperties.createdPage.next({page:this.pageSelected,tab:setting})
      //settings
      this.settingType = this.allPagesData[index].settings
    // console.log(this.pageIndex)
    // this.settingType = Object.keys(this.pageSelected['page_settings'])

    }
    else{
       this.openDropdown = true
     }
    

    
  }

  settings(setting:string){

    // emit the page choosed
    console.log(this.openComponentTabs)
    this.openComponentTabs = true
    console.log(this.openComponentTabs)
   
    let editableSettings = ['SEO Basics','Social Share','Settings']

    // not need to open tab components if these settings not choose
    if(editableSettings.includes(setting)){
      //for tab components set true when it choosed one
      this.openComponentTabs = true
      this.pageProperties.createdPage.next({page:this.pageSelected,tab:setting})
      // this.pageProperties.singlePageChoose(this.pageSelected, setting)
    }else{
      this.openComponentTabs = false
    }

    this.pageProperties.closeComponentsTab(this.openComponentTabs).pipe(take(1)).subscribe(res=>{
      this.openComponentTabs = res
  })
  
    // set dropdown true or false when it clicked
    this.openDropdown = !this.openDropdown

    
    //TODO use redirect for choosed tab page
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
    
  }
}
