import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';

import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Compiler, Component, ComponentFactoryResolver, HostListener, Injector, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, take } from 'rxjs';

import { PagePropertyServiceService } from 'apps/page-builder/src/app/shared/services/page-property/page-property-service.service';
import { PageDataService } from 'apps/page-builder/src/app/shared/services/page-data-service/page-data.service';
import { PageData, TemplateApi } from '@sognando-casa/api-interfaces';
import { FormControl } from '@angular/forms';
import { DeleteDialogComponent } from 'apps/page-builder/src/app/dialog/delete-dialog.component';

import { CreateDuplicatePageComponent } from 'apps/page-builder/src/app/create-duplicate-page/create-duplicate-page/create-duplicate-page.component';
import { Router } from '@angular/router';




@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SidebarComponent extends CreateDuplicatePageComponent implements OnInit, OnDestroy {

  // @ViewChild(PageContentDirective) html_content!:PageContentDirective
  subscriptions:Subscription = new Subscription()
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
    // 
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
    private resolve:ComponentFactoryResolver,
    private routes:Router,
    private app:ApplicationRef,
    // private compiler:Compiler,
    private dialog: MatDialog,
    private inject:Injector
  ) {
    super(pageData,pageProperties, resolve, routes, app, inject)
    this.editPageValue = new FormControl('')
    this.subscriptions.add(this.pageData.allPagesData.pipe(
      //take(1)
    ).subscribe((res: TemplateApi) => {
      this.allPagesData = res.content.pages
      
    })
    )
  }

  ngOnInit(): void {
    // super.ngOnInit()
    this.subscriptions.add(this.pageProperties.selectedPage.subscribe(res => {
      
    })
    )
  }




  showData(index: number) {
    this.editable = {}
    this.index = index
    this.openComponentTabs = false
    this.hoverPage[index] = true
    this.subscriptions.add(this.pageProperties.closeComponentsTab(this.openComponentTabs).subscribe(res => {
      this.openComponentTabs = res

    })

    )
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
    
    //* modify and edit page selected with selected function
    this.onPageModify(setting)
    //! emit the page choosed
    this.openComponentTabs = true

    let editableSettings = ['SEO Basics', 'Social Share', 'Settings']
    // not need to open tab components if these settings not choose
    if (editableSettings.includes(setting)) {

      //for tab components set true when it choosed one
      this.openComponentTabs = true
      this.pageProperties.singlePageChoose(  this.pageSelected,setting)

    } else {
      this.openComponentTabs = false
    }

    this.subscriptions.add(this.pageProperties.closeComponentsTab(this.openComponentTabs).subscribe(res => {
      this.openComponentTabs = res
    })
    )
    // set dropdown true or false when it clicked
    this.openDropdown = !this.openDropdown


    //TODO use redirect for choosed tab page

  }

  onPageModify(settingType: string) {

    if (settingType === 'Rename') {
      this.editPageValue.setValue(this.allPagesData[this.index].name)
      // let value:string = this.editPageValue.value
      // this.allPagesData[this.index].page_url = value.replace(/\s/g, '')
      //this.editPageValue.setValue(this.allPagesData[this.index].page_url)
      this.editable[this.index] = true
      

    } else if (settingType === 'Duplicate') {
      console.log("here")
      // * duplicate the page its html to set this html to new page html
      let selected_page = {...this.allPagesData[this.index]}
      console.log(selected_page)
     this.duplicatePage(selected_page)
      // clear the id
      this.index = NaN
    } else if (settingType === 'Edit Page') {

    } else if (settingType === 'Show') {
    
      this.allPagesData[this.index].hide = false
      this.settingType[6] = 'Hide'
      this.index = NaN

    } else if (settingType === 'Hide') {
      
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
  createPage() {
    // this.pageData.creatNewPage(newPage)
    this.createNewPage()
  }

  /**
   * clicked Enter in the Edit form
   */
  onEnter() {

    let data = this.editPageValue.value
    if (data !== '' && this.editPageValue.valid) {
      
      this.savingData.name = data
      this.savingData.id = this.allPagesData[this.index].id
      
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

    this.subscriptions.add(dialogRef.afterClosed().subscribe(res => {
      if (res === 'true') {
        
        this.pageData.deletePage(page.id)
      }
    })
    )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subscriptions) this.subscriptions.unsubscribe()

  }
}
