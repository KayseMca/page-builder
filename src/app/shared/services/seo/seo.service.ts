import { Injectable } from '@angular/core';
import {Title, Meta } from '@angular/platform-browser';
import { PageData } from 'src/app/_interfaces/_page';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title:Title, private meta: Meta) { }

  addTitle(title:string|undefined){
    let newtitle = title? title: ''
    this.title.setTitle(newtitle)
  }

  // this.metaTagService.addTags([
  //   { name: 'keywords', content: 'Angular SEO Integration, Music CRUD, Angular Universal' },
  //   { name: 'robots', content: 'index, follow' },
  //   { name: 'author', content: 'Digamber Singh' },
  //   { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //   { name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD' },
  //   { charset: 'UTF-8' }
  // ]);

  addMetaTags(pageData:PageData){
    
    let seo = {...pageData.page_settings.seo_basics}
    let robots =pageData.page_settings.advanced_seo?.robots_meta_tags
    let updaterobots = this.checkRobots(robots)
    // for seo
    this.addTitle(seo.page_title)
    let tags = {name:'description', content:this.tags(seo.meta_description)}
    let robotTags = {name:'robots', content:this.tags(updaterobots)}

    //url

    // social

    // add tags
    console.group(tags, robotTags)
    this.meta.addTags([tags, robotTags])
    
    
  }


  // remove undefined
  tags(tag:string|undefined):string{
    let newTag = tag ? tag : ''

    return newTag
  }

  updateMetaTags(pageData:PageData){
    
    let seo = {...pageData.page_settings.seo_basics}
    let robots =pageData.page_settings.advanced_seo?.robots_meta_tags
    let updaterobots = this.checkRobots(robots)
    // for seo
    this.addTitle(seo.page_title)
    let tags = {name:'description', content:this.tags(seo.meta_description)}
    let robotTags = {name:'robots', content:this.tags(updaterobots)}

    //url

    // social
    
    // add tags
    this.meta.updateTag(tags)
    this.meta.updateTag(robotTags)
    
  }


  // the values in true add to meta
  checkRobots(robot:any[]|undefined){
    let indexs:any[] = []
    let robots = robot?.map((robotIndex:any)=>{
      if(robotIndex['value']) indexs.push(robotIndex)
    })
    return indexs.join(',')
  }
}
