import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { PageDataService } from 'src/app/shared/services/page-data-service/page-data.service';
import { PageData } from 'src/app/_interfaces/_page';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  pages!:PageData[]
  constructor(private pageData:PageDataService) { }

  ngOnInit(): void {
    this.pageData.allPagesData.pipe(take(1)).subscribe(res=>{
      console.log("inside nav")
      console.log(res)
      this.pages = res
    })
  }

}