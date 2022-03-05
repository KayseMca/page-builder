import { Directive, ElementRef, EventEmitter, NgZone, Output, Renderer2 } from '@angular/core';

import { PagePropertyServiceService } from '../services/page-property/page-property-service.service';

@Directive({
  selector: '[appPageContent]'
})
export class PageContentDirective {

  private changes: MutationObserver;
  @Output() domChange = new EventEmitter()
  //@ViewChild(ElementRef) content!:ElementRef
  //@Input() content!:ElementRef
  constructor(private el:ElementRef, 
    private renderer: Renderer2,
    private pageProperty:PagePropertyServiceService,
    private zone:NgZone,
    // private changes: MutationObserver
    ) {

      const element = this.el.nativeElement;
      let i = 0
      this.changes = new MutationObserver((mutations: MutationRecord[]) => {
        
            mutations.forEach((mutation: MutationRecord) => this.domChange.emit(mutation));
          }
      );
  
      this.changes.observe(element, {
        // attributes: true,
        childList: true,
        // characterData: true
      });
      
      // let a = this.el.nativeElement.getElementsByClassName('container')
      // this.domChange()
      // let htmlContent = ""
      // this.zone.runOutsideAngular(()=>{
      //   setTimeout(() => {
      //     // remove the angular block that angular will add the element in the runtime eg:(_ngcontent-server)
      //     let pattern  = /_ngcontent\D+\w+\S+/gim
      //    htmlContent = a.item(0).outerHTML
      //     htmlContent =  htmlContent.replace(pattern,'')
      //     htmlContent = htmlContent.replace(/\\/g,'')
      //     
      //    this.pageProperty.setPageHTML(htmlContent)
      //   }, 0);
      // })
      
   }


   ngOnDestroy(): void {
    this.changes.disconnect();
  }

}
