import { style } from '@angular/animations';
import { Component, ElementRef, HostBinding, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
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

  font_color_picker:Boolean = false
  // @HostListener('window:click', ['$event'])
  // onMouseUp(event: any) {
  //   if (!this.eref.nativeElement.contains(event.target)) {
  //     
  //     this.font_color_picker = false

  //   }
  // }
 // @HostBinding('class.preview') preview = 'red '
  _typograph!:Typograph
  @Input() set typograph(value:Typograph){
    
     this._typograph = value
  }

  checked_weight!:Boolean
  checked_style!:Boolean
  get typograph():Typograph{
    //
    return this._typograph
  }

  styleForm!:FormGroup
  selected_page:PageData = new PageData()
  all_fonts!:Observable<string[]>
  constructor(
    private pagePropertyService:PagePropertyServiceService,
    private pageData: PageDataService,
    private fb:FormBuilder, 
    private eref:ElementRef
    ) { 
      
    this.all_fonts = pagePropertyService.allFonts
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    //
    let change = changes['typograph'].currentValue
    if(change){
      this.checked_style =change.style ==='normal' ? false:true
      this.checked_weight =change.weight ==='bold' ? true:false
      
      
    }
  }
  ngOnInit(): void {
    
    console.log(this.typograph)
   this.styleForm = this.fb.group({
     style_type:new FormControl(this.typograph.style_type),
     font:new FormControl(this.typograph.font),
     size:new FormControl(this.typograph.size || 0),
     color:new FormControl(this.typograph.color),
     style:new FormControl(this.typograph.style),
     weight:new FormControl(this.typograph.weight),
     //font:new FormControl(this.typograph.font)
   }) 
   
   
  }

  onCheckChange(event:any){
    //const isChecked = (<HTMLInputElement>event.target).checked;
    
    this.checked_weight = !this.checked_weight
    let value = {weight:"bold"}
    
    if(this.checked_weight){
      this.styleForm.patchValue(value)
    }else{
      let value = {weight:300}
      this.styleForm.patchValue(value)
    }
    
  }

  onCheckStyle(event:any){
    
    this.checked_style = !this.checked_style
    let value = {style:"italic"}
    
    
    
    if(event.target.checked){
      this.styleForm.patchValue(value)
    }else{
      value = {style:"normal"}
      this.styleForm.patchValue(value)
    }
    
    
  }
  // fontStyleChange(event:any){
  //   this.styleForm.patchValue({
  //     style:event
  //   })
  //   this.styleFonts
  // }
  get styleFonts(){
    let styles = this.styleForm.value
    //
    return {
      'font-family':styles.font,
      'font-size':styles.size+'px',
      'font-style':styles.style,
      "font-weight":styles.weight,
      "color":styles.color,
      "line-height": 1
    }
    console.log(styles)
  }

  //font color picker
  handleChange(event:any){
    let color = event.color.hex
    this.styleForm.patchValue({
      color:color
    })
  }

  onSubmit(){
    //
  
    if(this.styleForm.value!==''){
      // hold original typography
      let typography = this.typograph
      let style_type = this.typograph.style_type?.toLocaleLowerCase()
      // let size = this.styleForm.get('size')?.value+'px'
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
