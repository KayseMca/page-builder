import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  selected_page:PageData = new PageData()
  social_page_title!:FormControl
  social_meta_description!:FormControl
  social_url!:FormControl

  social_share_data:SocialShare = new SocialShare()
  savingData:PageData = new PageData()
  id!:number

  constructor(
    private pageDataService: PageDataService,
    private pageProperty:PagePropertyServiceService
    ) {

      this.pageProperty.selectedPage.subscribe(res=>{
        this.selected_page  = res.page
        this.id = res.page.id
      })
    this.social_page_title = new FormControl('', Validators.maxLength(200))
    this.social_meta_description = new FormControl('', Validators.maxLength(500))
    this.social_url = new FormControl('', Validators.maxLength(20))
   }

  ngOnInit(): void {
    this.getTitledata()
    this.getDescriptionData()
    
    this.getURL()
  }

  getTitledata(){
    this.social_page_title.statusChanges.pipe(debounceTime(100)).subscribe(res=>{
      if(res==='VALID'){
        let data = this.social_page_title.value
        if(!(data==='') && this.social_page_title.valid)
        this.social_share_data.og_title = data
        this.saveAllData()
        // 
      }
    })
  }

  getDescriptionData(){
    this.social_meta_description.statusChanges.pipe(debounceTime(100)).subscribe(res=>{
      if(res==='VALID'){
        let data = this.social_meta_description.value
        if(!(data==='') &&this.social_meta_description.valid )

        this.social_share_data.og_description = data
        this.saveAllData()
        // 
      }
    })
  }

  getURL(){

    this.social_url.statusChanges.pipe(debounceTime(100)).subscribe(res=>{
      if(res==='VALID'){
        let data = this.social_url.value
        data = data.replace(/\s+/g, '');
        if(!(data==='') && this.social_url.valid)

        this.social_share_data.url = data
        this.saveAllData()
        // 
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
