import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SharedDataService } from '@sognando-casa/shared/data-access';

import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResolverService {

  constructor(private page: SharedDataService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const r = route.paramMap.get('page');
    return this.page.getTemplates().pipe(
      map((res: any) => {
        console.log('in resolve');
        // console.log(res)
        const r = route.paramMap.get('page');
        console.log('the ulr', r);
        const all: any[] = res['content']['pages'];
        // console.log(all)
        const findPage = all.find((page) => page['page_url'] === r);
        this.page.setSelectedPage(findPage);
        return findPage;
      })
    );
    // return this.page.getPage(r)
  }
}
