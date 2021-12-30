import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { PageData, SEO } from 'src/app/_interfaces/_page';
import { PageDataService } from '../../services/page-data-service/page-data.service';
import { PagePropertyServiceService } from '../../services/page-property/page-property-service.service';

@Component({
  selector: 'app-seo-basics',
  templateUrl: './seo-basics.component.html',
  styleUrls: ['./seo-basics.component.css']
})
export class SeoBasicsComponent implements OnInit {

  seo_page_title!:FormControl
  seo_meta_description!:FormControl

  seo_data:SEO = new SEO()
  savingData:PageData = new PageData()
  id!:number

  constructor(
    private pageDataService: PageDataService,
    private pageProperty:PagePropertyServiceService
    ) {

      this.pageProperty.createdPage.subscribe(res=>{
        this.id = res.page.id
      })
    this.seo_page_title = new FormControl('')
    this.seo_meta_description = new FormControl('')
   }

  ngOnInit(): void {
    this.getTitledata()
    this.getDescriptionData()
  }

  getTitledata(){
    this.seo_page_title.statusChanges.pipe(debounceTime(200)).subscribe(res=>{
      if(res==='VALID'){
        let data = this.seo_page_title.value
        if(!(data==='') )
        this.seo_data.page_title = data
        this.saveAllData()
        // console.log(this.seo_data)
      }
    })
  }

  getDescriptionData(){
    this.seo_meta_description.statusChanges.pipe(debounceTime(200)).subscribe(res=>{
      if(res==='VALID'){
        let data = this.seo_meta_description.value
        if(!(data==='')  )

        this.seo_data.meta_description = data
        this.saveAllData()
        // console.log(this.seo_data)
      }
    })
  }

  saveAllData(): void{
      
    this.savingData.page_settings = {seo_basics:this.seo_data}
    this.savingData.id = this.id
    // this.savingData['page_settings']['permissions'] = {...this.permission_data }
    this.pageDataService.updatePageData(this.savingData)
  }
}
