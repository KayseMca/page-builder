import { isPlatformBrowser } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { PageDataService } from './page-data.service';


@Component({
  selector: 'page-builder-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'product';
  page!:any
  @HostBinding('style')
  get style(){
    let page = this.page?.page_styles?.typography
    if(page){
      page?.map((typo:any)=>{
            let current;
            
            if(typo.name==='heading1'){
              this.setCssVariableValue(typo,'heading1')
            }else if(typo.name==='heading2'){
              this.setCssVariableValue(typo,'heading2')
            }else if(typo.name==='heading3'){
              this.setCssVariableValue(typo,'heading3')
            }else  if(typo.name==='heading4'){
              this.setCssVariableValue(typo,'heading4')
            }else  if(typo.name==='heading5'){
              this.setCssVariableValue(typo,'heading5')
            }else  if(typo.name==='heading6'){
              this.setCssVariableValue(typo,'heading6')
            }else  if(typo.name==='p1'){
              this.setCssVariableValue(typo,'p1')
            }else  if(typo.name==='p2'){
              this.setCssVariableValue(typo,'p2')
            }else  if(typo.name==='p3'){
              this.setCssVariableValue(typo,'p3')
            }
          }) 
          return 
        }
    }

      constructor(private service:PageDataService){
        this.service.page.subscribe(res=>{
          this.page = res
        })
      }

  setCssVariableValue(typo:any,title:any){
        let stylesArray:any = {}
        let style = ['size','font','style','color']
        let current:string
    
        for (let index = 0; index < style.length; index++) {
          let value = `${typo[`${style[index]}`]}`
          current = `--${title}-${style[index]}`
        value = `${typo[`${style[index]}`]}`
          if(current.includes('size')) value = value+'px'
          stylesArray[current] = value
          // if (isPlatformBrowser(this.platformId)) {
            // Client only code.
            document.documentElement.style.setProperty(current,value)
            // 
        //  }
          // set the typography to the document
          
        }
        console.log(stylesArray)
        return stylesArray
      }
}
