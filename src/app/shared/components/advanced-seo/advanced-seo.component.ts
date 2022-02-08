import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PagePropertyServiceService } from 'src/app/shared/services/page-property/page-property-service.service';
import { PageData } from 'src/app/_interfaces/_page';
import { PageDataService } from '../../services/page-data-service/page-data.service';


@Component({
  selector: 'app-advanced-seo',
  templateUrl: './advanced-seo.component.html',
  styleUrls: ['./advanced-seo.component.css']
})
export class AdvancedSeoComponent implements OnInit, OnDestroy {

  subscriptions:Subscription = new Subscription()
  meta_tags_form!:FormGroup
  saving_data:PageData = new PageData()
  selected_page: PageData = new PageData()
  robotsMetaDataList!: any
  pageTags: any = ['Robots Meta Tags', 'Additional Tags']
  panelOpenState: Boolean = false

  tagsSearch: any

  constructor(
    private pageProperty: PagePropertyServiceService, 
    private _fb:FormBuilder,
    private pageData:PageDataService,
    ) {
    this.subscriptions.add(this.pageProperty.selectedPage.subscribe(res => {

      this.selected_page = res.page
      this.robotsMetaDataList = this.selected_page?.page_settings?.advanced_seo?.robots_meta_tags
      this.tagsSearch = this.selected_page?.page_settings?.advanced_seo?.additional_tags
      
      // init form with a data
      this.meta_tags_form = this.initMetaDataForm()
     
    })
    )

  }

 
  ngOnInit(): void {
    // this.meta_tags_form.setValue(this.robotsMetaDataList)
    this.createItems()

   }


   // initiliaze data of page
  createItems() {
    let advanced_seo = <FormArray>this.meta_tags_form.controls['advanced_seo'];
    this.robotsMetaDataList.forEach((element:{type:string,value:Boolean}) => {
      advanced_seo.push(this._fb.group({type: element.type, value:element.value}))
    })
  }


  // initiliaze the Robots meta tags data
  initMetaDataForm(): FormGroup{
    return this._fb.group({
    advanced_seo: new FormArray([]),
    })
  }


  // get the form array 
  get metaDataTags():FormArray {
    return this.meta_tags_form.controls['advanced_seo'] as FormArray;
 }
 

 
onChanges(i:number){
  let id = this.selected_page.id
  let changeIndex = this.metaDataTags.at(i).value

  // initiliaze the data of page the change and save
  let advanced_data_update = this.selected_page.page_settings?.advanced_seo?.robots_meta_tags ?? []

  // get the index of element checked
  let index = advanced_data_update?.findIndex((res:any)=>res?.['type']===changeIndex.type)
  
  //change the value
  if(index)  advanced_data_update[index] = changeIndex
  // 

  //saving the updated data
  // this.saving_data.page_settings  = {}
  this.saving_data.page_settings = {advanced_seo:{robots_meta_tags:[...advanced_data_update]}}
  this.saving_data.id = id


  // update page seo
  // this.seo.updateMetaTags(this.saving_data)

  //save page seo in the server
  this.pageData.updatePageData(this.saving_data)
}

ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  if(this.subscriptions) this.subscriptions.unsubscribe()
}

}
