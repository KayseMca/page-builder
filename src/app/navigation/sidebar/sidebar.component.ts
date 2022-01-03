import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, EventEmitter, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { PagePropertyServiceService } from 'src/app/shared/services/page-property/page-property-service.service';
import { PageDataService } from 'src/app/shared/services/page-data-service/page-data.service';
import { PageData } from 'src/app/_interfaces/_page';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  panelOpenState:Boolean = true
  previousIndex!:number
  openDropdown:Boolean = false
  settingType!: any
  allPagesData!:PageData[]

  pageSelected!:PageData
  allSubscripitons!:Subscription
  openComponentTabs:Boolean = false

  // search specific page
  search:string =''
  //todo create a directive for hover
  hoverPage:any = {}
  index!:number
  editable:any = {}
  editPageValue!:FormControl
  savingData:PageData= new PageData()

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
      this.editPageValue = new FormControl('')
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
    this.editable = {}
    this.index = index
    this.openComponentTabs = false
    this.hoverPage[index] = true
    this.pageProperties.closeComponentsTab(this.openComponentTabs).pipe(take(1)).subscribe(res=>{
      this.openComponentTabs = res
      
  })


    console.log(index, this.previousIndex)
    if(index!==this.previousIndex){
      this.previousIndex = index
      this.openDropdown =true
      this.pageSelected = this.allPagesData[index]
      this.settingType = this.allPagesData[index].settings


    }
    else{
       this.openDropdown = true
     }
    

    
  }

  settings(setting:string, index:number){
    console.log(setting,index)
    this.onPageModify(setting, index)
    // emit the page choosed
    this.openComponentTabs = true
   
    let editableSettings = ['SEO Basics','Social Share','Settings']

    // not need to open tab components if these settings not choose
    if(editableSettings.includes(setting)){

      //for tab components set true when it choosed one
      this.openComponentTabs = true
      this.pageProperties.createdPage.next({page:this.pageSelected,tab:setting})
 
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

  onPageModify(settingType:string, index:number){
    console.log(index)
    if(settingType==='Rename'){
      this.editPageValue.setValue(this.allPagesData[this.index].name)
      this.editable[this.index] = true

    }else if(settingType==='Dublicate'){
      console.log("inside dublicae")
      let id = this.allPagesData.length +1
      let  dublicatePage:PageData = new PageData()
      dublicatePage =  {...this.allPagesData[this.index] }
      dublicatePage.id = id
      dublicatePage.name = 'Copy of '+dublicatePage.name
      dublicatePage.home_page = false
      this.pageData.creatNewPage(dublicatePage)
      this.index = NaN
    }else if(settingType==='Edit Page'){
      
    }else if(settingType==='Hide'){
      console.log("Hide")
      
    }else if(settingType==='Delete'){
      console.log("Delete")
      
    }
  }


  open(){
    let newPage:PageData = new PageData()
    newPage.name = 'New Page'
    this.pageData.creatNewPage(newPage)
  }

  onEnter(){
    console.log(this.editPageValue.value)
    let data = this.editPageValue.value
    if(data!=='' && this.editPageValue.valid){
      console.log(data)
      this.savingData.name = data
      this.savingData.id = this.allPagesData[this.index].id
      console.log(this.savingData)
      this.pageData.updatePageData(this.savingData)
      
    }
    this.editable[this.index] = false
    
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
    
  }
}
