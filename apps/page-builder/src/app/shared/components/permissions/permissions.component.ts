import { Component, OnDestroy, OnInit } from '@angular/core';
import {  FormControl} from '@angular/forms';
import { debounce, debounceTime, Subscription } from 'rxjs';
import { PageData, Permisions } from '@sognando-casa/api-interfaces';
import { PageDataService } from '../../services/page-data-service/page-data.service';
import { PagePropertyServiceService } from '../../services/page-property/page-property-service.service';


@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit, OnDestroy {

  subscriptions:Subscription = new Subscription()
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
    let id  =this.selectedPageData.page.id
    this.savingData.id = id

    this.permissions_view_type = new FormControl('')
    this.permissions_set_password = new FormControl('')
    this.permissions_members_selected= new FormControl('')
   }

   /**
    * @retunr
    */

  ngOnInit(): void {
    
    
    this.saveTypeData()
    this.saveMembers()
    this.savePassword()

    
  }


  /**
    * @return permision view form data
    */
  get typeValue(){
    //this.permission_data.type = this.permissions_view_type.value
    return this.permissions_view_type.value
  }



  /**
   * * checking every time form status changed and passing data to saving fucntion
    * @return permision view form data
    */
  
  saveTypeData(){
  
      this.subscriptions.add(this.permissions_view_type.statusChanges.subscribe(res=>{
        if(res==='VALID'){
          let data = this.permissions_view_type.value
          // && data ==='everyone'
          if(!(data==='') && data ==='everyone' ){
            
            this.permission_data.type = data
            this.saveAllData()

          }
        }
      })
      )
    }

    saveMembers(){
  
     this.subscriptions.add(this.permissions_members_selected.statusChanges.subscribe(res=>{
        if(res==='VALID'){
          let selected_data = this.permissions_members_selected.value
          
          // check type of members selected
          if(!(selected_data==='') && selected_data==='All Members'){

            
            this.permission_data.members_type = selected_data
            // reset other fields
            this.permission_data.selected_members=undefined
            this.permission_data.password=undefined 
            this.permission_data.type = this.permissions_view_type.value
            this.saveAllData()

          }else if(!(selected_data==='') && selected_data==='selected_members'){
            
            // reset other options
            this.permission_data.members_type = undefined
            this.permission_data.password=undefined 
            this.permission_data.password=undefined 
            this.permission_data.type = this.permissions_view_type.value
            // set the data the field choicen
            this.permission_data.selected_members = selected_data
           this.saveAllData()
          }
        }
      })
     )
    }


    /**
     * listening set password form event then passing the data to savAllData after every 2000 second
     */
    savePassword(){
      this.subscriptions.add(this.permissions_set_password.statusChanges.pipe(
        debounceTime(200)
      ).subscribe(res=>{
        if(res==='VALID'){
          let data = this.permissions_set_password.value
          if(!(data==='') && data ==='password')
          
          this.permission_data.password = data
          // reset other options
          this.permission_data.members_type = undefined
          this.permission_data.selected_members = undefined
          this.permission_data.type = this.permissions_view_type.value
          this.saveAllData()
        }
      })
      )
    }


    /**
     * 
     */
    saveAllData(): void{
      
      this.savingData!.page_settings = {permissions:this.permission_data}
      // this.savingData['page_settings']['permissions'] = {...this.permission_data }
      
      this.pageDataService.updatePageData(this.savingData)
    }

    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      if(this.subscriptions) this.subscriptions.unsubscribe()
    }
}
