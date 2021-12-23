import { AfterViewInit,ChangeDetectorRef, Component, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import {BreakpointObserver} from '@angular/cdk/layout'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'page-builder';
  @ViewChild(MatSidenav) sidenav!:MatSidenav;

  previousIndex!:number
  openDropdown:Boolean = false
  settingType!: string[]

  @HostListener('window:mousedown', ['$event'])
  onMouseUp(event: any) {
    // let target = ['fa fa-ellipsis-h','mat-button-wrapper','mat-focus-indicator mat-button mat-button-base ng-star-inserted','dropdown-content-active']
    // let list = event.target.classList
    // let value = (event.target as Element).className
    // console.log(list)
    // if(!target.includes(value)) this.openDropdown = false
    let value = (event.target as Element).className
    if(value!=='fa fa-ellipsis-h') this.openDropdown=false
  }
  
  data = [
        {
            "name": "Home",
            "page_settings": {
                "settings": {
                    "page_name": "Homepage",
                },
        
                "permissions": {
                    "type": "everyone",
                    "password": "",
                    "members_type": "all_members",
                    "selected_members": "cigognini.matteo@gmail.com;andre.scaglia@hotmail.it"
                },
                "seo_basics": {
                    
                }
            }
        },
        {
          "name": "page2",
          "page_settings": {
              "settings": {
                  "page_name": "Homepage"
              },
              
              "permissions": {
                  "type": "everyone",
                  "password": "",
                  "members_type": "all_members",
                  "selected_members": "cigognini.matteo@gmail.com;andre.scaglia@hotmail.it"
              },
              "seo_basics": {
                  
              },
              "setHompage":"empty"
          }
      },
      {
        "name": "page3",
        "page_settings": {
            "settings": {
                "page_name": "Homepage"
            },
            "permissions": {
                "type": "everyone",
                "password": "",
                "members_type": "all_members",
                "selected_members": "cigognini.matteo@gmail.com;andre.scaglia@hotmail.it"
            },
            "seo_basics": {
                
            },
            "setHompage":"empty",
            "setDynamic":"empty",
        }
    },
    ]

  constructor(private observer:BreakpointObserver,private cdr: ChangeDetectorRef){

  }


  showData(index:number){
    if(index!==this.previousIndex){
      this.openDropdown =true
    }else{
      this.openDropdown = !this.openDropdown
    }
    let page = this.data[index]
    console.log(page)
    this.settingType = Object.keys(page.page_settings)
    console.log(this.settingType)
  }

  settings(event:any){
    console.log(event)
    // e.preventDefault();
  }

  ngAfterViewInit(){
    this.observer.observe(['max-width:800px']).subscribe(res=>{
      if(res.matches){
        console.log("matched")
        console.log(this.sidenav)
        this.sidenav.mode ='over'
        this.sidenav.close()
      }else{
        console.log("matched")
        console.log(this.sidenav)
        this.sidenav.mode = 'side'
        this.sidenav.open()
      }
    })
    this.cdr.detectChanges();
  }
}
