import { Component, HostBinding, OnInit } from '@angular/core';
import { ColorEvent } from 'ngx-color';
import { Observable, of, take } from 'rxjs';
import { PageDataService } from 'src/app/shared/services/page-data-service/page-data.service';

import { PagePropertyServiceService } from 'src/app/shared/services/page-property/page-property-service.service';
import { PageData } from 'src/app/_interfaces/_page';
import { Typograph } from 'src/app/_interfaces/_typograph';

@Component({
  selector: 'app-side-typography',
  templateUrl: './side-typography.component.html',
  styleUrls: ['./side-typography.component.css']
})
export class SideTypographyComponent implements OnInit {
 
  color:string = "#ffffff"
  primaryColor = '#194D33';
  state = {
    h: 150,
    s: 0.50,
    l: 0.20,
    a: 1,
  };

  toggleList:{[key:string]:boolean}  = {'typo':false, 'color':true}

  typograp_list!:Observable<Typograph[]>

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

      // get all typographs
      this.typograp_list = pagePropertyService.typographList;
      
      // get all font list
      
   }

  ngOnInit(): void {

    console.log("in side typo")
    console.log(this.page_selected)
  }

  toggletypography(event:string){
    if(event==='color'){
      this.toggleList['typo'] = false
      this.toggleList['color']=true
    } else{
      this.toggleList['color']=false
      this.toggleList['typo'] = true
    }
  }

  handleChange(event:ColorEvent){
    //this.page_selected.page_styles = this.saving_page_data.page_styles = {background_color:this.color}
    this.color = event.color.hex
    // update both selected page and the whole data
    // this.pagePropertyService.singlePageChoose(this.page_selected)
    // this.pageDataService.updatePageData(this.page_selected)
  }
}
