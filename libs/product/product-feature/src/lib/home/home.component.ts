import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { PageLoadService } from '../page-load.service';

@Component({
  selector: 'sognando-casa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class HomeComponent  {
  pages!:any
  constructor(private data:PageLoadService){
   this.data.getTemplates().subscribe((res:any)=>{
     console.log(res)
    this.pages = res['content']['pages']
   })
  }
  
}
