import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { PagePropertyServiceService } from 'src/app/shared/services/page-property/page-property-service.service';
import { PageData } from 'src/app/_interfaces/_page';

@Component({
  selector: 'app-advanced-seo',
  templateUrl: './advanced-seo.component.html',
  styleUrls: ['./advanced-seo.component.css']
})
export class AdvancedSeoComponent implements OnInit {

  meta_tags_form!:FormGroup
  items!:FormArray
  selected_page: PageData = new PageData()
  robotsMetaDataList!: any
  pageTags: any = ['Robots Meta Tags', 'Additional Tags']
  panelOpenState: Boolean = false

  tagsSearch: any

  constructor(private pageProperty: PagePropertyServiceService, private _fb:FormBuilder) {
    this.pageProperty.createdPage.subscribe(res => {

      this.selected_page = res.page
      this.robotsMetaDataList = this.selected_page.page_settings.advanced_seo?.robots_meta_tags
      this.tagsSearch = this.selected_page.page_settings.advanced_seo?.additional_tags
      
      // init form with a data
      this.meta_tags_form = this.initMetaDataForm()
     
    })
    

  }

 
  ngOnInit(): void {
    // this.meta_tags_form.setValue(this.robotsMetaDataList)
    this.createItems()
    console.log(this.meta_tags_form.value)
    console.log(this.metaDataTags.controls.values) 
   }


  createItems() {
    let advanced_seo = <FormArray>this.meta_tags_form.controls['advanced_seo'];
    this.robotsMetaDataList.forEach((element:{type:string,value:Boolean}) => {
      advanced_seo.push(this._fb.group({type: element.type, value:element.value}))
    })
  }


  initMetaDataForm(): FormGroup{
    return this._fb.group({
    advanced_seo: new FormArray([]),
    })
  }

  get metaDataTags():FormArray {
    return this.meta_tags_form.controls['advanced_seo'] as FormArray;
 }
 
removeItem() {
  //this.arrayItems.pop();
  //this.demoArray.removeAt(this.demoArray.length - 1);
}
 /*  onCheckChange(res:any){
    let id= 0
    const formArray: FormArray = this.meta_tags_form.get('metaDataTags') as FormArray;

    if (formArray.at(id)) {
      formArray.at(id).patchValue({
        mediaTyp: res[0].mtype,
        land:res[0].land
      });
    } else {
      formArray.push(this._fb.group({
        mediaTyp: res[0].mtype,
        land:res[0].land
      }))
    } */
    
  //}
}
