import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { PageData, SEO } from 'src/app/_interfaces/_page';
import { PageDataService } from '../../services/page-data-service/page-data.service';
import { PagePropertyServiceService } from '../../services/page-property/page-property-service.service';
import { SeoService } from '../../services/seo/seo.service';

@Component({
  selector: 'app-seo-basics',
  templateUrl: './seo-basics.component.html',
  styleUrls: ['./seo-basics.component.css']
})
export class SeoBasicsComponent implements OnInit {

  seo_page_title!:FormControl
  seo_meta_description!:FormControl
  seo_page_url!: FormControl
  seo_data:SEO = new SEO()
  savingData:PageData = new PageData()
  selected_page:PageData = new PageData()
  id!:number
  desc:string = "some  data to show"
  constructor(
    private pageDataService: PageDataService,
    private pageProperty:PagePropertyServiceService,
    private seo:SeoService
    ) {

      this.pageProperty.selectedPage.subscribe(res=>{
        this.id = res.page.id
        this.selected_page = res.page
      })
    this.seo_page_title = new FormControl('',Validators.maxLength(200))
    this.seo_meta_description = new FormControl('',Validators.maxLength(500))
    this.seo_page_url = new FormControl('',Validators.maxLength(20))
   }

  ngOnInit(): void {
    this.getTitledata()
    this.getDescriptionData()
    this.getURL()
  }

  getTitledata(){
    this.seo_page_title.statusChanges.pipe(debounceTime(200)).subscribe(res=>{
      if(res==='VALID'){
        let data = this.seo_page_title.value
        
        if(!(data==='') && this.seo_page_title.valid)
        this.seo_data.page_title = data
        this.saveAllData()
        // 
      }
    })
  }

  getDescriptionData(){
    this.seo_meta_description.statusChanges.pipe(debounceTime(200)).subscribe(res=>{
      if(res==='VALID'){
        let data = this.seo_meta_description.value
        if(!(data==='') && this.seo_meta_description.valid )

        this.seo_data.meta_description = data
        this.saveAllData()
        // 
      }
    })
  }

  getURL(){

    this.seo_page_url.statusChanges.pipe(debounceTime(100)).subscribe(res=>{
      if(res==='VALID'){
        let data = this.seo_page_url.value
        
        data = data.replace(/\s+/g, '');
        if(!(data==='')&& this.seo_page_url.valid )

        this.seo_data.url = data
        this.saveAllData()
        // 
      }
    })
  }

  saveAllData(): void{
      
    this.savingData.page_settings = {seo_basics:this.seo_data}
    this.savingData.id = this.id
    // this.savingData['page_settings']['permissions'] = {...this.permission_data }

    // update seo
    this.seo.updateMetaTags(this.savingData)

    // save the page seo data
    this.pageDataService.updatePageData(this.savingData)
  }
}
