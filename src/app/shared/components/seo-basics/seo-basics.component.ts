import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription, switchMap } from 'rxjs';
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

  subscriptions:Subscription = new Subscription()
  // private destroy$ = new Subject();
  // private variable to hold all your subscriptions for the component
// private subscriptions!: Subscription
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

      this.subscriptions.add(this.pageProperty.selectedPage.subscribe(res=>{
        this.id = res.page.id
        this.selected_page = res.page
      }))
      let selected = this.selected_page.page_settings.seo_basics
    this.seo_page_title = new FormControl(selected?.page_title,Validators.maxLength(200))
    this.seo_meta_description = new FormControl(selected?.meta_description,Validators.maxLength(500))
    this.seo_page_url = new FormControl(selected?.url,Validators.maxLength(20))
   }

  ngOnInit(): void {
    this.getTitledata()
    this.getDescriptionData()
    this.getURL()

    // initiliaze value to avoid overwriting undefined value
    this.seo_data = {
      meta_description:this.selected_page.page_settings.seo_basics?.meta_description,
      page_title:this.selected_page.page_settings.seo_basics?.page_title,
      url:this.selected_page.page_url,
    }
  }

  getTitledata(){
    this.subscriptions.add(this.seo_page_title.statusChanges.pipe(debounceTime(200)).subscribe(res=>{
      if(res==='VALID'){
        let data = this.seo_page_title.value
        
        if(!(data==='') && this.seo_page_title.valid)
        this.seo_data.page_title = data
        this.seo.addTitle(data)
        this.saveAllData()
        // 
      }
    }))
  }

  getDescriptionData(){
    this.subscriptions.add(this.seo_meta_description.statusChanges.pipe(debounceTime(200)).pipe(
      debounceTime(200)
    ).subscribe(res=>{
      if(res==='VALID'){
        let data = this.seo_meta_description.value
        if(!(data==='') && this.seo_meta_description.valid )

        this.seo_data.meta_description = data
        this.saveAllData()
        // 
      }
    }))
  }

  getURL(){

    this.subscriptions.add(this.seo_page_url.statusChanges.pipe(
      // debounceTime(100),
      // switchMap(value => value),   
      // distinctUntilChanged()
      ).subscribe((res:any)=>{
      if(res==='VALID'){
        let data = this.seo_page_url.value
        
        data = data.replace(/\s+/g, '');
        if(!(data==='')&& this.seo_page_url.valid )

        this.seo_data.url = data
        this.saveAllData()
        // 
      }
    }))
  }

  saveAllData(): void{


    this.savingData.page_settings = {
      
      seo_basics:this.seo_data
    }
    this.savingData.id = this.id
    // this.savingData['page_settings']['permissions'] = {...this.permission_data }

    // update seo
    console.log("seo adding")
    console.log(this.savingData)
    this.seo.addMetaTags(this.savingData)

    // save the page seo data
    this.pageDataService.updatePageData(this.savingData)
  }

  ngOnDestroy(){
    // this.destroy$.next();
    // this.destroy$.complete(); 
    if (this.subscriptions) {
      this.subscriptions.unsubscribe()
  }
  }
}
