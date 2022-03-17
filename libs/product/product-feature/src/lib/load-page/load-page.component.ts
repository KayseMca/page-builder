/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { PageData, Typograph } from '@sognando-casa/api-interfaces';
import { SharedDataService } from '@sognando-casa/shared/data-access';

@Component({
  selector: 'sognando-casa-load-page',
  templateUrl: './load-page.component.html',
  styleUrls: ['./load-page.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
})
export class LoadPageComponent implements OnInit {
 
  
  
  @ViewChild('tem', { static: true }) template!: ElementRef<HTMLElement>;
  selected_page!: PageData;
  title$!: Observable<string>;

  @HostBinding('style')
  get style(){
    // console.log("herererere")
    const page = this.selected_page?.page_styles?.typography
    // console.log(this.pages)
    if(page){
      // console.log("hererhe again")
      page?.map((typo:Typograph)=>{
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




    /**
     * for every page setting its styles that recently added from page-builder or from api
     * @param typo 
     * @param title 
     * @returns 
     */
  setCssVariableValue(typo:any,title:string){
        const stylesArray:any = {}
        const style = ['size','font','style','color']
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
        // console.log("styling")
        // console.log(stylesArray)
        return stylesArray
      }

  
  constructor(
    private sanitizer: DomSanitizer,
    private active: ActivatedRoute,
    private service:SharedDataService,
    private render:Renderer2
  ) {
    this.service.current_page.subscribe((res:PageData)=>{
      this.selected_page = res
  
    })
  }

  ngOnInit(): void {
   // set this page a seo data
   console.log("loading this page")
   const tem = this.template['nativeElement'];
  this.render.setProperty(tem,'innerHTML', this.selected_page.page_styles?.html)
   
  }

  makeSanitize(str: string) {
    return this.sanitizer.bypassSecurityTrustHtml(str);
  }

}
