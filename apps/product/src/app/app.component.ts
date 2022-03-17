import { Component } from '@angular/core';
import { SharedDataService } from '@sognando-casa/shared/data-access';


@Component({
  selector: 'page-builder-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'product';
  
  constructor(private sharedData:SharedDataService){
    this.sharedData.pub.published = true
  }
}
