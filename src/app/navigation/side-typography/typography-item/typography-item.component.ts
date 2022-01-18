import { style } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { PageDataService } from 'src/app/shared/services/page-data-service/page-data.service';
import { PagePropertyServiceService } from 'src/app/shared/services/page-property/page-property-service.service';
import { PageData } from 'src/app/_interfaces/_page';
import { Typograph } from 'src/app/_interfaces/_typograph';

@Component({
  selector: 'app-typography-item',
  templateUrl: './typography-item.component.html',
  styleUrls: ['./typography-item.component.css']
})
export class TypographyItemComponent implements OnInit {

 // @HostBinding('class.preview') preview = 'red '
  _typograph!:Typograph
  @Input() set typograph(value:Typograph){
     this._typograph = value
  }

  checked_weight:Boolean = false
  checked_style:Boolean = false
  get typograph():Typograph{
    
    return this._typograph
  }

  styleForm!:FormGroup
  selected_page:PageData = new PageData()
  all_fonts!:Observable<string[]>
  constructor(
    private pagePropertyService:PagePropertyServiceService,
    private pageData: PageDataService,
    private fb:FormBuilder, 
    ) { 
    this.all_fonts = pagePropertyService.allFonts
    
  }

  
  ngOnInit(): void {
    
    
   this.styleForm = this.fb.group({
     name:new FormControl(this.typograph.style_type),
     font:new FormControl(this.typograph.font),
     size:new FormControl(this.typograph.size),
     style:new FormControl(this.typograph.style),
     weight:new FormControl(this.typograph.weight),
     //font:new FormControl(this.typograph.font)
   }) 
   
   console.log(this.styleForm.value)
  }

  onCheckChange(event:any){
    this.checked_weight = !this.checked_weight
    let value = {weight:"bold"}
    console.log(event.target.value)
    if(this.checked_weight){
      this.styleForm.patchValue(value)
    }else{
      let value = {weight:300}
      this.styleForm.patchValue(value)
    }
    console.log(this.styleForm.get('weight')?.value)
  }

  onCheckStyle(event:any){
    this.checked_style = !this.checked_style
    let value = {style:"italic"}
    console.log(event.target.value)
    console.log(this.styleForm.get('style')?.value)
    console.log("after")
    if(event.target.checked){
      this.styleForm.patchValue(value)
    }else{
      value = {style:"normal"}
      this.styleForm.patchValue(value)
    }
    console.log(event.target.value)
    console.log(this.styleForm.get('style')?.value)
  }
  // fontStyleChange(event:any){
  //   this.styleForm.patchValue({
  //     style:event
  //   })
  //   this.styleFonts
  // }
  get styleFonts(){
    let styles = this.styleForm.value
    //console.log(styles)
    return {
      'font-family':styles.font,
      'font-size':styles.size+'px',
      'font-style':styles.style,
      "font-weight":styles.weight,
      "line-height": 1
    }
  }

  onSubmit(){
    //
  
    if(this.styleForm.value!==''){
      // hold original typography
      let typography = this.typograph
      let style_type = this.typograph.style_type?.toLocaleLowerCase()

      // exist typogaphy value update with the value from Form
      this.typograph = {...typography,...this.styleForm.value}
      this.selected_page.page_styles = {typography:[this.typograph]}
    }
   //this.pageData.updatePageStyle()
   
   this.pageData.updatePageData(this.selected_page)
   //this.selected_page = new PageData()
  //  this.checked_style = false
  //  this.checked_weight = false
  }
}
