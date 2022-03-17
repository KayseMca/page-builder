import { Component,ViewEncapsulation } from '@angular/core';
import { SharedDataService } from '@sognando-casa/shared/data-access';
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
  constructor(private data:ResolverService, private shared:SharedDataService){
    if(this.shared.pub.published){
      this.data.template.subscribe((res:any)=>{
        console.log("### template data from home page of product lib published")
       this.pages = res['content']['pages']
      })
    }else{
      console.log("### template data from home page of product lib not published")
      this.shared.current_template.subscribe(res=>{
        this.pages = res['content']['pages']
      })
    }
  }
  

  toggleNav(){
    this.active = !this.active
  }
}
