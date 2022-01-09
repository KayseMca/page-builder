import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { MaterialModuleModule } from './shared/models/material-module.module';


import { PagePropertyServiceService } from './shared/services/page-property/page-property-service.service';
import { PageDataService } from './shared/services/page-data-service/page-data.service';
import { MainModuleModule } from './main/main-module.module';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { HeaderComponent } from './navigation/header/header.component';
import { PagePropertiesModule } from './shared/components/page-properties.module';
import { SearchPagePipe } from './shared/pipe/seach-page.pipe';
import { DeleteDialogComponent } from './dialog/delete-dialog.component';
import { NavComponent } from './navigation/nav/nav.component';





@NgModule({
  declarations: [
    AppComponent,

    SidebarComponent,
    HeaderComponent,
    SearchPagePipe,
    DeleteDialogComponent,
    NavComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    MainModuleModule,
    PagePropertiesModule,
   
    
  ],
  // entryComponents:[DeleteDialogComponent],
  providers: [PagePropertyServiceService,PageDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
