import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { PageDataService } from './page-data.service';

@Injectable({
  providedIn: 'root',
})
export class ResolveService implements Resolve<any> {
  constructor(private page: PageDataService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let r = route.paramMap.get('page');
    return this.page.getPages().pipe(
      map((res: any) => {
        console.log('in resolve');
        // console.log(res)
        let r = route.paramMap.get('page');
        console.log('the ulr', r);
        let all: any[] = res[0]['content']['pages'];
        // console.log(all)
        let findPage = all.find((page) => page['page_url'] === r);
        this.page.selectedPage(findPage);
        return findPage;
      })
    );
    // return this.page.getPage(r)
  }
}
