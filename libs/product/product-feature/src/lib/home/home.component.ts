import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedDataService } from '@sognando-casa/shared/data-access';

@Component({
  selector: 'sognando-casa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class HomeComponent  {
  pages!:any
  active = false
  constructor(private data:SharedDataService){
   this.data.getTemplates().subscribe((res:any)=>{
     console.log(res)
    this.pages = res['content']['pages']
   })
  }
  

  toggleNav(){
    this.active = !this.active
  }
}
