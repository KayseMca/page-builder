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

  tagsSearch:any = [
    {name:'Canonical', value:'https://www.mywebsite.com'},
    {name:'og:site_name', value:'mywebsite'},
    {name:'og:type', value:'website'},
    {name:'og:url', value:'https://www.mywebsite.com'}
  ]
  ngOnInit(): void {
  }

}
