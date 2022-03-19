import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TemplateApi } from '@sognando-casa/api-interfaces';
import { SharedDataService } from '@sognando-casa/shared/data-access';

import {  map, Observable } from 'rxjs';


export class PagesData extends TemplateApi{}
@Injectable({
  providedIn: 'root'
})
export class ResolverService {

  template!:Observable<undefined|PagesData>
  constructor(private page: SharedDataService) {
    // for this product render first the template from the backend
    console.log("resolve construtor")
    
}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const r = route.paramMap.get('page');
    
    return this.getTemplate().pipe(
      map((res: any) => {
        const r = route.paramMap.get('page');
        const all: any[] = res['content']['pages'];
        // ''
        const findPage = all.find((page) => page['page_url'] === r);
        ''
        this.page.setSelectedPage(findPage);
        return findPage;
      })
    );
    // return this.page.getPage(r)
  }

  getTemplate(){
    console.log("Get template#########")
    let template:Observable<TemplateApi|undefined>;
    if(this.page.pub.published){
      template= this.page.getTemplate('1')
     }else{
       console.log("### resolve for not published")
       template = this.page.updateTemplateData()
   }
   return template
  }
}
