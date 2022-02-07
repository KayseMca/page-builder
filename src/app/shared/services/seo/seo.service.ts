import { Injectable } from '@angular/core';
import {Title, Meta } from '@angular/platform-browser';
import { PageData } from 'src/app/_interfaces/_page';

const defaultMetadata = {
  title: 'PageBuilder',
  description: 'Page Builder description',
  author: 'Sognando Casa',
  keywords: ['Angular', 'meta tags', 'Angular Universal'],
  type: 'website',
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title:Title, private meta: Meta) { }


  getTitle(){
    return this.meta.getTag('name=title')
  }
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


  /**
   * * update page robots data
   * @param robots 
   */
  updateRobots(robots:string[]){
    let robots_data = this.checkRobots(robots)
    this.meta.updateTag({name:'robots', content:robots_data})
  }

  updateDescription(description:string){
    this.meta.updateTag({name:'description', content:description})
  }

  updateSocialTags(page:PageData){
    let page_social = page.page_settings.social_share
    let page_meta = {
      description:page_social?.og_description,
      title:page_social?.og_title,
      url:`${page.base_url}${page_social?.url}`
    }
    console.log(page_meta)

    this.meta.updateTag({ property: 'og:title', content: this.tags(page_meta.title) })
    this.meta.updateTag({ property: 'og:description', content: this.tags(page_meta.description ) })
    this.meta.updateTag( { property: 'og:url', content: this.tags(page_meta.url)})
    
  }

  // , index: boolean = true

  addMetaTags(pageData:PageData){
    
    let seo = {...pageData.page_settings?.seo_basics}
    let robots =pageData.page_settings?.advanced_seo?.robots_meta_tags
    let updaterobots = this.checkRobots(robots)
    // for seo
    this.addTitle(seo.page_title)
    let desc = seo.meta_description
    let robotTags = {name:'robots', content:this.tags(updaterobots)}

    //url

    // social

    // add tags
    this.updateDescription(this.tags(desc))
    this.meta.addTag(robotTags)
    
  }


  // remove undefined
  tags(tag:string|undefined):string{
    let newTag = tag ? tag : ''

    return newTag
  }

  updateMetaTags(pageData:PageData){
    
    let seo = {...pageData.page_settings?.seo_basics}
    let robots =pageData.page_settings?.advanced_seo?.robots_meta_tags
    let updaterobots = this.checkRobots(robots)
    // for seo
    this.addTitle(seo.page_title)
    let tags = {name:'description', content:this.tags(seo.meta_description)}
    let robotTags = {name:'robots', content:this.tags(updaterobots)}

    // let page_seo = page.page_settings.seo_basics
    // let page_meta = {
    //   description:page_seo?.meta_description,
    //   title:page_seo?.page_title,
    //   url:`${page.base_url}${page.page_url}`
    // }

    // let generate_meta  = this.generateMetaDefinitions(page_meta)
    // this.meta.addTag([
    //   ...generate_meta,
    //   // { property: 'og:url', content: `${this.hostUrl}${this.router.url}`},
    //   // { name: 'robots', content: index ? 'index, follow' : 'noindex' },
    //   { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    //   { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
    //  ]);
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
    console.log(indexs)
    return indexs.join(',')
  }


  private generateMetaDefinitions(metadata:any):any[] {
    return [
      { name: 'title', content: metadata.title },
      { property: 'og:title', content: metadata.title },
      { property: 'og:url', content: metadata.url },
      { name: 'description', content: metadata.description },
      { property: 'og:description', content: metadata.description },

      { name: 'author', content: defaultMetadata.author },
      { property: 'og:author', content: defaultMetadata.author },

      { name: 'keywords', content: defaultMetadata.keywords.join(', ') },

      { property: 'og:type', content: defaultMetadata.type },
    ];
  }
}
