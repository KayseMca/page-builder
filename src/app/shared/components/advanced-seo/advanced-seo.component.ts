import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advanced-seo',
  templateUrl: './advanced-seo.component.html',
  styleUrls: ['./advanced-seo.component.css']
})
export class AdvancedSeoComponent implements OnInit {

  robotsMetaDataList:any = ['noindex','nofollow','nosnippet','noarchive','noimageindex','max-image-preivew']
  pageTags:any = ['Robots Meta Tags','Additional Tags']
  panelOpenState:Boolean = false
  constructor() { }

  ngOnInit(): void {
  }

}
