import { Component, OnInit } from '@angular/core';
import { PageDataService } from '../shared/services/page-data-service/page-data.service';
import { PageData } from '../_interfaces/_page';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  data!:PageData[] 
  constructor(private dataService:PageDataService) { }

  ngOnInit(): void {
    this.dataService.allPagesData.subscribe(res=>{
      this.data = res
    })
  }

}
