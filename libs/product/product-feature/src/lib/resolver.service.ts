import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TemplateApi, publish } from '@sognando-casa/api-interfaces';
import { SharedDataService } from '@sognando-casa/shared/data-access';

import { map, Observable, of, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResolverService {

  template!:Observable<TemplateApi>
  constructor(private page: SharedDataService) {
    // for this product render first the template from the backend
    
    if(this.page.pub.published){
      // console.log("## from reseolve of product")
      // console.log(this.page.pub.published)
     this.template  = this.page.getTemplate('1')
    }else{
      // console.log("## from reseolve of product and not published")
      // console.log(this.page.pub.published)
      this.template = this.page.current_template
  }
}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const r = route.paramMap.get('page');
    return this.template.pipe(
      map((res: any) => {
        console.log('in resolve');
        // console.log(res)
        const r = route.paramMap.get('page');
        console.log('the ulr', r);
        const all: any[] = res['content']['pages'];
        // console.log(all)
        const findPage = all.find((page) => page['page_url'] === r);
        // console.log(findPage)
        this.page.setSelectedPage(findPage);
        return findPage;
      })
    );
    // return this.page.getPage(r)
  }
}
