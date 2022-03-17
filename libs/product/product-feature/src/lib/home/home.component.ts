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

  /**
   * this is for to check if data we using is the one of this product application that means it's published or 
   * the one we editing inside page-builder to not overwrite the server data, of this published product application 
   * @param data => this is the service of this library
   * @param shared  => this global service that comes from data-access library
   */
  constructor(private data:ResolverService, private shared:SharedDataService){
    if(this.shared.pub.published){
      this.data.template.subscribe((res:any)=>{
        console.log("### template data from home page of product lib published")
       this.pages = res['content']['pages']
      })
    }else{
      console.log("### template data from home page of product inside page-builder using this lib and yet not published")
      this.shared.current_template.subscribe(res=>{
        this.pages = res['content']['pages']
      })
    }
  }
  

  toggleNav(){
    this.active = !this.active
  }
}
