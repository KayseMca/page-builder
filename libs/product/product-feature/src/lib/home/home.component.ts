import { Component,ViewEncapsulation } from '@angular/core';
import { ResolverService } from '../resolver.service';

@Component({
  selector: 'sognando-casa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class HomeComponent  {
  pages!:any
  active = false
  constructor(private data:ResolverService){
   this.data.template.subscribe((res:any)=>{
     console.log("### template data from home page of product lib")
    this.pages = res['content']['pages']
   })
  }
  

  toggleNav(){
    this.active = !this.active
  }
}
