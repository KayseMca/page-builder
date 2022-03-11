import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'sognando-casa-load-page',
  templateUrl: './load-page.component.html',
  styleUrls: ['./load-page.component.scss']
})
export class LoadPageComponent implements OnInit {
 // @HostBinding('class') classes =
  //   'heading1 heading2 heading3 heading4 p1 p2 p3';
  @ViewChild('tem', { static: true }) template!: ElementRef<any>;
  selected!: any;
  title$!: Observable<string>;
  constructor(
    private sanitizer: DomSanitizer,
    private active: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.active.data.subscribe(res=>{
    //   this.selected = res
    // })
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
