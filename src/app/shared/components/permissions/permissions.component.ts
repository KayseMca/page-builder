import { Component, OnInit } from '@angular/core';
import {  FormControl} from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';
import { PageData, PageSettings, Permisions } from 'src/app/_interfaces/_page';
import { PageDataService } from '../../services/page-data-service/page-data.service';
import { PagePropertyServiceService } from '../../services/page-property/page-property-service.service';


@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  permissions_view_type!:FormControl
  permissions_set_password!:FormControl
  permissions_members_selected!:FormControl

  permission_data:Permisions = new Permisions()
  savingData:PageData = new PageData()
  newPageData!:PageData
  selectedPageData!:{page:PageData,tab:string}


  constructor(
    private pageProperty:PagePropertyServiceService,
    private pageDataService:PageDataService
    ) {
    this.selectedPageData = this.pageProperty.selectedPage.getValue()
    this.newPageData = this.selectedPageData.page
    this.savingData.id = this.selectedPageData.page.id

    this.permissions_view_type = new FormControl('')
    this.permissions_set_password = new FormControl('')
    this.permissions_members_selected= new FormControl('')
   }

   /**
    * @retunr
    */

  ngOnInit(): void {
    console.log(this.permissions_view_type.value)
    this.saveTypeData()
    this.saveMembers()
    this.savePassword()

    
  }


  /**
    * @return permision view form data
    */
  get value(){
    this.permission_data.type = this.permissions_view_type.value
    return this.permissions_view_type.value
  }



  /**
   * * checking every time form status changed and passing data to saving fucntion
    * @return permision view form data
    */
  
  saveTypeData(){
  
      this.permissions_view_type.statusChanges.subscribe(res=>{
        if(res==='VALID'){
          let data = this.permissions_view_type.value
          if(!(data==='') && data ==='everyone' )
          console.log(this.permission_data)
          this.permission_data.type = data
          console.log(this.permission_data)
        }
      })
    }

    saveMembers(){
  
      this.permissions_members_selected.statusChanges.subscribe(res=>{
        if(res==='VALID'){
          let selected_data = this.permissions_members_selected.value
          
          // check type of members selected
          if(!(selected_data==='') && selected_data==='All Members'){

            console.log(selected_data)
            this.permission_data.members_type = selected_data
            this.saveAllData()

          }else if(!(selected_data==='') && selected_data==='selected_members'){
            console.log(selected_data)
            this.permission_data.members_type = ''
            this.permission_data.selected_members = selected_data
            this.saveAllData()
          }
        }
      })
    }


    /**
     * listening set password form event then passing the data to savAllData after every 2000 second
     */
    savePassword(){
      this.permissions_set_password.statusChanges.pipe(
        debounceTime(200)
      ).subscribe(res=>{
        if(res==='VALID'){
          let data = this.permissions_set_password.value
          if(!(data==='') )
          this.permission_data.password = data
          this.saveAllData()
        }
      })
    }


    /**
     * 
     */
    saveAllData(): void{
      
      this.savingData.page_settings = {permissions:this.permission_data}
      // this.savingData['page_settings']['permissions'] = {...this.permission_data }
      this.pageDataService.updatePageData(this.savingData)
    }
}
