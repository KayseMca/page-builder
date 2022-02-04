import { Injectable } from '@angular/core';
import {Title, Meta } from '@angular/platform-browser';
import { PageData } from 'src/app/_interfaces/_page';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title:Title, private meta: Meta) { }

  configSeo = {
    title:"page builder"
    // title:this.getTag('twitter:title') ? this.getTag('twitter:title'): 'page Builder',
    // description:this.getTag('twitter:description') ? this.getTag('twitter:descriğtion'): 'page Builder' 
  }
  addTitle(title:string|undefined){
    let newtitle = title? title: this.configSeo.title
    this.title.setTitle(newtitle)
  }


  addMetaTags(pageData:PageData){
    
    const seo = {...pageData?.page_settings?.seo_basics}
    const robots =pageData?.page_settings?.advanced_seo?.robots_meta_tags
    const social = {...pageData?.page_settings?.social_share}

    //robots
    let all_robots = this.checkRobots(robots)
    
    // for titles
    const title = seo.page_title
    // add title
    this.addTitle(seo.page_title)

    // const twitter_title = social.og_title ? social.og_title: this.configSeo.title

    // descriptions
    const description = seo.meta_description? seo.meta_description: this.getTag('description')
    // const twitter_description = social.og_description? social.og_description: this.getTag('twitter:description')
    

    //url
    const url = seo.url? seo.url: ''
    // const twitter_url = social.url? social.url: this.getTag('twitter:url')
    // social

    // add tags
    const tags = [ 
      {name:'description', content:description},
      
      // {name:'twitter:description', content:twitter_description},
      // {name:'twitter:title', content:twitter_title},
      {name:'twitter:card', content:"summary"},
      {name:'robots', content:all_robots},
      {name:'og:description', content:description},
      {name:'og:title', content:this.tags(title)},
     ]
    
    
     // add all tags to the metaservice

     tags.forEach(tag=>this.meta.updateTag(tag))
  }


  // get tag

  getTag(tagName:string){
    let tag = this.meta.getTag(`name= ${tagName}`)?.content
    return tag?tag:''
  }
  // remove undefined
  tags(tag:string|undefined):string{
    let newTag = tag ? tag : ''

    return newTag
  }

  updateMetaTags(pageData:PageData){
    
    let seo = {...pageData?.page_settings?.seo_basics}
    let robots =pageData.page_settings?.advanced_seo?.robots_meta_tags
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
