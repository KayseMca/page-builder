import { Pipe, PipeTransform } from '@angular/core';
import { PageData } from 'src/app/_interfaces/_page';

@Pipe({
  name: 'searchPage'
})
export class SearchPagePipe implements PipeTransform {

  
  transform(pagesData: PageData[], page:string): unknown {
    page = page ? page.toLocaleLowerCase():''
    return page ? pagesData.filter(data=>{
      data.name.toLocaleLowerCase().includes(page)
    }): pagesData
  }

}
