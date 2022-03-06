import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageDataService } from 'apps/page-builder/src/app/shared/services/page-data-service/page-data.service';
import { PageData } from 'apps/page-builder/src/app/_interfaces/_page';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  subscriptions:Subscription = new Subscription()
  // @ViewChild("toggle") toggle!:ElementRef
  active:Boolean = false
  pages!:PageData[]
  isCollapsed:Boolean = false
  constructor(private pageData:PageDataService) { }

  ngOnInit(): void {
   this.subscriptions.add(this.pageData.allPagesData.subscribe(res=>{
      this.pages = res
    })
   )

    
  }

  toggleNav(){
    this.active = !this.active
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subscriptions) this.subscriptions.unsubscribe()
  }
}
