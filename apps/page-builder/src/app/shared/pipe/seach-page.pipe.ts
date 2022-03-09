import { Pipe, PipeTransform } from '@angular/core';
import { PageData } from '@sognando-casa/api-interfaces';

@Pipe({
  name: 'searchPage'
})
export class SearchPagePipe implements PipeTransform {

  
  transform(pagesData: PageData[], page:string) {
    // return either nor value pagesData or nor pagesData to null
    if(!pagesData) return null
    if(!page) return pagesData
    // return if value exists the pagesdata name
    return pagesData.filter(data=>data.name.toLocaleLowerCase().includes(page.toLocaleLowerCase()))
  }

}
