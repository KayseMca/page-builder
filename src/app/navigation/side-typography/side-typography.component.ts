import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-typography',
  templateUrl: './side-typography.component.html',
  styleUrls: ['./side-typography.component.css']
})
export class SideTypographyComponent implements OnInit {

  toggleList:{[key:string]:boolean}  = {'typo':false, 'color':true}

  list = [1,3]
  constructor() { }

  ngOnInit(): void {
    console.log(this.toggleList)
  }


  toggleDesign(event:string){
    if(event==='color'){
      this.toggleList['typo'] = false
      this.toggleList['color']=true
    } else{
      this.toggleList['color']=false
      this.toggleList['typo'] = true
    }
  }
}
