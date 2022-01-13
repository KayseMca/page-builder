import { Component, OnInit } from '@angular/core';
import { ColorEvent } from 'ngx-color';
import { take } from 'rxjs';
import { PageDataService } from 'src/app/shared/services/page-data-service/page-data.service';

import { PagePropertyServiceService } from 'src/app/shared/services/page-property/page-property-service.service';
import { PageData } from 'src/app/_interfaces/_page';

@Component({
  selector: 'app-side-typography',
  templateUrl: './side-typography.component.html',
  styleUrls: ['./side-typography.component.css']
})
export class SideTypographyComponent implements OnInit {

  color!:string
  primaryColor = '#194D33';
  state = {
    h: 150,
    s: 0.50,
    l: 0.20,
    a: 1,
  };

  toggleList:{[key:string]:boolean}  = {'typo':false, 'color':true}

  list = [1,3]
  page_data!:PageData
  page_selected:PageData = new PageData()
  saving_page_data:PageData = new PageData()

  
  constructor(
    private pagePropertyService:PagePropertyServiceService,
    private pageDataService:PageDataService
    ) {
      pagePropertyService.selectedPage.pipe(take(1)).subscribe(res=>{
        this.saving_page_data.id = res.page.id
        this.page_selected = res.page
      })
   }

  ngOnInit(): void {

    console.log("in side typo")
    console.log(this.page_selected)
  }

  toggleDesign(event:string){
    if(event==='color'){
      this.toggleList['typo'] = false
      this.toggleList['color']=true
    } else{
      this.toggleList['color']=false
      this.toggleList['typo'] = true
    }
  }

  handleChange(event:ColorEvent){
    this.color = event.color.hex
    this.page_selected.page_styles = this.saving_page_data.page_styles = {background_color:this.color}

    // update both selected page and the whole data
    this.pagePropertyService.singlePageChoose(this.page_selected)
    this.pageDataService.updatePageData(this.page_selected)
  }
}
