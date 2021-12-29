import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, take } from 'rxjs';
import { PageData } from 'src/app/_interfaces/_page';
import { PageDataService } from '../../services/page-data-service/page-data.service';
import { PagePropertyServiceService } from '../../services/page-property/page-property-service.service';



@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.css']
})
export class PageInfoComponent implements OnInit {

  page_info!:FormControl


  newPageData!:PageData
  selectedPageData!:{page:PageData,tab:string}
  constructor(
    private fb:FormBuilder,
    private pagePropertyService:PagePropertyServiceService,
    private pageDataService:PageDataService
    ) { 
      this.selectedPageData =this.pagePropertyService.createdPage.getValue()
      this.newPageData = this.selectedPageData.page
      
    }


  ngOnInit(): void {
    console.log("page info")
    this.page_info = new FormControl(''||this.selectedPageData.page.name)
    this.saveData()

  }

  


  setHomePage(){

    this.newPageData.home_page = true
    // this.pageDataService.updateData(this.pageData)
    // this.pageData.home_page = this.newPageData.home_page
    this.pageDataService.updatePageData(this.newPageData)
}

saveData(){
  this.page_info.statusChanges.pipe(
         debounceTime(200)
       ).subscribe(res=>{
        if(res==='VALID'){
          if(!(this.page_info.value==='')){
            // console.log("valid")
            // console.group(this.page_info.value, this.page_info.valid)
            this.selectedPageData.page.name = this.page_info.value
          }
        }
       })
}
// ngAfterViewInit(): void {
//   //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
//   //Add 'implements AfterViewInit' to the class.
//   this.page_info.statusChanges.pipe(
//     debounceTime(200)
//   ).subscribe(res=>{
//     console.log(res,'res of page')
//     this.newPageData.name = res
//     this.selectedPageData.page.name = res

//     console.log(this.newPageData)
//     console.log(this.pageData)
//     this.pageDataService.updatePageData(this.newPageData)
    
//   })
// }
}


