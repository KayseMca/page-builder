import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageDataService } from '../shared/services/page-data-service/page-data.service';

import { PageData } from '../_interfaces/_page';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit, OnDestroy {

  subscribtion!:Subscription
  data!:PageData[] 
  constructor(private dataService:PageDataService) { 
    
  }

  ngOnInit(): void {
    


  }




  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subscribtion){
      this.subscribtion.unsubscribe()
    }
    
  }
}
