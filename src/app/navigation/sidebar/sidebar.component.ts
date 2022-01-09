import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';

import { ChangeDetectorRef, Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';

import { PagePropertyServiceService } from 'src/app/shared/services/page-property/page-property-service.service';
import { PageDataService } from 'src/app/shared/services/page-data-service/page-data.service';
import { PageData } from 'src/app/_interfaces/_page';
import { FormControl } from '@angular/forms';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  panelOpenState: Boolean = true
  previousIndex!: number
  openDropdown: Boolean = false
  settingType!: any[]
  allPagesData!: PageData[]

  
  pageSelected!: PageData
  allSubscripitons!: Subscription
  openComponentTabs: Boolean = false

  // search specific page
  search: string = ''
  //todo create a directive for hover
  hoverPage: any = {}
  index!: number
  editable: any = {}
  editPageValue!: FormControl
  savingData: PageData = new PageData()

  @HostListener('window:mousedown', ['$event'])
  onMouseUp(event: any) {

    let target = ['fa fa-ellipsis-h', 'mat-button-wrapper', 'mat-focus-indicator mat-button mat-button-base ng-star-inserted', 'dropdown-content-active']
    // let list = event.target.classList
    // let value = (event.target as Element).className
    // console.log(list)
    // if(!target.includes(value)) this.openDropdown = false
    let value = (event.target as Element).className
    if (!target.includes(value)) {
      // this.openTabs = false
      this.openDropdown = false

    }
  }

  //! constructor
  constructor(
    // private cdr: ChangeDetectorRef,
    private pageProperties: PagePropertyServiceService,
    private pageData: PageDataService,
    private dialog: MatDialog
  ) {
    this.editPageValue = new FormControl('')
    this.pageData.allPagesData.pipe(
      take(1)
    ).subscribe((res: PageData[]) => {
      this.allPagesData = res
      console.log('reading data')
    })

  }

  ngOnInit(): void {
    this.pageProperties.selectedPage.pipe(take(1)).subscribe(res => {
      console.log('reding data createdpage')
    })


  }




  showData(index: number) {
    this.editable = {}
    this.index = index
    this.openComponentTabs = false
    this.hoverPage[index] = true
    this.pageProperties.closeComponentsTab(this.openComponentTabs).pipe(take(1)).subscribe(res => {
      this.openComponentTabs = res

    })


    if (index !== this.previousIndex) {
      this.previousIndex = index
      this.openDropdown = true
      //get selected page
      this.pageSelected = this.allPagesData[index]

      // get all setting of this page 
      this.settingType = this.allPagesData[index].settings
      if (this.allPagesData[this.index].hide) {
        this.settingType[6] = 'Show'
      }
      if (this.allPagesData[this.index].home_page) {
        this.settingType.splice(7, 1)
      }
    }
    else {
      this.openDropdown = true
    }



  }

  settings(setting: string, index: number) {
    console.log(setting, index)
    this.onPageModify(setting)
    // emit the page choosed
    this.openComponentTabs = true

    let editableSettings = ['SEO Basics', 'Social Share', 'Settings']
    // not need to open tab components if these settings not choose
    if (editableSettings.includes(setting)) {

      //for tab components set true when it choosed one
      this.openComponentTabs = true
      this.pageProperties.selectedPage.next({ page: this.pageSelected, tab: setting })

    } else {
      this.openComponentTabs = false
    }

    this.pageProperties.closeComponentsTab(this.openComponentTabs).pipe(take(1)).subscribe(res => {
      this.openComponentTabs = res
    })

    // set dropdown true or false when it clicked
    this.openDropdown = !this.openDropdown


    //TODO use redirect for choosed tab page

  }

  onPageModify(settingType: string) {

    if (settingType === 'Rename') {
      this.editPageValue.setValue(this.allPagesData[this.index].name)
      this.editable[this.index] = true

    } else if (settingType === 'Dublicate') {
      // todo write the codes in the service
      let id = this.allPagesData.length + 1
      let dublicatePage: PageData = new PageData()
      dublicatePage = { ...this.allPagesData[this.index] }
      dublicatePage.id = id
      dublicatePage.name = 'Copy of ' + dublicatePage.name
      if(dublicatePage.home_page){
        dublicatePage.home_page = false
        dublicatePage.settings.push('Delete')
      }

      console.log(dublicatePage)
      this.pageData.creatNewPage(dublicatePage)
      // clear the id
      this.index = NaN
    } else if (settingType === 'Edit Page') {

    } else if (settingType === 'Show') {
    
      this.allPagesData[this.index].hide = false
      this.settingType[6] = 'Hide'
      this.index = NaN

    } else if (settingType === 'Hide') {
      console.log(settingType)
      this.allPagesData[this.index].hide = true
      this.settingType[6] = 'Show'
      this.index = NaN

    } else if (settingType === 'Set as HomePage') {
      this.savingData.home_page = true
      let id = this.allPagesData[this.index].id
      this.savingData.id = id
      this.pageData.updatePageData(this.savingData)
    } else if (settingType === 'Delete') {
      this.deleteDialog()

    }
  }

  /**
   * Create new Page from + icon
   */
  createNewPage() {
    let newPage: PageData = new PageData()
    let settings = ['Settings','SEO Basics','Social Share','Rename','Dublicate','Edit Page','Hide','Delete']
    newPage.name = 'New Page'
    
    newPage.settings = settings
    newPage.home_page = false
    newPage.page_url = 'newpage'+this.allPagesData.length
    this.pageData.creatNewPage(newPage)
  }

  /**
   * clicked Enter in the Edit form
   */
  onEnter() {

    let data = this.editPageValue.value
    if (data !== '' && this.editPageValue.valid) {
      console.log(data)
      this.savingData.name = data
      this.savingData.id = this.allPagesData[this.index].id
      console.log(this.savingData)
      this.pageData.updatePageData(this.savingData)

    }
    this.editable[this.index] = false

  }

  /**
   * Delete Pop up window
   */

  deleteDialog() {
    let page = this.allPagesData[this.index]
    let dialogRef = this.dialog.open(DeleteDialogComponent, { data: { page } })

    dialogRef.afterClosed().subscribe(res => {
      if (res === 'true') {
        console.log(res)
        this.pageData.deletePage(page.id)
      }
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.


  }
}
