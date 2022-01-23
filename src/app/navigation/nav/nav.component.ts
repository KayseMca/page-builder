import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageDataService } from 'src/app/shared/services/page-data-service/page-data.service';
import { PageData } from 'src/app/_interfaces/_page';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  // @ViewChild("toggle") toggle!:ElementRef
  active:Boolean = false
  pages!:PageData[]
  isCollapsed:Boolean = false
  constructor(private pageData:PageDataService) { }

  ngOnInit(): void {
    this.pageData.allPagesData.subscribe(res=>{
      this.pages = res
    })

    
  }

  toggleNav(){
    this.active = !this.active
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // console.log(this.navToggle)
  }
}
