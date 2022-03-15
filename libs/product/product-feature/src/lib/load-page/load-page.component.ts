import { Component, ElementRef, HostBinding, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { PageLoadService } from '../page-load.service';

@Component({
  host: {
    //setting multiple values
    'class': 'heading1 heading2 heading3 heading4 p1 p2 p3'
  },
  selector: 'sognando-casa-load-page',
  templateUrl: './load-page.component.html',
  styleUrls: ['./load-page.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
})
export class LoadPageComponent implements OnInit {
  pages!:any
  @ViewChild('tem', { static: true }) template!: ElementRef<any>;
  selected!: any;
  title$!: Observable<string>;
  @HostBinding('style')
  get style(){
    // console.log("herererere")
    let page = this.pages?.page_styles?.typography
    // console.log(this.pages)
    if(page){
      // console.log("hererhe again")
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
        // console.log("styling")
        // console.log(stylesArray)
        return stylesArray
      }

  
  constructor(
    private sanitizer: DomSanitizer,
    private active: ActivatedRoute,
    private service:PageLoadService
  ) {
    
  }

  ngOnInit(): void {
    // this.active.data.subscribe(res=>{
    //   this.selected = res
    // })
    this.active.data.subscribe((res: any) => {
      this.pages = res['data']
    })
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    let tem = this.template['nativeElement'];

    this.active.data.subscribe((res: any) => {
      console.log(res);
      let page = res['data'];
      console.log(page);

      //  tem.innerHTML= res['page_styles']['html']+`<strong>${res.name}</strong> `

      tem.innerHTML = page.page_styles?.html;
      // tem.nativeElement = this.makeSanitize(res.page_styles?.html)
    });
  }
  makeSanitize(str: any) {
    return this.sanitizer.bypassSecurityTrustHtml(str);
  }

}
