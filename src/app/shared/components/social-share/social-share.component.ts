import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { AdditionalSEO, PageData, SocialShare } from 'src/app/_interfaces/_page';
import { PageDataService } from '../../services/page-data-service/page-data.service';
import { PagePropertyServiceService } from '../../services/page-property/page-property-service.service';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.css']
})
export class SocialShareComponent implements OnInit {

  social_page_title!:FormControl
  social_meta_description!:FormControl

  social_share_data:SocialShare = new SocialShare()
  savingData:PageData = new PageData()
  id!:number

  constructor(
    private pageDataService: PageDataService,
    private pageProperty:PagePropertyServiceService
    ) {

      this.pageProperty.createdPage.subscribe(res=>{
        this.id = res.page.id
      })
    this.social_page_title = new FormControl('')
    this.social_meta_description = new FormControl('')
   }

  ngOnInit(): void {
    this.getTitledata()
    this.getDescriptionData()
  }

  getTitledata(){
    this.social_page_title.statusChanges.pipe(debounceTime(200)).subscribe(res=>{
      if(res==='VALID'){
        let data = this.social_page_title.value
        if(!(data==='') )
        this.social_share_data.og_title = data
        this.saveAllData()
        // console.log(this.seo_data)
      }
    })
  }

  getDescriptionData(){
    this.social_meta_description.statusChanges.pipe(debounceTime(200)).subscribe(res=>{
      if(res==='VALID'){
        let data = this.social_meta_description.value
        if(!(data==='')  )

        this.social_share_data.og_description = data
        this.saveAllData()
        // console.log(this.seo_data)
      }
    })
  }

  saveAllData(): void{
      
    this.savingData.page_settings = {social_share:this.social_share_data}
    this.savingData.id = this.id
    // this.savingData['page_settings']['permissions'] = {...this.permission_data }
    this.pageDataService.updatePageData(this.savingData)
  }
}
